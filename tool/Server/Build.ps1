"Building the server project..."
$configuration = $release ? "Release" : "Debug"
dotnet build Base.slnx --configuration=$configuration
