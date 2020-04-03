from flask import Flask, flash, request, redirect, url_for, escape, render_template, Markup
import json

import argparse
import requests

host = "127.0.0.1:8080"

app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
	
	try:
		data = request.form
		data = dict(data)
		print("data sent", json.dumps(data, indent=4))
	except Exception as e:
		return "tried to create data format of request, " + str(e)
	
	try:
		result = requests.post("http://127.0.0.1:8080/login", data=data)
	except Exception as e:
		return "tried to send request," + str(e)
	
	try:
		print("\n\nPost result:", result.json(), "\n\n")
		return result.json()
	except Exception as e:
		return "Error returning json result: " + str(e)

@app.route('/inventory', methods=['POST'])
def inventory():
	
	try:
		data = request.form
		data = dict(data)
		print("data sent", json.dumps(data, indent=4))
	except Exception as e:
		return "tried to create data format of request, " + str(e)
	
	try:
		result = requests.post("http://127.0.0.1:8080/inventory", data=data)
	except Exception as e:
		return "tried to send request," + str(e)
	
	try:
		print("\n\nPost result:", result.json(), "\n\n")
		return result.json()
	except Exception as e:
		return "Error returning json result: " + str(e)

if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("-p", "--port", help="the port of THIS server", type=int, default=5000)
	parser.add_argument("--host", help="the 0.0.0.0 formatted ip (ipv4) for THIS server (you should not change this)", type=str, default="0.0.0.0")

	parser.add_argument("-tp", "--targetport", help="the port of the TARGET server", type=int, default=8080)
	parser.add_argument("-th", "--targethost", help="the 0.0.0.0 formatted ip (ipv4) for the TARGET server", type=str, default="127.0.0.1")

	args = parser.parse_args()

	host = "%s:%d" % (args.targethost, args.targetport)
	app.run(host=args.host, threaded=True, debug=True, port=args.port)