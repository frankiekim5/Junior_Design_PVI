from lstm_model import LAE as Model, LAE, edit_loss
import tensorflow as tf
import numpy as np
import permutations as permute
import json

from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical

np.random.seed(0)

def loadJSON(filepath, access='r'):
	try:
		with open(filepath, access) as f: return json.load(f)
	except:
		print("Unable to read jsonObject from filepath %s" % filepath)
	return False

def tokenize(name):
	letters = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	return to_categorical(list(map(lambda letter: letters.index(letter) + 2, name)) + [1], num_classes=39)

def token_to_string(token):
	letters = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	token = np.argmax(token, axis=1)
	try:
		token = token[:np.argwhere(token==1)[-1][0]]
	except:
		pass
	return "".join(map(lambda letter: letters[letter - 2], filter(lambda letter: letter > 1, token)))

def normal_generator(filepath, batch_size=32):
	with open(filepath, 'r') as f: full_names = json.load(f)
	
	while True:
		batch_names = np.random.choice(full_names, batch_size)
		batch_names = list(map(tokenize, batch_names))

		batch_length = max(map(len, batch_names))

		names = pad_sequences(batch_names, maxlen=batch_length + 1)
		target_names = pad_sequences(batch_names, padding="post", maxlen=batch_length+1)
		# names = pad_sequences(batch_names)

		# print(names.shape, target_names.shape)
		yield names, names
		del names, target_names

if __name__ == "__main__":
	names_file = "../../data/publix_cleaned.json"

	nn = Model(depth=1, hidden_size=512)
	nn.nn.summary()

	training_gen = normal_generator(names_file, batch_size=64)

	# batch = next(gen)
	# for b in batch:
	# 	word_len = (len(b) - list(reversed(b.tolist())).index(0))
	# 	if word_len == 1:
	# 		print(token_to_string(b), len(token_to_string(b)))
	
	nn.compile("adam", "binary_crossentropy", metrics=["accuracy"])
	nn.nn.fit_generator(training_gen, steps_per_epoch=200, epochs=30)

	batch = next(training_gen)
	for name in batch[0]:
		# name = batch[0]
		# print(name.shape)
		result = nn.nn.predict(np.expand_dims(name, axis=0))[0]

		print(token_to_string(name), " | ",  token_to_string(result))