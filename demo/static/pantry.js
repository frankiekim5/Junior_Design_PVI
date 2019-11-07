$(document).ready(() => {
	let selectAll = true
	$("#pantryTrashButton").click(() => {
		$('#removeOptions').css('visibility', 'visible')
		$('#pantryTrashButton').css('visibility', 'hidden')
		$('#title').css('visibility', 'hidden')
		viewStack.push("trash")
		$("#backButton").css('visibility', 'visible')
		$(".pantryItem").map((i, elem) => {
			$(elem).prepend(`<div class="pantryItemCheckBox"><input class="pantryCheck" type="checkbox"></div>`)
		})
	})
	$(".pantryItem").click((elem) => {
		// alert("");
		let check = $(elem.target).children().children()[0]
		$(check).prop("checked", !$(check).prop("checked"))
	})

	$(".pantryItemDescription").click((elem) => {
		// alert("");
		let check = $(elem.target).parent().children().children()[0]
		$(check).prop("checked", !$(check).prop("checked"))
	})

	// prepend(`<div class="pantryItemCheckBox"><input class="pantryCheck" type="checkbox"></div>`)

	$("#selectAll").click(() => {
		if (selectAll) {
			$(".pantryItem").map((i, elem) => {
				$(elem).find('input').prop("checked", true)
			})
		} else {
			$(".pantryItem").map((i, elem) => {
				$(elem).find('input').prop("checked", false)
			})
		}
		selectAll = !selectAll
		

	})

	$("#trashButton").click(() => {
		$(".pantryItem").map((_, elem) => {
			let check = $(elem).find('input')
			if (check.prop('checked')) {
				elem.remove()
			}
		})
	})

})