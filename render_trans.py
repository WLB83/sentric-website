import cv2
import numpy as np
import os

base_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\premium_battery_base.png"
labels_dir = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\labels"
out_dir = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets"

base_img = cv2.imread(base_path, cv2.IMREAD_UNCHANGED)
if base_img is None:
    print("Base image not found.")
    exit(1)

brands = ["global", "rocket", "colossus", "maxtorm"]

pts_dst = np.array([[390, 465], [855, 385], [855, 625], [390, 755]], dtype=np.float32)

for brand in brands:
    label_path = os.path.join(labels_dir, f"{brand}.png")
    if not os.path.exists(label_path):
        print(f"Label not found: {label_path}")
        continue
        
    label_img = cv2.imread(label_path, cv2.IMREAD_UNCHANGED)
    if label_img.shape[2] == 4:
        label_img = cv2.cvtColor(label_img, cv2.COLOR_BGRA2BGR)
        
    h, w = label_img.shape[:2]
    pts_src = np.array([[0, 0], [w - 1, 0], [w - 1, h - 1], [0, h - 1]], dtype=np.float32)
    
    h_matrix, _ = cv2.findHomography(pts_src, pts_dst)
    warped_label = cv2.warpPerspective(label_img, h_matrix, (base_img.shape[1], base_img.shape[0]))
    
    mask = np.zeros((base_img.shape[0], base_img.shape[1]), dtype=np.uint8)
    cv2.fillConvexPoly(mask, np.int32(pts_dst), 255)
    
    result = base_img.copy()
    
    for c in range(3):
        result[:,:,c] = np.where(mask == 255, warped_label[:,:,c], result[:,:,c])
        
    if result.shape[2] == 4:
        result[:,:,3] = np.where(mask == 255, 255, result[:,:,3])
    else:
        # If base somehow is not RGBA, convert it
        b,g,r = cv2.split(result)
        a = np.ones(b.shape, dtype=b.dtype) * 255
        result = cv2.merge((b,g,r,a))
        
    out_path = os.path.join(out_dir, f"battery_{brand}_trans.png")
    cv2.imwrite(out_path, result)
    print(f"Generated {out_path}")
