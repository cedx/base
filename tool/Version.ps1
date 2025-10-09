Write-Output "Updating the version number in the sources..."
$version = (Select-Xml "//Version" Package.xml).Node.InnerText
(Get-Content "package.json") -replace '"version": "\d+(\.\d+){2}"', """version"": ""$version""" | Out-File "package.json"
Get-ChildItem "*/*.csproj" -Recurse | ForEach-Object {
	(Get-Content $_) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Out-File $_
}
