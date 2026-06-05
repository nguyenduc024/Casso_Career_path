import re
import sys
from pathlib import Path

import openpyxl

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent


def slug(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-')


wb = openpyxl.load_workbook(ROOT / 'dataset/Expertise.xlsx', read_only=True)
ws = wb.active
rows = list(ws.iter_rows(values_only=True))
header = [str(c).strip() if c else '' for c in rows[0]]
data = rows[1:]

exps = (ROOT / 'src/app/data/expertises.ts').read_text(encoding='utf-8')
paths = (ROOT / 'src/app/data/careerPaths.ts').read_text(encoding='utf-8')

role_cols = [
    'Trainee', 'Intern',
    'Professional Track L1', 'Professional Track L2', 'Professional Track L3',
    'Professional Track L4', 'Professional Track L5',
    'Management Track L3', 'Management Track L4', 'Management Track L5',
    'Leadership Track L4', 'Leadership Track L5', 'Leadership Track L6',
]

print('Header:', header)
print('Total xlsx rows:', len(data))
print()

for r in data:
    row = {header[i]: r[i] for i in range(len(header))}
    name = str(row['Expertise']).strip()
    eid = slug(name)
    enable_raw = str(row.get('Enable', '')).strip()
    filled = sum(1 for c in role_cols if str(row.get(c, '') or '').strip())
    in_exp = f'id: "{eid}"' in exps
    in_path = f'expertiseId: "{eid}"' in paths
    status = 'OK' if in_exp and in_path else 'MISSING'
    print(f'{status:7} {name:20} enable={enable_raw:4} roles={filled:2} id={eid}')
