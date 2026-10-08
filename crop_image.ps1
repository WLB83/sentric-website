Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap("assets/battery_sebang_full.png")
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, 800)
$format = $bmp.PixelFormat
$clone = $bmp.Clone($rect, $format)
$clone.Save("assets/battery_sebang_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$clone.Dispose()
