Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param([string]$in, [string]$out, [int]$x, [int]$y, [int]$w, [int]$h)
    $img = [System.Drawing.Image]::FromFile($in)
    $bmp = new-object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $rect = new-object System.Drawing.Rectangle 0, 0, $w, $h
    $g.DrawImage($img, $rect, $x, $y, $w, $h, [System.Drawing.GraphicsUnit]::Pixel)
    $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    $img.Dispose()
}

Crop-Image "assets/brand_global_real.png" "assets/labels/global_flat.png" 100 200 300 150
