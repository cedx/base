"Deleting all generated files..."
if (Test-Path "bin") { Remove-Item "bin" -Force -Recurse }
if (Test-Path "lib") { Remove-Item "lib" -Force -Recurse }
foreach ($item in Get-ChildItem "*/obj" -Recurse) { Remove-Item $item -Force -Recurse }
Remove-Item "var/*" -Exclude ".gitkeep" -Force -Recurse
