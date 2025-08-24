package core.html;

import coconut.ui.View;
import js.html.Element;
import js.html.Event;
import core.data.Pagination;

/** Displays links relevant to the pagination of data items. **/
class Pager extends View {

	/** The pager alignment. **/
	@:attribute var alignment: PagerAlignment = Center;

	/** The handler invoked when the current page has been changed. **/
	@:attribute var onNavigate: Callback<Int>;

	/** The underlying pagination model. **/
	@:attribute var pagination: Pagination;

	/** The number of items displayed around the active item. **/
	@:attribute var sideItems: Int = 1;

	/** Navigates to the specified page. **/
	public function navigate(page: Int, ?event: Event) {
		if (event != null) (cast event.target: Element).closest("button").blur();
		if (page >= 1 && page <= pagination.pageCount && page != pagination.page) onNavigate.invoke(page);
	}

	/** Gets the list of buttons to display. **/
	function getItems() {
		final start = Std.int(Math.max(1, pagination.page - sideItems));
		final end = Std.int(Math.min(pagination.pageCount, pagination.page + sideItems));

		final items = [];
		if (start > 1) items.push(1);
		if (start > 2) items.push(0);
		for (index in start...(end + 1)) items.push(index);
		if (end < pagination.pageCount - 1) items.push(0);
		if (end < pagination.pageCount) items.push(pagination.pageCount);
		return items;
	}

	/** Renders this view. **/
	function render() '
		<if ${pagination.pageCount > 1}>
			<nav>
				<ul class=${['pagination justify-content-$alignment' => true]}>
					<li class=${{disabled: pagination.page <= 1, "page-item": true}}>
						<button class="page-link" onclick=${navigate(pagination.page - 1, event)} type=${Button}>
							<i class="icon">chevron_left</i><span class="d-none d-sm-inline ms-1">Précédent</span>
						</button>
					</li>
					<for ${index in getItems()}>
						<li class=${{active: index == pagination.page, disabled: index == 0, "page-item": true}}>
							<button class="page-link" onclick=${navigate(index, event)} type=${Button}>${index == 0 ? "..." : index}</button>
						</li>
					</for>
					<li class=${{disabled: pagination.page >= pagination.pageCount, "page-item": true}}>
						<button class="page-link" onclick=${navigate(pagination.page + 1, event)} type=${Button}>
							<span class="d-none d-sm-inline me-1">Suivant</span><i class="icon">chevron_right</i>
						</button>
					</li>
				</ul>
			</nav>
		</if>
	';
}

/** Defines the alignment of a pager. **/
enum abstract PagerAlignment(String) {

	/** The pager is aligned to the end. **/
	var End = "end";

	/** The pager is aligned to the center. **/
	var Center = "center";

	/** The pager is aligned to the start. **/
	var Start = "start";
}
