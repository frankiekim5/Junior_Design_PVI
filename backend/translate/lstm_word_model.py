import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0'; os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'; print("Silencing tensorflow logs")
import tensorflow as tf; tf.get_logger().setLevel('WARNING')
import numpy as np

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, LSTM, Activation, Dense, Concatenate

class LAW:

    # One character for STOP, one character for space, one character for nothing (0), 36 characters for A-Z0-9
    def __init__(self, input_size=39, hidden_size=256):
        
        self.model = None
        self.input_size = input_size
        self.hidden_size = hidden_size
        self._init_model()
    
    def __str__(self):
        
        lines = []

        self.encoder.summary(print_fn=lambda line: lines.append(line))
        self.decoder.summary(print_fn=lambda line: lines.append(line))
        self.model.summary(print_fn=lambda line: lines.append(line))

        return "\n".join(lines)
    
    def _init_model(self):
        # ENCODER ---------------------------------------
        encoder_layer = encoder_inputs = Input(shape=(None, self.input_size))

        _, encoder_h, encoder_c = LSTM(self.hidden_size, return_sequences=False, return_state=True)(encoder_layer)
        
        self.encoder = Model(inputs=[encoder_inputs], outputs=[encoder_h, encoder_c], name="Encoder")

        # DECODER ---------------------------------------

        decoder_inputs = Input(shape=(None, self.input_size))

        decoder_input_h = Input((self.hidden_size,))
        decoder_input_c = Input((self.hidden_size,))

        decoder_lstm_input = LSTM(self.hidden_size, return_sequences=True, return_state = True)

        decoder_layer, decoder_h, decoder_c = decoder_lstm_input(decoder_inputs, initial_state=[decoder_input_h, decoder_input_c])
        
        decoder_output = Dense(self.input_size, activation="softmax")(decoder_layer)

        self.decoder = Model(inputs=[decoder_inputs, decoder_input_h, decoder_input_c], outputs=[decoder_output, decoder_h, decoder_c], name="Decoder")

        model_output, _, _ = self.decoder([decoder_inputs, self.encoder.outputs[0], self.encoder.outputs[1]])
        self.nn = self.model = Model(inputs=[encoder_inputs, decoder_inputs], outputs=[model_output], name="LSTM_AE")
    
    def fit(self, *args, **kwargs):
        self.nn.fit(*args, **kwargs)

    def compile(self, *args, **kwargs):
        self.nn.compile(*args, **kwargs)
        self.encoder.compile(*args, **kwargs)
        self.decoder.compile(*args, **kwargs)

        # self.predict_name(np.zeros((1, self.input_size)))
    
    def predict_name(self, name_token, **kwargs):
        encoder_h, encoder_c = self.encoder.predict(np.expand_dims(name_token, axis=0))

        initial = np.zeros((1, 1, self.input_size))
        initial[0][0][0] = 1
        result = []
        next_char = np.array(initial)
        for i in range(len(name_token) + 5):
            next_char, encoder_h, encoder_c = self.decoder.predict([next_char, encoder_h, encoder_c])
            result.append(next_char)
            if np.argmax(next_char.flatten()) == 2:
                break
        return np.array(result)


    def fit_generator(self, *args, **kwargs):
        self.nn.fit_generator(*args, **kwargs)

if __name__ == "__main__":
    model = LAW()

    print(model)