from lstm_model import LAE as Model, LAE, edit_loss
import tensorflow as tf
import numpy as np
import permutations as permute
from load import *
import json


from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical


if __name__ == "__main__":
	names_file = "../../data/publix_cleaned.json"

	nn = Model(depth=1, hidden_size=1024, input_size=39)
	nn.nn.summary()

	nn.compile("rmsprop", "categorical_crossentropy", metrics=["accuracy"])
	# output = np.zeros((64, 68, 39))
	# output1 = np.zeros((64, 69, 39))
	# print(nn.nn.predict([output, output1]).shape)
	# input()

	training_gen = normal_generator(names_file, batch_size=64)

	# training_gen = word_generator(names_file, batch_size=128)
	# (batch, _), _

	# (batch, _), _ = next(training_gen)
	# for b in batch:
	# 	word_len = (len(b) - list(reversed(b.tolist())).index(0))
	# 	if word_len == 1:
		# print(token_to_string(b), len(token_to_string(b)))
	# input()
	
	nn.nn.fit(training_gen, steps_per_epoch=100, epochs=50)

	(batch, _), _ = next(training_gen)

	exp = []
	for name in batch[:10]:
		# name = batch[0]
		# print(name.shape)
		# result = nn.predict(np.expand_dims(name, axis=0))[0]

		# result = nn.predict_name(name)
		name_token = np.expand_dims(name, axis=0)
		encoder_h, encoder_c = nn.encoder.predict(name_token)
		result = nn.decoder.predict([name_token, encoder_h, encoder_c])[0]
		# print(token_to_string)

		exp.append(str(token_to_string(name) + " | " +  token_to_string(np.array(result))))
		print(token_to_string(name) + " | " +  token_to_string(result))

	for name in batch[:10]:
		result = nn.predict_name(name)
		print(token_to_string(name) + " | " +  token_to_string(result))
	# input()
	# for i in exp: print(i)