import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('Neden Seabang?', 'Neden Sebang?')
content = content.replace('Seabang, yarým', 'Sebang, yarým')
content = content.replace('alt="Seabang Premium"', 'alt="Sebang Premium"')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
