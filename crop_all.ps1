Add-Type -AssemblyName System.Drawing

function Crop-Label {
    param([string]$in, [string]$out, [double]$xf, [double]$yf, [double]$wf, [double]$hf)
    try {
        $img = [System.Drawing.Image]::FromFile($in)
        $x = [math]::Round($img.Width * $xf)
        $y = [math]::Round($img.Height * $yf)
        $w = [math]::Round($img.Width * $wf)
        $h = [math]::Round($img.Height * $hf)
        
        $bmp = new-object System.Drawing.Bitmap $w, $h
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $rect = new-object System.Drawing.Rectangle 0, 0, $w, $h
        $g.DrawImage($img, $rect, $x, $y, $w, $h, [System.Drawing.GraphicsUnit]::Pixel)
        $bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
        Write-Host "Cropped $out"
    } catch {
        Write-Host "Failed to crop $in"
    }
}

# Rocket already exists perfectly
# Global (Label is lower middle)
Crop-Label "assets/brand_global_real.png" "assets/labels/global_flat.png" 0.20 0.45 0.60 0.35
# Maxtorm (Label is lower middle)
Crop-Label "assets/brand_maxtorm_real.png" "assets/labels/maxtorm_flat.png" 0.20 0.45 0.60 0.35
# Supreme (Label is lower middle)
Crop-Label "assets/brand_supreme_real.png" "assets/labels/supreme_flat.png" 0.20 0.45 0.60 0.35
# Colossus (Label is lower middle)
Crop-Label "assets/brand_colossus_real.png" "assets/labels/colossus_flat.png" 0.20 0.45 0.60 0.35
# Sentric (Using the exploded view, let's just use the whole image since it's an abstract design)
