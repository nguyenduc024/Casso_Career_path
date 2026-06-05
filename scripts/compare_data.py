import csv
import re
import sys
import openpyxl
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent


def slug(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-')


with (ROOT / 'dataset/Expertise.csv').open('r', encoding='utf-8-sig') as f:
    csv_rows = list(csv.DictReader(f))

wb = openpyxl.load_workbook(ROOT / 'dataset/Title.xlsx', read_only=True)
ws = wb['Title']
rows = list(ws.iter_rows(values_only=True))
header = rows[0]
title_idx = header.index('Title')
exp_idx = header.index('Expertise')
track_idx = header.index('Track')

title_by_exp: dict[str, set[str]] = {}
for r in rows[1:]:
    if r[exp_idx]:
        title_by_exp.setdefault(str(r[exp_idx]).strip(), set()).add(str(r[title_idx]).strip())

paths_text = (ROOT / 'src/app/data/careerPaths.ts').read_text(encoding='utf-8')

print('Expertise | CSV filled cells | Title.xlsx titles | careerPaths roles')
print('-' * 70)
for row in csv_rows:
    name = row['Expertise'].strip()
    eid = slug(name)
    cols = [
        'Trainee', 'Intern',
        'Professional Track L1', 'Professional Track L2', 'Professional Track L3',
        'Professional Track L4', 'Professional Track L5',
        'Management Track L3', 'Management Track L4', 'Management Track L5',
        'Leadership Track L4', 'Leadership Track L5', 'Leadership Track L6',
    ]
    csv_filled = sum(1 for c in cols if row.get(c, '').strip())
    title_count = len(title_by_exp.get(name, set()))
    start = paths_text.find(f'expertiseId: "{eid}"')
    if start == -1:
        path_roles = 0
    else:
        chunk = paths_text[start : start + 8000]
        end = chunk.find('},', chunk.find('connections:'))
        path_roles = chunk[:end].count("track: '")
    print(f'{name:20} | {csv_filled:2} | {title_count:2} | {path_roles:2}')
