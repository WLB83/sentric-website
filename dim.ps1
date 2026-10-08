Add-Type -AssemblyName System.Drawing
$img1 = [System.Drawing.Image]::FromFile("assets/premium_battery_base.png")
$img2 = [System.Drawing.Image]::FromFile("assets/brand_rocket_real.png")
Write-Output "Base: $($img1.Width)x$($img1.Height) Rocket: $($img2.Width)x$($img2.Height)"
$img1.Dispose()
$img2.Dispose()
