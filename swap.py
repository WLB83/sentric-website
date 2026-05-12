import os

path = r"C:\Users\LENOVO\.gemini\antigravity\scratch\index.html"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

brands_start = -1
products_start = -1
features_start = -1

for i, line in enumerate(lines):
    if '<!-- Brands Section -->' in line:
        brands_start = i
    elif '<!-- Products Section (Sebang Style) -->' in line:
        products_start = i
    elif '<!-- Features Section -->' in line:
        features_start = i

if brands_start != -1 and products_start != -1 and features_start != -1:
    before = lines[:brands_start]
    brands = lines[brands_start:products_start]
    products = lines[products_start:features_start]
    after = lines[features_start:]

    new_lines = before + products + brands + after
    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    print('Swapped successfully.')
else:
    print(f'Error finding sections: brands_start={brands_start}, products_start={products_start}, features_start={features_start}')
