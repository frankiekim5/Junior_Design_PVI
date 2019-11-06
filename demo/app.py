from flask import Flask, flash, request, redirect, url_for, escape, render_template, Markup
import requests
import json


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():
	if request.method == "POST":
		return render_template("index.html")
	# page = render_template("home.html", name="Evelyn S.")
	page = render_template("pantry.html")
	# print(type(page))
	return render_template("index.html", page=Markup(page))


@app.route('/login')
def login():
	return render_template("index.html")

@app.route('/home')
def home():
	page = render_template("home.html", name="test")
	return render_template("index.html", page=Markup(page))


@app.route('/pantry')
def pantry():
	return render_template("pantry.html")
	return render_template("index.html", page=Markup(page))

@app.route('/meals')
def meals():
	return render_template("meals.html")

@app.route('/settings')
def settings():
	return render_template("settings.html")

if __name__ == "__main__":
	app.run(host='0.0.0.0', threaded=True, debug=True)