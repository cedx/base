"Checking for outdated dependencies..."
Get-ChildItem src/Server -Directory | ForEach-Object { dotnet package list --outdated --project $_ }
npm outdated
