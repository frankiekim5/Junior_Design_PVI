import requests
import json
import argparse

host = "127.0.0.1:5000"

def post(page):
	url = "http://%s/%s" % (host, page)

	if page == "login":
		param = {'username':'username', 'password':'password', 'action':'login'}
	elif page == "inventory":
		param = {'username': 'kmont3', 'accessToken':"PKo5k77rfFBFO4WVLjY4OwhSo4qFvV1kYDOjHTolNnHVuOU52D1BkzJXoJyiVrKJPsVlJzUYMHS1oHVg2b6GCZggLglpmiXPVBYqmhVdjAg7DkZIUA0KGcLtvCj1jFrj1KQRwAzbZwJ5yAwMGNKaCQrxNMwWyr4B59ayYXRnFfqsyoOmL6UEEqtD3FV9xYimOafiVbbmWhbHo7qMJIKzh5xyhayLEX3zCvCUydC0dM3XAaskkHr1T9HZAfpvU0J"}
	else:
		print("Page: /%s is not supported" % page)
		return
	print("SENT DATA:", json.dumps(param), "\n")
	res = requests.post(url, data=param)


	print("RESULT: ", res.text, "\n")



if __name__ == "__main__":
	parser = argparse.ArgumentParser()
	parser.add_argument("-p", "--port", help="the port of the target server", type=int, default=5000)
	parser.add_argument("--host", help="the 0.0.0.0 formatted ip (ipv4) for your target server", type=str, default="127.0.0.1")
	parser.add_argument("-c", "--call", help="the page you want to call. login or inventory", type=str, default="login")
	
	args = parser.parse_args()

	host = "%s:%d" % (args.host, args.port)
	post(args.call)