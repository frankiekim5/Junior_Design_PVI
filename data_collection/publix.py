from selenium import webdriver
import urllib
from urllib import request
import json
import time
import re
import os

# JSON read, write functions

def writeJSON(jsonObject, filepath, access='w', indent=4):
	try:
		with open(filepath, access) as f: json.dump(jsonObject, f, indent=indent)
	except:
		print("Unable to write jsonObject to filepath %s" % filepath)
		return False
	return True

def loadJSON(filepath, access='r'):
	try:
		with open(filepath, access) as f: return json.load(f)
	except:
		print("Unable to read jsonObject from filepath %s" % filepath)
	return False



if __name__ == "__main__":

	driver = webdriver.Chrome("../venv/chromedriver.exe")

	driver.get("https://www.publix.com/search/products/grocery/cd67644e-6180-485f-86f4-0d364937e0e6?page=5000")

	length = 0

	titles = set()

	links = loadJSON("links.json")

	for product, link in links.items():
		driver.get(link)
		
		for _ in range(1000):
			time.sleep(0.01)
			source = ''.join(driver.page_source)
			matches = re.findall(r'<div class=\"text-block-primary card-title clamp-3\">([^<]*)</div>', source, flags=re.I | re.M | re.S)
			if matches:
				time.sleep(0.3)
				break
		matches += re.findall(r'<div class=\"text-block-primary card-title clamp-3\">([^<]*)</div>', source, flags=re.I | re.M | re.S)

		for m in matches: titles.add(m)
		print(product, len(matches))
		length += len(matches)

		writeJSON(matches, "../data/publix/%s.json" % product)
	

	driver.quit()

	writeJSON(sorted(list(titles)), "../data/publix/TOTAL.json")
	print(length, len(titles))



