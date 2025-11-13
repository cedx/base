"Deleting all generated files..."
"bin", "lib" | Remove-Item -ErrorAction Ignore -Force -Recurse
Get-ChildItem "*/obj" -Recurse | Remove-Item -Force -Recurse
Remove-Item "var/*" -Exclude ".gitkeep" -Force -Recurse
