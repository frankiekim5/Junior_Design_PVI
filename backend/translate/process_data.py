import numpy as numpy
import json

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

def clean(name):
	legal = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890 "

	name = name.upper()
	return "".join(list(filter(lambda a: a in legal, name)))


if __name__ == '__main__':
	names = loadJSON("../../data/publix.json")
	names = list(map(clean, names))
	# print(names)
	writeJSON(names, "../../data/publix_cleaned.json")
    # names = []
