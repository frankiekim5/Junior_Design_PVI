from flask import Flask, flash, request, redirect, url_for, escape, render_template, Markup
import json
import re


ITEMS = ["Perdue Chicken",
			"Haagen-Dazs Vanilla Ice Cream (4oz)",
			"Publix Ground Beef",
			"Eggland's Best Eggs (Large Brown, 24)",
			"Old Trapper Beef Jerky (11 oz)",
			"Broccoli",
			"Scallions",
			"Fairlife Vanilla Core Power (2 oz)",
			"Publix Paper Towels",
			"Fuji Apples (12)",
			"Halo Clementines",
			"Publix Greenwise Pork Chops (4)",
			"Horizon Whole Milk with Omega 3 DHA (Half Gallon)",
			"Chobani Greek Yogurt - Peach",
			"Chobani Greek Yogurt - Blueberry (3)"]

initial_items = list(ITEMS)

MEALS = [{"description": "Chicken Pot Pie", "url":"imgs/chicken_pot_pie.jpg"},
	{"description": "Baked Potato", "url":"imgs/baked_potato.jpg"},
	{"description": "Caesar Salad", "url":"imgs/caesar_salad.jpg"},
	{"description": "Spaghetti and Meatballs", "url":"imgs/spaghetti_meatballs.jpg"},
	{"description": "Pizza", "url":"imgs/pizza.jpg"},
	{"description": "Ravioli", "url":"imgs/ravioli.png"},
	{"description": "Ramen", "url":"imgs/ramen.jpg"}]

def page(url, **kwargs):
	page = (re.findall(r"<body>(.*)</body>", str(render_template(url, **kwargs)), flags=(re.M|re.S))[0])
	page = Markup(page)
	return page

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():
	global ITEMS
	ITEMS = list(initial_items)
	if not request.script_root:
		request.script_root = url_for('main', _external=True)
	if request.method == "POST":
		return render_template("index.html")
	
	return render_template("index.html", page=page('home.html', name="Evelyn S."))


@app.route('/login')
def login():
	return render_template("index.html")

@app.route('/home')
def home():
	return render_template("index.html", page=page("home.html", name="Evelyn S."))


@app.route('/pantry', methods=["GET", "POST"])
def pantry():
	global ITEMS
	if request.method == "POST":
		items = request.form.get("items", ITEMS)
		ITEMS = list(json.loads(items))
		return ""
	else:
		return render_template("index.html", page=page("pantry.html", itemsList=ITEMS))

@app.route('/meals')
def meals():
	return render_template("index.html", page=page("meals.html", mealsList=MEALS))

@app.route('/health')
def health():
	return render_template("index.html", page=page("health.html"))

@app.route('/settings')
def settings():
	return render_template("index.html", page=page("settings.html"))

@app.route('/page', methods=['GET'])
def get_page():
	return {"page": str(page(request.args.get("page", "home.html"), mealsList=MEALS, itemsList=ITEMS))}



if __name__ == "__main__":
	app.run(host='0.0.0.0', threaded=True, debug=True)