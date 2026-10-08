import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
import os

def process_battery():
    img_path = r"C:\Users\LENOVO\.gemini\antigravity\brain\e26cbff1-8347-4de9-8056-5fca0b7bc33d\.user_uploaded\media_1791491375476_27c3bfad.jpg"
    out_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\battery_commercial_sebang.png"

    print(f"Loading image from: {img_path}")
    # Load image using OpenCV
    img = cv2.imread(img_path)
    if img is None:
        print("Image not found. Please check the path.")
        return
    
    # 1. Background removal (assuming a white/bright background for commercial product images)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Threshold to isolate the battery from the white background
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        # Get the largest contour, which should be the battery
        c = max(contours, key=cv2.contourArea)
        mask = np.zeros_like(gray)
        cv2.drawContours(mask, [c], -1, 255, -1)
        
        # Smooth mask edges slightly to preserve black edges and shadows nicely
        mask = cv2.GaussianBlur(mask, (3, 3), 0)
        
        # Apply mask to add alpha channel
        b, g, r = cv2.split(img)
        img_rgba = cv2.merge((b, g, r, mask))
    else:
        img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # 2. Text Replacement using PIL
    # Convert OpenCV image (BGRA) to PIL Image (RGBA)
    pil_img = Image.fromarray(cv2.cvtColor(img_rgba, cv2.COLOR_BGRA2RGBA))
    draw = ImageDraw.Draw(pil_img)
    
    # Load a font (fallback to default if Arial is not found)
    try:
        font = ImageFont.truetype("arialbd.ttf", 36) 
    except IOError:
        font = ImageFont.load_default()

    # To detect and replace "ROCKET" dynamically, we can use pytesseract.
    # Since exact coordinates depend on the specific image, OCR provides a robust way.
    try:
        import pytesseract
        print("Running OCR to detect text...")
        data = pytesseract.image_to_data(pil_img, output_type=pytesseract.Output.DICT)
        
        for i in range(len(data['text'])):
            text = data['text'][i].upper()
            if data['conf'][i] > 30 and 'ROCKET' in text:
                x, y, w, h = data['left'][i], data['top'][i], data['width'][i], data['height'][i]
                print(f"Found 'ROCKET' at x:{x}, y:{y}")
                
                # Sample the background color of the label to cover it up seamlessly
                # (sample slightly above or to the left of the text)
                sample_x = max(0, x - 5)
                sample_y = max(0, y - 5)
                bg_color = pil_img.getpixel((sample_x, sample_y))
                
                # Cover "ROCKET"
                draw.rectangle([x, y, x + w, y + h], fill=bg_color)
                
                # Write "SEBANG" in its place
                draw.text((x, y), "SEBANG", fill=(255, 255, 255, 255), font=font)
    except ImportError:
        print("Pytesseract not installed. Please install it (pip install pytesseract) to automatically detect text.")
        print("Falling back to manual coordinate replacement (please adjust bounding boxes as needed).")
        
        # Mock coordinates for demonstration. You may need to tweak these based on the image size.
        # Front label:
        # bg_color_front = (20, 20, 20, 255) # Dark gray/black
        # draw.rectangle([200, 350, 400, 400], fill=bg_color_front)
        # draw.text((210, 360), "SEBANG", fill=(255, 255, 255, 255), font=font)
        
        # Top label:
        # draw.rectangle([150, 100, 300, 140], fill=bg_color_front)
        # draw.text((160, 110), "SEBANG", fill=(255, 255, 255, 255), font=font)

    # 3. Save final image
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    pil_img.save(out_path, format="PNG")
    print(f"Done! Saved final transparent image to: {out_path}")

if __name__ == "__main__":
    process_battery()
