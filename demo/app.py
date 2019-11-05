from flask import Flask, flash, request, redirect, url_for, escape, render_template
import requests
import json


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():
	if request.method == "POST":
		return render_template("index.html")
	return render_template("index.html")


@app.route('/login')
def login():
	return render_template("index.html")

@app.route('/home')
def home():
	return render_template("home.html")


@app.route('/pantry')
def pantry():
	return render_template("pantry.html")

@app.route('/meals')
def meals():
	return render_template("meals.html")

@app.route('/settings')
def settings():
	return render_template("settings.html")

if __name__ == "__main__":
	app.run(host='0.0.0.0', threaded=True, debug=True)