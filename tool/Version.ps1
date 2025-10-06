Write-Host "Updating the version number in the sources..."
$version = [xml] (Get-Content "Package.xml") | Select-Xml "//Version"
(Get-Content "package.json") -replace '"version": "\d+(\.\d+){2}"', """version"": ""$version""" | Out-File "package.json"
foreach ($item in Get-ChildItem "*.csproj" -Exclude "node_modules" -Recurse) {
	(Get-Content $item) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Out-File $item
}
