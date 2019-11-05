let viewStack = []
const taskbars = ["Health", "Pantry", "Meals", "Settings"]

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
	viewStack.push(title)	// In the future, we should make this into an object, {title: , screen: }
	$("#title").text(title)
	// TODO: Actually show the page
	// switch (elem.id) {}
}

$(document).ready(() => {
	$("#backButton").click(() => { //TODO: Actually change the screen
		// console.log("WHAT?")
		const currentView = viewStack.pop()
		
		if (viewStack.length == 0) {
			$("#title").text("PVI")
			$(".taskBarButton").removeClass("selectedTBI")
			$("#backButton").css('visibility', 'hidden')
			return
		} else if (taskbars.includes(currentView)){
			let last_task = "PVI" //This logic might break
			for (let i = viewStack.length - 1; i >= 0; i--) {
				if (taskbars.includes(viewStack[i])) {
					last_task = viewStack[i]
					break
				}
			}
			$('.taskBarButton').removeClass("selectedTBI")
			$('#' + last_task.toLowerCase() + "Button").addClass("selectedTBI")
			$("#title").text(viewStack[viewStack.length - 1])
		} else {
			let last_task = "PVI" //This logic might break
			for (let i = viewStack.length - 1; i >= 0; i--) {
				if (taskbars.includes(viewStack[i])) {
					last_task = viewStack[i]
					break
				}
			}
			$('.taskBarButton').removeClass("selectedTBI")
			$('#' + last_task.toLowerCase() + "Button").addClass("selectedTBI")
			$("#title").text(viewStack[viewStack.length - 1])
		}
	})
})
