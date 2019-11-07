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

	$("#trashButton").unbind().click(() => {
		let res = []
		$(".pantryItem").map((_, elem) => {
			let check = $(elem).find('input')
			if (check.prop('checked')) {
				elem.remove()
			} else {
				let des = $(elem).find('.pantryItemDescription')
				res.push($(des).text())
			}
		})
		// console.log(res)
		$.ajax({type:"POST",
			url: $SCRIPT_ROOT + 'pantry',
			data: {items: JSON.stringify(res)},
			// data:{data: JSON.stringify({group: group, index: 0, range: range(questions) })},
			success: go_back
		})
		// $.ajax({type:"GET",
	 //        url: $SCRIPT_ROOT + 'update_items',
	 //        data: {items: res},
	 //        success: go_back
	 //    })
	})

})