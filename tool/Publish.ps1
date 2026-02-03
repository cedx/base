if ($Release) {
	& "$PSScriptRoot/Clean.ps1"
	& "$PSScriptRoot/Version.ps1"
	& "$PSScriptRoot/Client/Build.ps1"
}
else {
	"The ""-Release"" switch must be set!"
	exit 1
}

"Publishing the package..."
$version = Import-PowerShellDataFile Base.psd1 | Select-Object -ExpandProperty ModuleVersion
git tag "v$version"
git push origin "v$version"
npm publish

dotnet pack --output var
Get-ChildItem var -Filter *.nupkg | ForEach-Object {
	dotnet nuget push $_ --api-key $Env:NUGET_API_KEY --source https://api.nuget.org/v3/index.json
}
