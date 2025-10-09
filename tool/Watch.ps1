Write-Output "Watching for file changes..."
npx tsc --build src/Client/tsconfig.json --preserveWatchOutput --sourceMap --watch
