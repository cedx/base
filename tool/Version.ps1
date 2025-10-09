Write-Output "Updating the version number in the sources..."
$version = (Select-Xml "//Version" Package.xml).Node.InnerText
(Get-Content "package.json") -replace '"version": "\d+(\.\d+){2}"', """version"": ""$version""" | Out-File "package.json"
foreach ($item in Get-ChildItem "*/*.csproj" -Recurse) {
	(Get-Content $item) -replace "<Version>\d+(\.\d+){2}</Version>", "<Version>$version</Version>" | Out-File $item
}
