import requests
import json
import argparse

host = "127.0.0.1:5000"

def post(page):
	url = "http://%s/%s" % (host, page)

	if page == "login":
		param = {'username':'username', 'password':'password', 'action':'login'}
	elif page == "inventory":
		param = {'username': 'username', 'accessToken':"fN2ZzH4rVnfTkbU4SV0oFAYVEvU7yeVVWsbHaxWvxj4LZQZdmFwW7dfL30G4cfcTuERhmc4MsePVHMIaOEwXXRFZSIBuuDvUzbyz7OI6ItSoiai2BAqycQt7LXEhauePAohypV6LurA1GLU9QJWpjN2KOja967niFHloSBYcbqNs9voBhtdnpahzHr86wdXxOhrj3UiPFs8KhXhkp2etd6N38yaI88XTVt3PEb4vGTJrFgvkD1jfUY363s72HG2"}
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