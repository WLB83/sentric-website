from PIL import Image

img = Image.open(r'C:\Users\LENOVO\Desktop\Sentric_Website\assets\premium_battery_base.png')
print(img.mode)
if img.mode == 'RGBA':
    extrema = img.getextrema()
    print("Alpha extrema:", extrema[3])
