Add-Type -AssemblyName System.Drawing

function Crop-Label {
    param([string]$in, [string]$out, [double]$xf, [double]$yf, [double]$wf, [double]$hf)
    try {
        $fullIn = Join-Path (Get-Location) $in
        $fullOut = Join-Path (Get-Location) $out
        $img = [System.Drawing.Image]::FromFile($fullIn)
        $x = [math]::Round($img.Width * $xf)
        $y = [math]::Round($img.Height * $yf)
        $w = [math]::Round($img.Width * $wf)
        $h = [math]::Round($img.Height * $hf)
        
        $bmp = new-object System.Drawing.Bitmap $w, $h
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $rect = new-object System.Drawing.Rectangle 0, 0, $w, $h
        $g.DrawImage($img, $rect, $x, $y, $w, $h, [System.Drawing.GraphicsUnit]::Pixel)
        if (Test-Path $fullOut) { Remove-Item $fullOut -Force }
        $bmp.Save($fullOut, [System.Drawing.Imaging.ImageFormat]::Png)
        $g.Dispose()
        $bmp.Dispose()
        $img.Dispose()
        Write-Host "Cropped $out"
    } catch {
        Write-Host "Failed to crop $in : $($_.Exception.Message)"
    }
}

Crop-Label "assets\brand_global_real.png" "assets\labels\global_flat.png" 0.20 0.45 0.60 0.35
