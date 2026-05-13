from PIL import Image

try:
    img_orig = Image.open('assets/rocket_banner.png').convert("RGBA")
    img_clean = Image.open('assets/rocket_banner_clean.png').convert("RGBA")
    
    # Resize clean image to match original if generative AI changed the dimensions
    if img_orig.size != img_clean.size:
        img_clean = img_clean.resize(img_orig.size, Image.Resampling.LANCZOS)

    # Extract alpha from original
    r, g, b, a = img_orig.split()
    
    # Extract rgb from clean
    cr, cg, cb, ca = img_clean.split()
    
    # Merge clean rgb with original alpha
    final_img = Image.merge("RGBA", (cr, cg, cb, a))
    final_img.save('assets/rocket_banner_final.png')
    print("Success")
except Exception as e:
    print(f"Error: {e}")
