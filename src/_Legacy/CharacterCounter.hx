package core.html;

import coconut.ui.View;
import js.Browser;
import js.Syntax;
import js.html.Element;
import js.html.InputElement;
import js.html.TextAreaElement;

/** Counts the number of characters in a form control. **/
class CharacterCounter extends View {

	/** The maximum number of allowed characters. **/
	@:attribute var maxLength = -1;

	/** The CSS selector used to target the form control. **/
	@:attribute var target: String;

	/** The number of remaining characters. **/
	@:computed var remaining: Int = maxLength >= 0 ? maxLength - value : Syntax.code("Number.MAX_SAFE_INTEGER");

	/** The current number of characters. **/
	@:state var value = 0;

	/** The associated form control. **/
	var element: Null<Element> = null;

	/** Counts the number of characters in the associated form control. **/
	function countCharacters() switch Type.getClass(element) {
		case InputElement: value = (cast element: InputElement).value.length;
		case TextAreaElement: value = (cast element: TextAreaElement).value.length;
	}

	/** Renders this view. **/
	function render() '
		<span class=${{
			badge: true,
			"bg-danger": maxLength >= 0 && remaining < 0,
			"bg-success": maxLength >= 0 && remaining >= 0,
			"text-bg-secondary": maxLength < 0
		}}>
			$value
			<if ${maxLength >= 0}>/$maxLength</if>
		</span>
	';

	/** Method invoked after this view is mounted. **/
	override function viewDidMount() {
		element = Browser.document.querySelector(target);
		element.addEventListener("change", countCharacters);
		element.addEventListener("input", countCharacters);

		Callback.defer(countCharacters);
		beforeUnmounting(() -> {
			element.removeEventListener("change", countCharacters);
			element.removeEventListener("input", countCharacters);
		});
	}
}
