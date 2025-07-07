import csv
import json

with open("major_client.txt", newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter='\t')
    data = list(reader)

with open("data.json", "w", encoding='utf-8') as out:
    json.dump(data, out, indent=2, ensure_ascii=False)
