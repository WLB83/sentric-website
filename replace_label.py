import cv2
import numpy as np
import sys
import os

# Paths
target_image_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\sentric_detailed_exploded_1776896377443.png"
sebang_label_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\labels\sebang_flat.png"
output_image_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\sebang_detailed_exploded.png"

# Check if files exist
if not os.path.exists(target_image_path):
    print(f"Error: Target image not found at {target_image_path}")
    sys.exit(1)

if not os.path.exists(sebang_label_path):
    print(f"Error: SEBANG label not found at {sebang_label_path}")
    sys.exit(1)

# Read images
target_img = cv2.imread(target_image_path)
label_img = cv2.imread(sebang_label_path)

if target_img is None or label_img is None:
    print("Error reading images.")
    sys.exit(1)

# Global variables for mouse callback
pts_dst = []

def mouse_click(event, x, y, flags, param):
    global pts_dst
    if event == cv2.EVENT_LBUTTONDOWN:
        pts_dst.append((x, y))
        cv2.circle(target_img_copy, (x, y), 5, (0, 0, 255), -1)
        cv2.imshow("Click 4 corners of the Sentric Label (TL, TR, BR, BL)", target_img_copy)
        if len(pts_dst) == 4:
            cv2.waitKey(500)
            cv2.destroyAllWindows()

# Display image and wait for user to click 4 corners
target_img_copy = target_img.copy()
print("Please click the 4 corners of the SENTRIC label in this order: Top-Left, Top-Right, Bottom-Right, Bottom-Left.")
cv2.imshow("Click 4 corners of the Sentric Label (TL, TR, BR, BL)", target_img_copy)
cv2.setMouseCallback("Click 4 corners of the Sentric Label (TL, TR, BR, BL)", mouse_click)

# Wait until 4 points are clicked
while len(pts_dst) < 4:
    cv2.waitKey(10)

if len(pts_dst) != 4:
    print("4 points were not selected.")
    sys.exit(1)

print("Selected points:", pts_dst)

# Source points from the flat label
h, w, _ = label_img.shape
pts_src = np.array([
    [0, 0],
    [w - 1, 0],
    [w - 1, h - 1],
    [0, h - 1]
], dtype=float)

pts_dst = np.array(pts_dst, dtype=float)

# Compute Homography
h_matrix, status = cv2.findHomography(pts_src, pts_dst)

# Warp the label image to the target perspective
warped_label = cv2.warpPerspective(label_img, h_matrix, (target_img.shape[1], target_img.shape[0]))

# Create a mask for the warped label
mask = np.zeros((target_img.shape[0], target_img.shape[1]), dtype=np.uint8)
cv2.fillConvexPoly(mask, np.int32(pts_dst), (255, 255, 255))

# Invert mask to clear the target area
mask_inv = cv2.bitwise_not(mask)
target_bg = cv2.bitwise_and(target_img, target_img, mask=mask_inv)

# Add the warped label to the target image
final_img = cv2.add(target_bg, warped_label)

# Save result
cv2.imwrite(output_image_path, final_img)
print(f"Successfully saved replaced image to {output_image_path}")
