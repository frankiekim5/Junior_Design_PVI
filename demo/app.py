from flask import Flask, flash, request, redirect, url_for, escape, render_template, Markup
import json
import re


def page(url, **kwargs):
	page = (re.findall(r"<body>(.*)</body>", str(render_template(url, **kwargs)), flags=(re.M|re.S))[0])
	page = Markup(page)
	return page

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():
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


@app.route('/pantry')
def pantry():
	return render_template("index.html", page=page("pantry.html"))

@app.route('/meals')
def meals():
	return render_template("index.html", page=page("meals.html"))

@app.route('/health')
def health():
	return render_template("index.html", page=page("health.html"))

@app.route('/settings')
def settings():
	return render_template("index.html", page=page("settings.html"))

@app.route('/page', methods=['GET'])
def get_page():
	print(request.args.get("page"))
	return {"page": str(page(request.args.get("page", "home.html")))}

if __name__ == "__main__":
	app.run(host='0.0.0.0', threaded=True, debug=True)