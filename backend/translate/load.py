import json
import numpy as np
import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0'; os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical

from functools import reduce
import permutations as permute

np.random.seed(0)

def word_generator(filepath, batch_size=32):
    with open(filepath, 'r') as f: full_names = json.load(f)
    word_names = list(set(reduce(lambda a, b: a + b, map(lambda s: s.strip().split(), full_names))))

    while True:
        batch_names = np.random.choice(word_names, batch_size)
        batch_names = list(map(tokenize, batch_names))

        batch_length = max(map(len, batch_names))

        END_TOKEN = np.zeros((1, 1, 39))
        END_TOKEN[0, 0, 1] = 1
        names = np.array(pad_sequences(batch_names, padding="post", maxlen=batch_length+1, value=END_TOKEN))

        target_names = np.array(np.insert(names[:,1:, :], names.shape[1]-1, 0, axis=1))

        yield (names, names), target_names
        del names, target_names

def delete_char_generator(filepath, batch_size=32, deletions=2, min_deletions=2):
    with open(filepath, 'r') as f: full_names = json.load(f)
    word_names = list(set(reduce(lambda a, b: a + b, map(lambda s: s.strip().split(), full_names))))

    while True:
        batch_names = np.random.choice(word_names, batch_size)

        receipt_names = list(map(lambda name: permute.delete_chars(name, times=np.random.randint(min_deletions, deletions)), batch_names))

        receipt_names = list(map(tokenize, receipt_names))
        target_names = list(map(tokenize, batch_names))

        batch_length = max(map(len, batch_names))

        END_TOKEN = np.zeros((1, 1, 39))
        END_TOKEN[0, 0, 1] = 1
        names = np.array(pad_sequences(receipt_names, padding="post", maxlen=batch_length+1, value=END_TOKEN))

        teacher_names = np.array(pad_sequences(target_names, padding="post", maxlen=batch_length+1, value=END_TOKEN))
        target_names = np.array(np.insert(teacher_names[:,1:, :], teacher_names.shape[1]-1, 0, axis=1))

        yield (names, teacher_names), target_names
        del names, teacher_names, target_names

def loadJSON(filepath, access='r'):
	try:
		with open(filepath, access) as f: return json.load(f)
	except:
		print("Unable to read jsonObject from filepath %s" % filepath)
	return False

def tokenize(name):
	letters = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	name = name.strip()[:20].strip()
	return to_categorical([0] + list(map(lambda letter: letters.index(letter) + 2, name)) + [1], num_classes=39)

def token_to_string(token):
	letters = " 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	# print(token.shape)
	token = np.argmax(token, axis=1)
	try:
		token = token[:np.argwhere(token==1)[-1][0]]
		# print(token)
	except:
		pass
	return "".join(map(lambda letter: letters[letter - 2], filter(lambda letter: letter > 1, token)))

def normal_generator(filepath, batch_size=32):
	with open(filepath, 'r') as f: full_names = json.load(f)
	
	while True:
		batch_names = np.random.choice(full_names, batch_size)
		batch_names = list(map(tokenize, batch_names))

		batch_length = max(map(len, batch_names))

		# names = pad_sequences(batch_names, maxlen=batch_length + 1)
		END_TOKEN = np.zeros((1, 1, 39))
		END_TOKEN[0, 0, 1] = 1
		names = np.array(pad_sequences(batch_names, padding="post", maxlen=batch_length+1, value=END_TOKEN))
		# teacher_names = np.array(np.insert(names, 0, 0, axis=1))
		# print(names.shape)
		target_names = np.array(np.insert(names[:,1:, :], names.shape[1]-1, 0, axis=1))
		# names = pad_sequences(batch_names)

		# print(names.shape, teacher_names.shape, target_names.shape)

		# print(names.shape, target_names.shape)
		yield (names, names), target_names
		# yield names, teacher_names, target_names
		del names, target_names

def delete_full_generator(filepath, batch_size=32, deletions=4, min_deletions=2):
    with open(filepath, 'r') as f: full_names = json.load(f)

    while True:
        batch_names = np.random.choice(full_names, batch_size)
        receipt_names = list(map(lambda name: permute.delete_chars(name, times=np.random.randint(min_deletions, deletions)), batch_names))

        receipt_names = list(map(tokenize, receipt_names))
        target_names = list(map(tokenize, batch_names))

        batch_length = max(map(len, batch_names))

        END_TOKEN = np.zeros((1, 1, 39))
        END_TOKEN[0, 0, 1] = 1
        names = np.array(pad_sequences(receipt_names, padding="post", maxlen=batch_length+1, value=END_TOKEN))

        teacher_names = np.array(pad_sequences(target_names, padding="post", maxlen=batch_length+1, value=END_TOKEN))
        target_names = np.array(np.insert(teacher_names[:,1:, :], teacher_names.shape[1]-1, 0, axis=1))

        yield (names, teacher_names), target_names
        del names, teacher_names, target_names

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