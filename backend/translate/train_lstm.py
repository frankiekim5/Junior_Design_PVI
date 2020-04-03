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
	return to_categorical([1] + list(map(lambda letter: letters.index(letter) + 3, name)) + [2], num_classes=40)

def token_to_string(token):
	letters = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	# print(token.shape)
	token = np.argmax(token, axis=1)
	try:
		token = token[:np.argwhere(token==2)[-1][0]]
		# print(token)
	except:
		pass
	return "".join(map(lambda letter: letters[letter - 3], filter(lambda letter: letter > 2, token)))

def normal_generator(filepath, batch_size=32):
	with open(filepath, 'r') as f: full_names = json.load(f)
	
	while True:
		batch_names = np.random.choice(full_names, batch_size)
		batch_names = list(map(tokenize, batch_names))

		batch_length = max(map(len, batch_names))

		# names = pad_sequences(batch_names, maxlen=batch_length + 1)
		names = np.array(pad_sequences(batch_names, padding="post", maxlen=batch_length+1))
		# teacher_names = np.array(np.insert(names, 0, 0, axis=1))
		# print(names.shape)
		target_names = np.array(np.insert(names[:,1:, :], names.shape[1]-1, 0, axis=1))
		# names = pad_sequences(batch_names)

		# print(names.shape, teacher_names.shape, target_names.shape)

		# print(names.shape, target_names.shape)
		yield (names, names), target_names
		# yield names, teacher_names, target_names
		del names, target_names

def _normal_generator(filepath, batch_size=32):
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

	nn = Model(depth=1, hidden_size=256, input_size=40)
	nn.nn.summary()

	nn.compile("rmsprop", "binary_crossentropy", metrics=["accuracy"])
	# output = np.zeros((64, 68, 39))
	# output1 = np.zeros((64, 69, 39))
	# print(nn.nn.predict([output, output1]).shape)
	# input()

	training_gen = normal_generator(names_file, batch_size=64)
	# (batch, _), _

	# (batch, _), _ = next(training_gen)
	# for b in batch:
	# 	word_len = (len(b) - list(reversed(b.tolist())).index(0))
	# 	if word_len == 1:
		# print(token_to_string(b), len(token_to_string(b)))
	# input()
	
	nn.nn.fit(training_gen, steps_per_epoch=100, epochs=40)

	(batch, _), _ = next(training_gen)

	exp = []
	for name in batch[:10]:
		# name = batch[0]
		# print(name.shape)
		# result = nn.predict(np.expand_dims(name, axis=0))[0]

		result = nn.predict_name(name)

		exp.append(str(token_to_string(name) + " | " +  token_to_string(np.array(result))))
		print(token_to_string(name) + " | " +  token_to_string(result))
	input()
	for i in exp: print(i)