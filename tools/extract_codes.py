"""Extrae la linea CODIGO de los PDFs de porras y la valida (72 picks 1/X/2)."""
import glob
import re
import sys

from pypdf import PdfReader

pdfs = sys.argv[1:] or glob.glob(r"C:\Users\todop\Downloads\porra-la-traka_*.pdf")
for path in sorted(pdfs):
    text = "".join(page.extract_text() or "" for page in PdfReader(path).pages)
    m = re.search(r"CODIGO:\s*(.+?)\|([1X2]+)", text)
    if not m:
        print(f"{path} -> SIN CODIGO")
        continue
    name, code = m.group(1).strip(), m.group(2).strip()
    status = "OK" if len(code) == 72 else f"LONGITUD {len(code)}"
    print(f"{status}|{name}|{code}")
