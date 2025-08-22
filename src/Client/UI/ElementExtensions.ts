/**
 * Creates a document fragment from the specified HTML string.
 * @param childContent The HTML string providing the child content.
 * @returns The document fragment corresponding to the specified HTML string.
 */
export function createDocumentFragment(childContent: string): DocumentFragment {
	const template = document.createElement("template");
	template.innerHTML = childContent;
	return template.content;
}

/**
 * Returns a promise that resolves when the specified element has finished all its animations.
 * @param element The target element.
 * @returns The element animations.
 */
export function waitForAnimations(element: Element): Promise<Array<PromiseSettledResult<Animation>>> {
	return Promise.allSettled(element.getAnimations().map(animation => animation.finished));
}
