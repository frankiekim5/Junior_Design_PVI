from flask import Flask, flash, request, redirect, url_for, escape, render_template
import requests
import json


app = Flask(__name__)

@app.route('/', methods=['POST'])
def main():
	if request.method == "POST":
		return render_template("index.html")
	return render_template("index.html")


@app.route('/')
def login():
	return render_template("index.html")

if __name__ == "__main__":
	app.run(host='0.0.0.0', threaded=True, debug=True)