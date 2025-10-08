Write-Host "Building the client project..."
$options = $release ? @() : @("--sourceMap")
npx tsc --build src/Client/tsconfig.json @options
