from lstm_word_model import LAW as Model, LAW
import tensorflow as tf
import numpy as np

from load import *
import json
from functools import reduce

names_file = "../../data/publix_cleaned.json"

if __name__ == "__main__":
    nn = Model(hidden_size=512, input_size=39)

    nn.compile("rmsprop", "categorical_crossentropy", metrics=['accuracy'])

    training_gen = word_generator(names_file, batch_size=128)

    nn.fit(training_gen, steps_per_epoch=100, epochs=100)

    training_gen = delete_char_generator(names_file, batch_size=128)

    nn.decoder.trainable = False

    nn.fit(training_gen, steps_per_epoch=100, epochs=50)

    (batch, _), result = next(training_gen)

    for name, res_name in zip(batch[:10], result[:10]):
        result = nn.predict_name(name)
        result = np.reshape(result, (-1, 39))
        # print(result.shape)
		
        print(token_to_string(name) + " | " + token_to_string(res_name) + " | " +  token_to_string(result))