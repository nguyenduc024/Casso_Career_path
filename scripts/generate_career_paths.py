import csv
import re
from pathlib import Path

try:
    import openpyxl
except ImportError as exc:
    raise SystemExit('Install openpyxl: pip install openpyxl') from exc

ROOT = Path(__file__).resolve().parent.parent
XLSX_SOURCE = ROOT / 'dataset' / 'Expertise.xlsx'
CSV_SOURCE = ROOT / 'dataset' / 'Expertise.csv'
EXPERTISES_OUT = ROOT / 'src' / 'app' / 'data' / 'expertises.ts'
PATHS_OUT = ROOT / 'src' / 'app' / 'data' / 'careerPaths.ts'


def slug(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')


def escape_ts(value: str) -> str:
    return value.replace('\\', '\\\\').replace('"', '\\"')


def role_id(eid: str, title: str) -> str:
    return slug(f'{eid}-{title}')


def parse_enable(value) -> bool:
    return str(value or '').strip().lower() in ('1', 'true', 'yes')


def load_rows() -> tuple[list[str], list[dict]]:
    wb = openpyxl.load_workbook(XLSX_SOURCE, read_only=True, data_only=True)
    ws = wb.active
    sheet_rows = list(ws.iter_rows(values_only=True))
    header = [str(c).strip() if c is not None else '' for c in sheet_rows[0]]
    rows = []
    for raw in sheet_rows[1:]:
        row = {header[i]: raw[i] for i in range(len(header))}
        if str(row.get('Expertise', '') or '').strip():
            rows.append(row)
    return header, rows


def export_csv(header: list[str], rows: list[dict]) -> None:
    with CSV_SOURCE.open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=header, extrasaction='ignore')
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row.get(key, '') for key in header})


def find_role(bytrack: dict, track: str, level: int) -> str | None:
    for lvl, rid in bytrack.get(track, []):
        if lvl == level:
            return rid
    return None


def first_role(bytrack: dict, track: str) -> str | None:
    items = sorted(bytrack.get(track, []))
    return items[0][1] if items else None


def last_role(bytrack: dict, track: str) -> str | None:
    items = sorted(bytrack.get(track, []))
    return items[-1][1] if items else None


def build_connections(bytrack: dict) -> list[tuple[str, str, str]]:
    connections: list[tuple[str, str, str]] = []

    # Thăng tiến dọc trong cùng một ngạch
    for track, items in bytrack.items():
        items.sort()
        for i in range(len(items) - 1):
            connections.append((items[i][1], items[i + 1][1], 'vertical'))

    trainee = first_role(bytrack, 'trainee')
    intern = first_role(bytrack, 'intern')
    prof_l1 = find_role(bytrack, 'professional', 1)
    prof_l3 = find_role(bytrack, 'professional', 3)
    mgmt_l3 = find_role(bytrack, 'management', 3)
    mgmt_l4 = find_role(bytrack, 'management', 4)
    mgmt_l5 = find_role(bytrack, 'management', 5)
    lead_l4 = find_role(bytrack, 'leadership', 4)
    lead_l5 = find_role(bytrack, 'leadership', 5)

    # Trainee → Intern → Professional L1 (cùng hàng L1, mũi tên ngang)
    if trainee and intern:
        connections.append((trainee, intern, 'horizontal'))
    if intern and prof_l1:
        connections.append((intern, prof_l1, 'horizontal'))
    elif trainee and prof_l1:
        connections.append((trainee, prof_l1, 'horizontal'))

    # Professional L3 (Senior) → Management L3 (Team Lead)
    if prof_l3 and mgmt_l3:
        connections.append((prof_l3, mgmt_l3, 'horizontal'))

    # Management L3 → Leadership L4 (Product Head): nhánh rẽ từ Team Lead
    if mgmt_l3 and lead_l4:
        connections.append((mgmt_l3, lead_l4, 'horizontal'))

    # Management L4 → Leadership L4 (cùng cấp Product Head), không nhảy cấp
    if mgmt_l4 and lead_l4:
        connections.append((mgmt_l4, lead_l4, 'horizontal'))

    # Chuyển đổi 2 chiều: Management L5 ↔ Leadership L5 (sau khi lên Mgmt L5)
    if mgmt_l5 and lead_l5:
        connections.append((mgmt_l5, lead_l5, 'bidirectional'))

    seen = set()
    unique: list[tuple[str, str, str]] = []
    for conn in connections:
        key = (conn[0], conn[1], conn[2])
        if key not in seen:
            seen.add(key)
            unique.append(conn)
    return unique


header, rows = load_rows()
export_csv(header, rows)

