"Deleting all generated files..."
Remove-Item bin, lib -ErrorAction Ignore -Force -Recurse
Get-ChildItem */obj -Recurse | Remove-Item -Force -Recurse
Remove-Item var/* -Exclude .gitkeep -Force -Recurse
