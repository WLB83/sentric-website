import cv2
import numpy as np
import sys
import os

target_image_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\sentric_detailed_exploded_1776896377443.png"
sebang_label_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\labels\sebang_flat.png"
output_image_path = r"C:\Users\LENOVO\Desktop\Sentric_Website\assets\sebang_detailed_exploded.png"

# Read images
target_img = cv2.imread(target_image_path)
label_img = cv2.imread(sebang_label_path)

if target_img is None or label_img is None:
    print("Error reading images.")
    sys.exit(1)

# Convert to HSV to find the blue label
hsv = cv2.cvtColor(target_img, cv2.COLOR_BGR2HSV)

# Blue color range (adjust if necessary)
lower_blue = np.array([100, 50, 50])
upper_blue = np.array([140, 255, 255])

mask = cv2.inRange(hsv, lower_blue, upper_blue)

# Find contours
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
if not contours:
    print("No blue contours found.")
    sys.exit(1)

# Sort by area and find the largest
contours = sorted(contours, key=cv2.contourArea, reverse=True)
largest_contour = contours[0]

# Approximate the contour to a polygon
epsilon = 0.02 * cv2.arcLength(largest_contour, True)
approx = cv2.approxPolyDP(largest_contour, epsilon, True)

# If we don't get exactly 4 points, maybe increase or decrease epsilon, but hopefully it works.
# Sometimes the label has rounded corners. Let's try to get exactly 4 points or bounding rect.
if len(approx) != 4:
    # If not 4 points, find the minimum area bounding rectangle or convex hull
    rect = cv2.minAreaRect(largest_contour)
    box = cv2.boxPoints(rect)
    approx = np.int32(box)
else:
    approx = approx.reshape(4, 2)

# Sort the 4 points to: Top-Left, Top-Right, Bottom-Right, Bottom-Left
# Sort by y first, then separate into top and bottom, then sort by x
pts = np.array(approx, dtype=np.float32)

# Calculate centroid to determine left and right
center = np.mean(pts, axis=0)

top = pts[pts[:, 1] < center[1]]
bottom = pts[pts[:, 1] >= center[1]]

# In case it splits 3-1, which is rare but possible, fallback to sorting by sum/diff
if len(top) != 2 or len(bottom) != 2:
    s = pts.sum(axis=1)
    diff = np.diff(pts, axis=1)
    tl = pts[np.argmin(s)]
    br = pts[np.argmax(s)]
    tr = pts[np.argmin(diff)]
    bl = pts[np.argmax(diff)]
else:
    tl = top[np.argmin(top[:, 0])]
    tr = top[np.argmax(top[:, 0])]
    bl = bottom[np.argmin(bottom[:, 0])]
    br = bottom[np.argmax(bottom[:, 0])]

pts_dst = np.array([tl, tr, br, bl], dtype=np.float32)
print("Detected points:", pts_dst)

# Source points
h, w, _ = label_img.shape
pts_src = np.array([
    [0, 0],
    [w - 1, 0],
    [w - 1, h - 1],
    [0, h - 1]
], dtype=np.float32)

# Compute Homography
h_matrix, status = cv2.findHomography(pts_src, pts_dst)

# Warp the label
warped_label = cv2.warpPerspective(label_img, h_matrix, (target_img.shape[1], target_img.shape[0]))

# Create mask of the warped label
mask_label = np.zeros((target_img.shape[0], target_img.shape[1]), dtype=np.uint8)
cv2.fillConvexPoly(mask_label, np.int32(pts_dst), (255, 255, 255))

# Smooth the mask to avoid jagged edges
mask_label = cv2.GaussianBlur(mask_label, (3, 3), 0)

# Invert mask and create final image
mask_inv = cv2.bitwise_not(mask_label)
target_bg = cv2.bitwise_and(target_img, target_img, mask=mask_inv)

# We need to handle the 3-channel warped label
mask_label_3c = cv2.cvtColor(mask_label, cv2.COLOR_GRAY2BGR) / 255.0
mask_inv_3c = cv2.cvtColor(mask_inv, cv2.COLOR_GRAY2BGR) / 255.0

final_img = (target_img * mask_inv_3c + warped_label * mask_label_3c).astype(np.uint8)

cv2.imwrite(output_image_path, final_img)
print(f"Successfully processed and saved to {output_image_path}")
