$(document).ready(() => {
	$("#pantryTrashButton").click(() => {
		$('#removeOptions').css('visibility', 'visible')
		$('#pantryTrashButton').css('visibility', 'hidden')
		$('#title').css('visibility', 'hidden')
		viewStack.push("trash")
	})
})