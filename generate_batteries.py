import cv2
import numpy as np
import os

base_path = r'C:\Users\LENOVO\Desktop\Sentric_Website\assets\premium_battery_base.png'
labels_dir = r'C:\Users\LENOVO\Desktop\Sentric_Website\assets\labels'
output_dir = r'C:\Users\LENOVO\Desktop\Sentric_Website\assets'

labels = ['global.png', 'rocket.png', 'colossus.png', 'maxtorm.png']
out_names = ['battery_global_trans.png', 'battery_rocket_trans.png', 'battery_colossus_trans.png', 'battery_maxtorm_trans.png']

dst_pts = np.array([
    [390, 465], # top-left
    [855, 385], # top-right
    [855, 625], # bottom-right
    [390, 755]  # bottom-left
], dtype=np.float32)

base_img = cv2.imread(base_path, cv2.IMREAD_UNCHANGED)
h_base, w_base = base_img.shape[:2]

for label_name, out_name in zip(labels, out_names):
    label_path = os.path.join(labels_dir, label_name)
    label_img = cv2.imread(label_path, cv2.IMREAD_UNCHANGED)
    
    if label_img is None:
        print(f"Could not load {label_path}")
        continue
        
    h_label, w_label = label_img.shape[:2]
    
    src_pts = np.array([
        [0, 0],
        [w_label, 0],
        [w_label, h_label],
        [0, h_label]
    ], dtype=np.float32)
    
    M = cv2.getPerspectiveTransform(src_pts, dst_pts)
    warped_label = cv2.warpPerspective(label_img, M, (w_base, h_base), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))
    
    # If label doesn't have alpha, add it
    if warped_label.shape[2] == 3:
        warped_label = cv2.cvtColor(warped_label, cv2.COLOR_BGR2BGRA)
        
    # Create mask from warped label
    alpha_warp = warped_label[:, :, 3] / 255.0
    alpha_base = base_img[:, :, 3] / 255.0
    
    # Output image
    out_img = np.zeros_like(base_img, dtype=np.uint8)
    
    for c in range(3):
        out_img[:, :, c] = (warped_label[:, :, c] * alpha_warp + base_img[:, :, c] * (1.0 - alpha_warp)).astype(np.uint8)
        
    # For alpha channel: alpha_out = alpha_warp + alpha_base * (1 - alpha_warp)
    out_img[:, :, 3] = ((alpha_warp + alpha_base * (1.0 - alpha_warp)) * 255).astype(np.uint8)
    
    out_path = os.path.join(output_dir, out_name)
    cv2.imwrite(out_path, out_img)
    print(f"Saved {out_path}")
