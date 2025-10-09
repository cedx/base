Write-Output "Deleting all generated files..."
if (Test-Path "bin") { Remove-Item "bin" -Force -Recurse }
if (Test-Path "lib") { Remove-Item "lib" -Force -Recurse }
Get-ChildItem "*/obj" -Recurse | ForEach-Object { Remove-Item $_ -Force -Recurse }
Remove-Item "var/*" -Exclude ".gitkeep" -Force -Recurse
