/**
 * @type {Partial<import("typedoc").TypeDocOptions>}
 */
export default {
	entryPoints: ["../src/Client"],
	entryPointStrategy: "expand",
	excludePrivate: true,
	gitRevision: "main",
	hideGenerator: true,
	name: "Cédric Belin's Base",
	out: "../docs/Client",
	readme: "none",
	tsconfig: "../src/Client/tsconfig.json"
};
