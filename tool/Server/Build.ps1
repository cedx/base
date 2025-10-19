"Building the server solution..."
dotnet build --configuration ($Release ? "Release" : "Debug")