expertise_lines = [
    "export type Segment = 'BUILD' | 'SALE' | 'SERVICE' | 'MANAGE' | 'PROFIT';",
    '',
    'export interface Expertise {',
    '  id: string;',
    '  name: string;',
    '  segment: Segment;',
    '  group: string;',
    '  flag?: string;',
    '  enabled: boolean;',
    '}',
    '',
    'export const expertises: Expertise[] = [',
]

path_lines = [
    "export type Track = 'trainee' | 'intern' | 'professional' | 'management' | 'leadership';",
    '',
    'export interface Role {',
    '  id: string;',
    '  title: string;',
    '  level: number;',
    '  track: Track;',
    '}',
    '',
    'export interface Connection {',
    '  from: string;',
    '  to: string;',
    "  type: 'vertical' | 'horizontal' | 'bidirectional';",
    '}',
    '',
    'export interface CareerPath {',
    '  expertiseId: string;',
    '  roles: Role[];',
    '  connections: Connection[];',
    '}',
    '',
    'export const careerPaths: CareerPath[] = [',
]

for row in rows:
    name = str(row['Expertise']).strip()
    eid = slug(name)
    segment = str(row['Segment']).strip()
    group = str(row['Expertise Group']).strip()
    flag = str(row.get('Flag', '') or '').strip()
    enabled = parse_enable(row.get('Enable'))

    expertise_lines.append('  {')
    expertise_lines.append(f'    id: "{eid}",')
    expertise_lines.append(f'    name: "{escape_ts(name)}",')
    expertise_lines.append(f"    segment: '{segment}',")
    expertise_lines.append(f'    group: "{escape_ts(group)}",')
    if flag:
        expertise_lines.append(f'    flag: "{escape_ts(flag)}",')
    expertise_lines.append(f'    enabled: {"true" if enabled else "false"},')
    expertise_lines.append('  },')

    role_items: list[tuple[str, str, str, int]] = []
    bytrack: dict[str, list[tuple[int, str]]] = {}

    def add(title: str, track: str, level: int) -> None:
        if title and str(title).strip():
            title_text = str(title).strip()
            rid = role_id(eid, title_text)
            role_items.append((rid, title_text, track, level))
            bytrack.setdefault(track, []).append((level, rid))

    add(row.get('Trainee', ''), 'trainee', 0)
    add(row.get('Intern', ''), 'intern', 0)
    for idx, col in enumerate(
        [
            'Professional Track L1',
            'Professional Track L2',
            'Professional Track L3',
            'Professional Track L4',
            'Professional Track L5',
        ]
    ):
        add(row.get(col, ''), 'professional', idx + 1)
    for idx, col in enumerate(['Management Track L3', 'Management Track L4', 'Management Track L5']):
        add(row.get(col, ''), 'management', idx + 3)
    for idx, col in enumerate(['Leadership Track L4', 'Leadership Track L5', 'Leadership Track L6']):
        add(row.get(col, ''), 'leadership', idx + 4)

    connections = build_connections(bytrack)

    path_lines.append('  {')
    path_lines.append(f'    expertiseId: "{eid}",')
    path_lines.append('    roles: [')
    for rid, title_text, track, level in role_items:
        path_lines.append('      {')
        path_lines.append(f'        id: "{rid}",')
        path_lines.append(f'        title: "{escape_ts(title_text)}",')
        path_lines.append(f'        level: {level},')
        path_lines.append(f"        track: '{track}',")
        path_lines.append('      },')
    path_lines.append('    ],')
    path_lines.append('    connections: [')
    for a, b, t in connections:
        path_lines.append('      {')
        path_lines.append(f'        from: "{a}",')
        path_lines.append(f'        to: "{b}",')
        path_lines.append(f"        type: '{t}',")
        path_lines.append('      },')
    path_lines.append('    ],')
    path_lines.append('  },')

expertise_lines.extend([
    '];',
    '',
    'export const segmentColors: Record<Segment, string> = {',
    "  BUILD: '#40916C',",
    "  SALE: '#F4A261',",
    "  SERVICE: '#4CC9F0',",
    "  MANAGE: '#9B8EC4',",
    "  PROFIT: '#E9C46A',",
    '};',
    '',
])

path_lines.append('];')
path_lines.append('')

EXPERTISES_OUT.write_text('\n'.join(expertise_lines), encoding='utf-8')
PATHS_OUT.write_text('\n'.join(path_lines), encoding='utf-8')

enabled_count = sum(1 for row in rows if parse_enable(row.get('Enable')))
print(f'Wrote {len(rows)} expertises ({enabled_count} enabled) to {EXPERTISES_OUT}')
print(f'Wrote {len(rows)} career paths to {PATHS_OUT}')
print(f'Exported CSV backup to {CSV_SOURCE}')
