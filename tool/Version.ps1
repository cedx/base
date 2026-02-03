"Updating the version number in the sources..."
$version = Import-PowerShellDataFile Base.psd1 | Select-Object -ExpandProperty ModuleVersion
(Get-Content package.json) -replace '"version": "\d+(\.\d+){2}"', """version"": ""$version""" | Out-File package.json
Get-ChildItem -Exclude node_modules -Filter *.csproj -Recurse | ForEach-Object {
	(Get-Content $_) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Out-File $_
}
