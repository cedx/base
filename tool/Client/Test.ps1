Write-Host "Running the client test suite..."
npx tsc --build src/Client/tsconfig.json --sourceMap
npx esbuild test/Client/Main.js --bundle --legal-comments=none --outfile=var/Tests.js
node test/Client/Playwright.js
