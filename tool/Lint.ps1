"Performing the static analysis of source code..."
Import-Module PSScriptAnalyzer
Invoke-ScriptAnalyzer $PSScriptRoot -ExcludeRule PSAvoidUsingPositionalParameters -Recurse
Test-ModuleManifest Base.psd1 | Out-Null
npx tsc --build src/Client/tsconfig.json --noEmit
npx eslint --cache --cache-location var --config etc/ESLint.js src/Client test/Client
