using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;
using static System.IO.File;

var release = HasArgument("r") || HasArgument("release");
var target = HasArgument("t") ? Argument<string>("t") : Argument("target", "default");
var version = Context.Configuration.GetValue("package_version");

Task("build")
	.Description("Builds the project.")
	.IsDependentOn("build:client")
	.IsDependentOn("build:server");

Task("build:client")
	.Description("Builds the client project.")
	.Does(() => StartShell("npx", $"tsc --build src/Client/tsconfig.json {(release ? string.Empty : "--sourceMap")}".TrimEnd()));

Task("build:server")
	.Description("Builds the server project.")
	.Does(() => DotNetBuild("Base.slnx", new() { Configuration = release ? "Release" : "Debug" }));

Task("clean")
	.Description("Deletes all generated files.")
	.DoesForEach(["bin", "lib"], folder => EnsureDirectoryDoesNotExist(folder))
	.DoesForEach(GetDirectories("**/obj"), EnsureDirectoryDoesNotExist)
	.Does(() => CleanDirectory("var", fileSystemInfo => fileSystemInfo.Path.Segments[^1] != ".gitkeep"));

Task("doc")
	.Description("Builds the documentation.")
	.Does(() => StartShell("npx", "typedoc --options etc/TypeDoc.js"));

Task("format")
	.Description("Formats the source code.")
	.DoesForEach(GetDirectories("src/Server/*"), project => DotNetFormat(project.FullPath))
	.Does(() => DotNetFormat("test/Server"));

Task("lint")
	.Description("Performs the static analysis of source code.")
	.Does(() => StartShell("npx", "tsc --build tsconfig.json --noEmit"))
	.Does(() => StartShell("npx", "eslint --cache --cache-location=var --config=etc/ESLint.js src/Client test/Client"));

Task("outdated")
	.Description("Checks for outdated dependencies.")
	.Does(() => StartProcess("dotnet", "list package --outdated"))
	.Does(() => StartShell("npm", "outdated"));

Task("publish")
	.Description("Publishes the package.")
	.WithCriteria(release, @"the ""Release"" configuration must be enabled")
	.IsDependentOn("default")
	.Does(() => DotNetPack("Base.slnx", new() { OutputDirectory = "var" }))
	.DoesForEach(["tag", "push origin"], action => StartProcess("git", $"{action} v{version}"))
	.DoesForEach(["https://registry.npmjs.org", "https://npm.pkg.github.com"], registry => StartShell("npm", $"publish --registry={registry}"))
	.DoesForEach(() => GetFiles("var/*.nupkg"), file => DotNetNuGetPush(file, new() { ApiKey = EnvironmentVariable("NUGET_API_KEY"), Source = "https://api.nuget.org/v3/index.json" }))
	.DoesForEach(() => GetFiles("var/*.nupkg"), file => DotNetNuGetPush(file, new() { ApiKey = EnvironmentVariable("GITHUB_TOKEN"), Source = "https://nuget.pkg.github.com/cedx/index.json" }));

Task("test")
	.Description("Runs the test suite.")
	.IsDependentOn("test:client")
	.IsDependentOn("test:server");

Task("test:client")
	.Description("Runs the client test suite.")
	.Does(() => StartShell("npx", "tsc --build src/Client/tsconfig.json --sourceMap"))
	.Does(() => StartShell("npx", "esbuild --bundle --legal-comments=none --log-level=warning --outfile=var/Tests.js test/Client/Main.js"))
	.Does(() => StartProcess("node", "test/Client/Playwright.js"));

Task("test:server")
	.Description("Runs the server test suite.")
	.Does(() => DotNetTest("Base.slnx", new() { Settings = ".runsettings" }));

Task("version")
	.Description("Updates the version number in the sources.")
	.Does(() => ReplaceInFile("package.json", @"""version"": ""\d+(\.\d+){2}""", $"\"version\": \"{version}\""))
	.Does(() => ReplaceInFile("ReadMe.md", @"project/v\d+(\.\d+){2}", $"project/v{version}"))
	.DoesForEach(GetFiles("**/*.csproj"), file => ReplaceInFile(file, @"<Version>\d+(\.\d+){2}</Version>", $"<Version>{version}</Version>"));

Task("watch")
	.Description("Watches for file changes.")
	.Does(() => {
		using var watcher = StartAndReturnShell("npx", "tsc --build src/Client/tsconfig.json --preserveWatchOutput --sourceMap --watch");
		watcher.WaitForExit();
	});

Task("default")
	.Description("The default task.")
	.IsDependentOn("clean")
	.IsDependentOn("version")
	.IsDependentOn("build");

RunTarget(target);

/// <summary>
/// Replaces the specified pattern in a given file.
/// </summary>
/// <param name="file">The path of the file to be processed.</param>
/// <param name="pattern">The regular expression to find.</param>
/// <param name="replacement">The replacement text.</param>
/// <param name="options">The regular expression options to use.</param>
static void ReplaceInFile(FilePath file, [StringSyntax(StringSyntaxAttribute.Regex)] string pattern, string replacement, RegexOptions options = RegexOptions.None) =>
	WriteAllText(file.FullPath, Regex.Replace(ReadAllText(file.FullPath), pattern, replacement, options));

/// <summary>
/// Executes the specified command using a shell.
/// </summary>
/// <param name="command">The name of the command to be executed.</param>
/// <param name="arguments">The arguments used in the process settings.</param>
void StartShell(string command, string arguments) =>
	StartProcess("pwsh", $"-Command {command} {arguments}");

/// <summary>
/// Executes the specified command using a shell.
/// </summary>
/// <param name="command">The name of the command to be executed.</param>
/// <param name="arguments">The arguments used in the process settings.</param>
/// <returns>The newly started process.</returns>
IProcess StartAndReturnShell(string command, string arguments) =>
	StartAndReturnProcess("pwsh", new() { Arguments = $"-Command {command} {arguments}" });
