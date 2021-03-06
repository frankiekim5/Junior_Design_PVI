$(document).ready(() => {
	let selectAll = true

	$('#pantryTrashWrap').hide();
	$("#pantryTrashWrap").fadeIn(660)
	$("#pantryTrashWrap").animate({"bottom": "10vh"},
		{duration: 600, queue: false})

	const trash = () => {
		$('#removeOptions').css('visibility', 'visible')
		
		$('#title').css('visibility', 'hidden')
		viewStack.push("trash")
		$("#backButton").css('visibility', 'visible')
		$(".pantryItem").map((i, elem) => {
			$(elem).prepend(`<div class="pantryItemCheckBox"><input class="pantryCheck" type="checkbox"></div>`)
		})
		$("#pantryTrashWrap").fadeOut(500, () => {
			$('#pantryTrashButton').css('visibility', 'hidden')
		})
		$("#pantryTrashWrap").animate({"bottom": "0vh"},
			{duration: 600, queue: false}, () => {
				$("#pantryTrashWrap").css("bottom", "10vh")
		})
	}


	$("#pantryTrashButton").click(() => trash())
	$(".pantryItem").click((elem) => {
		// alert("");
		let check = $(elem.target).children().children()[0]
		$(check).prop("checked", !$(check).prop("checked"))
	})


	let down = {'timer': null, 'item': null}


	$(".pantryItem").bind('touchstart', (elem) => {
		// alert("touch start")
		cancel()
		if (viewStack[viewStack.length - 1] == 'trash') {
			// alert("trash")
			return
		}
		cancel()
		down.timer = setTimeout(() => action(), 900)
		down.item = elem.target
	})

	$(".pantryItem").bind('touchend', () => {
		// alert("touch end")
		cancel()
	})

	$(".pantryItem").bind('touchmove', () => {
		// alert("touch end")
		cancel()
	})

	$(".pantryItem").bind('touchcancel', () => {
		
		cancel()
	})

	const cancel = () => {
		if (down.timer) {
			clearTimeout(down.timer)
		}
		down.timer = null
		down.item = null
	}


	

	const action = () => {
		// alert()
		trash()
		let check = null
		if ($(down.item).attr('class') == "pantryItemDescription") {
			check = $(down.item).parent().find("input")
		} else {
			check = $(down.item).children().find("input")
		}
		
		$(check).prop('checked', 'true')
		down.timer = null
		down.item = null
		
	}



	$(".pantryItemDescription").click((elem) => {
		// alert("");
		let check = $(elem.target).parent().children().children()[0]
		$(check).prop("checked", !$(check).prop("checked"))
	})

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
		
		$.ajax({type:"POST",
			url: $SCRIPT_ROOT + 'pantry',
			data: {items: JSON.stringify(res)},
			success: go_back
		})
	})

})