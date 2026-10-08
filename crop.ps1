Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("assets/extracted/maxtorm/img_p0_1.png")
$bmp = New-Object System.Drawing.Bitmap($img)
$rect = New-Object System.Drawing.Rectangle(150, 1150, 950, 350)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)
$cropped.Save("assets/labels/maxtorm_crop.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()
$cropped.Dispose()
