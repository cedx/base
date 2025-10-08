Write-Host "Running the test suite..."
dotnet test Base.slnx --settings=etc/RunSettings.xml
npx tsc --build src/Client/tsconfig.json --sourceMap
npx esbuild test/Client/Main.js --bundle --legal-comments=none --outfile=var/Tests.js
node test/Client/Playwright.js
