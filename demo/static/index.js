let viewStack = []
const taskbars = ["health", "pantry", "meals", "settings"]

let uuid = null

let taskbarClick = (elem) => {
	// change selected taskbar button
	$(".taskBarButton").removeClass("selectedTBI")
	$(elem).addClass("selectedTBI")

	// make back button visible
	$("#backButton").css('visibility', 'visible')
	
	// Change title text
	const title = $(elem).attr("name")
	if (viewStack[viewStack.length - 1] === title) {
		return
	}
	// viewStack.push(title)	// In the future, we should make this into an object, {title: , screen: }
	$("#title").css("visibility", "visible")
	$("#removeOptions").css("visibility", "hidden")
	$("#title").text(title)
	// TODO: Actually show the page
	loadPage(title)
}

let loadPage = (page) => {
	$.ajax({type:"GET",
        url: $SCRIPT_ROOT + 'page',
        data: {page: page.toLowerCase() + ".html"},
        success: populatePage
    })
    if (taskbars.includes(page.toLowerCase())) {
    	viewStack = [page]
    } else {
    	viewStack.push(page)
    }
    
}

let populatePage = (data) => {
	$("#container").html(data.page)
}

$(document).ready(() => {

	document.addEventListener("touchstart", function(){}, true)
	$("#backButton").click(() => { //TODO: Actually change the screen
		// console.log("WHAT?")
		const currentView = viewStack.pop().toLowerCase()
		$("#removeOptions").css("visibility", "hidden")
		// alert(viewStack)
		if (viewStack.length == 0) {
			$("#title").text("PVI")
			$(".taskBarButton").removeClass("selectedTBI")
			$("#backButton").css('visibility', 'hidden')
			loadPage('home')
		// } else if (taskbars.includes(currentView)){
		// 	let last_task = "PVI" //This logic might break
		// 	// for (let i = viewStack.length - 1; i >= 0; i--) {
		// 	// 	if (taskbars.includes(viewStack[i])) {
		// 	// 		last_task = viewStack[i]
		// 	// 		break
		// 	// 	}
		// 	// }

		// 	$('.taskBarButton').removeClass("selectedTBI")
		// 	$('#' + last_task.toLowerCase() + "Button").addClass("selectedTBI")
		// 	$("#title").text(last_task)
		} else {
			let last_task = "home" //This logic might break
			for (let i = viewStack.length - 1; i >= 0; i--) {
				if (taskbars.includes(viewStack[i].toLowerCase())) {
					last_task = viewStack[i]
					break
				}
			}
			loadPage(viewStack[viewStack.length - 1])
			$('.taskBarButton').removeClass("selectedTBI")
			$('#' + last_task.toLowerCase() + "Button").addClass("selectedTBI")
			$("#title").text(viewStack[viewStack.length - 1])
			$("#title").css("visibility", "visible")
			$("#removeOptions").css("visibility", "hidden")
		}
	})
})
