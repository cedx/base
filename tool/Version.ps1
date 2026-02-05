"Updating the version number in the sources..."
$version = Import-PowerShellDataFile Base.psd1 | Select-Object -ExpandProperty ModuleVersion
(Get-Content package.json -Raw) -replace '"version": "\d+(\.\d+){2}"', """version"": ""$version""" | Set-Content package.json -NoNewLine
Get-ChildItem -Exclude node_modules -Filter *.csproj -Recurse | ForEach-Object {
	(Get-Content $_ -Raw) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Set-Content $_ -NoNewLine
}
