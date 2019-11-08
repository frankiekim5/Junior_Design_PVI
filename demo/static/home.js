

$(document).ready(() => {
	let canvas = document.getElementById('homeGroceryGrade')
	let ctx = canvas.getContext("2d")

	const arcs = [{radius: 270, width: 60, color:"#FF7E4A", s:Math.PI / 3, e: Math.PI + 1},
				{radius: 305, width: 130, color:"#8CBCFF", s: Math.PI + 1, e: Math.PI + 2.3},
				{radius: 320, width: 160, color:"#FFF97B", s: Math.PI + 2.3, e: 11 * Math.PI / 6},
				{radius: 290, width: 100, color:"#92FFA2", s: 11 * Math.PI / 6, e: 7 * Math.PI / 3}]
	let draw = null

	const cx = 500
	const cy = 500

	const drawCircle = (cx, cy, r, w, color, s, e) => {
		ctx.beginPath()
		ctx.lineWidth = w
		ctx.strokeStyle = color
		ctx.arc(cx, cy, r, s, e)
		ctx.stroke()
		ctx.closePath()
	}
	//240 base

	ctx.beginPath()
	ctx.lineWidth = 60
	ctx.strokeStyle = "#FF7E4A"
	ctx.arc(cx, cy, 270, Math.PI / 3, Math.PI + 1)
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	ctx.lineWidth = 130
	ctx.strokeStyle = "#8CBCFF"
	ctx.arc(cx, cy, 305, Math.PI + 1, Math.PI + 2.3)
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	ctx.lineWidth = 160
	ctx.strokeStyle = "#FFF97B"
	ctx.arc(cx, cy, 320, Math.PI + 2.3, 11 * Math.PI / 6)
	ctx.stroke()
	ctx.closePath()

	ctx.beginPath()
	ctx.lineWidth = 100
	ctx.strokeStyle = "#92FFA2"
	ctx.arc(cx, cy, 290, 11 * Math.PI / 6, 7 * Math.PI / 3)
	ctx.stroke()
	ctx.closePath()

	ctx.font = "240px Open Sans"
	ctx.fillText("A-", 420, 580)

	ctx.font = "48px Arial"
	ctx.fillStyle = "#FF7E4A"
	ctx.fillRect(100, 825, 50, 50)


	ctx.fillStyle = "#8CBCFF"
	ctx.fillRect(100, 900, 50, 50)

	ctx.fillStyle = "#FFF97B"
	ctx.fillRect(500, 825, 50, 50)

	ctx.fillStyle = "#92FFA2"
	ctx.fillRect(500, 900, 50, 50)

	ctx.fillStyle = "black"
	ctx.fillText("Protein", 160, 870)
	ctx.fillText("Carbohydrates", 160, 945)
	ctx.fillText("Unsaturated Fat", 560, 870)
	ctx.fillText("Saturated Fat", 560, 945)
	// for (let i = 0; i < arcs.length; i++) {
	// 	setTimeout()
	// }


})