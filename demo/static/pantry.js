$(document).ready(() => {
	$("#pantryTrashButton").click(() => {
		$('#removeOptions').css('visibility', 'visible')
		$('#pantryTrashButton').css('visibility', 'hidden')
		$('#title').css('visibility', 'hidden')
		viewStack.push("trash")
	})
	$(".pantryItem").click((elem) => {
		// alert("");
		let check = $(elem.target).children().children()[0];
		$(check).prop("checked", !$(check).prop("checked"));
	})

	$(".pantryItemDescription").click((elem) => {
		// alert("");
		let check = $(elem.target).parent().children().children()[0];
		$(check).prop("checked", !$(check).prop("checked"));
	})

})