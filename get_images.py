import urllib.request
import re

url = 'https://sebang-europe.com'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = set(re.findall(r'src=["\']([^"\']+\.(?:png|jpg|jpeg|webp))["\']', html, re.I))
    for img in images:
        print(img)
except Exception as e:
    print(f"Error: {e}")
