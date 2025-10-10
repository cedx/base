if ($release) {
	. $PSScriptRoot/Clean.ps1
	. $PSScriptRoot/Version.ps1
	. $PSScriptRoot/Client/Build.ps1
}
else {
	Write-Output 'The "Release" configuration must be enabled!'
	exit 1
}

Write-Output "Publishing the package..."
$version = (Select-Xml "//Version" Package.xml).Node.InnerText
git tag "v$version"
git push origin "v$version"
npm publish --registry=https://registry.npmjs.org
npm publish --registry=https://npm.pkg.github.com

dotnet pack Base.slnx --output=var
foreach ($item in Get-ChildItem "var/*.nupkg") {
	dotnet nuget push $item --api-key=$Env:NUGET_API_KEY --source=https://api.nuget.org/v3/index.json
	dotnet nuget push $item --api-key=$Env:GITHUB_TOKEN --source=https://nuget.pkg.github.com/cedx/index.json
}
