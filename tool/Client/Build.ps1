"Building the client solution..."
$options = $Release ? @() : @("--sourceMap")
npx tsc --build src/Client/tsconfig.json @options
