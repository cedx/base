Write-Host "Building the project..."
$configuration = $release ? "Release" : "Debug"
dotnet build Base.slnx --configuration=$configuration
$options = $release ? @() : @("--sourceMap")
npx tsc --build src/Client/tsconfig.json @options
