import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0'; os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'; print("Silencing tensorflow logs")
import tensorflow as tf; tf.get_logger().setLevel('WARNING')
import numpy as np

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, LSTM, RepeatVector, Lambda, TimeDistributed, Activation, Dense, Bidirectional

def edit_distance(y_pred, y_true):
    y_pred, y_true = tf.sparse.from_dense(y_pred), tf.sparse.from_dense(y_true)
    loss = tf.reduce_sum(tf.edit_distance(y_pred, y_true))
    print(loss)
    return loss

def edit_loss():
    def edit(y_pred, y_true): # might need to reverse the order of params here
        return edit_distance(y_pred, y_true)
    return edit


class LAE:

    # One character for STOP, one character for space, one character for nothing (0), 36 characters for A-Z0-9
    def __init__(self, input_size=39, max_len=200, depth=2, hidden_size=256):
        
        self.model = None
        self.input_size = input_size
        self.max_len = max_len
        self.depth = depth
        self.hidden_size = hidden_size
        self._init_model()
    
    def __str__(self):
        
        lines = []

        self.encoder.summary(print_fn=lambda line: lines.append(line))
        self.decoder.summary(print_fn=lambda line: lines.append(line))
        self.model.summary(print_fn=lambda line: lines.append(line))

        return "\n".join(lines)

    
    # def _init_model(self):

    #     def repeat_vector(args):
    #         layer_to_repeat = args[0]
    #         sequence_layer = args[1]
    #         return RepeatVector(tf.shape(sequence_layer)[1])(layer_to_repeat)

    #     input_layer = Input((None, self.input_size), name="InputLayer")

    #     layer = input_layer

    #     for i in range(self.depth):
    #         layer = (LSTM(self.hidden_size, return_sequences=True))(layer)
    #     # layer = LSTM(self.hidden_size, return_sequences=True, go_backwards=False)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True, go_backwards=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
        
    #     # _, _, layer = LSTM(self.hidden_size, return_sequences=False, return_state=True)(layer)
    #     # layer = Lambda(repeat_vector, output_shape=(None, self.input_size))([layer, input_layer])

    #     for i in range(self.depth):
    #         layer = (LSTM(self.hidden_size, return_sequences=True))(layer)

    #     # layer = LSTM(self.hidden_size, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)

    #     layer = LSTM(self.input_size, return_sequences=True)(layer)
    #     layer = TimeDistributed(Activation("softmax"))(layer)

    #     self.model = Model(inputs=[input_layer], outputs=[layer], name="LSTMAE")
    #     self.nn = self.model

    # def _init_model(self):
    #     def repeat_vector(args):
    #         layer_to_repeat = args[0]
    #         sequence_layer = args[1]
    #         return RepeatVector(tf.shape(sequence_layer)[1])(layer_to_repeat)

    #     input_layer = Input((None, self.input_size), name="InputLayer")

    #     layer = input_layer

    #     for i in range(self.depth):
    #         layer = (LSTM(self.hidden_size, return_sequences=True))(layer)
    #     layer, h, c = LSTM(self.hidden_size, return_sequences=False, return_state=True)(layer)
        
    #     # _, _, layer = LSTM(self.hidden_size, return_sequences=False, return_state=True)(layer)
    #     layer = Lambda(repeat_vector, output_shape=(None, self.input_size))([layer, input_layer])

    #     layer = LSTM(self.hidden_size, return_sequences=True)(layer, initial_state=[h, c])

    #     for i in range(self.depth):
    #         layer = (LSTM(self.hidden_size, return_sequences=True))(layer)

    #     # layer = LSTM(self.hidden_size, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)
    #     # layer = LSTM(1000, return_sequences=True)(layer)

    #     layer = LSTM(self.input_size, return_sequences=True)(layer)
    #     layer = TimeDistributed(Activation("softmax"))(layer)

    #     self.model = Model(inputs=[input_layer], outputs=[layer], name="LSTMAE")
    #     self.nn = self.model

    def _init_model(self):

        # ENCODER ---------------------------------------
        encoder_layer = encoder_inputs = Input(shape=(None, self.input_size))

        for i in range(self.depth):
            encoder_layer = (LSTM(self.hidden_size, return_sequences=True))(encoder_layer)

        _, encoder_h, encoder_c = LSTM(self.hidden_size, return_sequences=False, return_state=True)(encoder_layer)
        
        self.encoder = Model(inputs=[encoder_inputs], outputs=[encoder_h, encoder_c], name="Encoder")

        # ------------------------------------------------

        # DECODER ----------------------------------------

        decoder_inputs = Input(shape=(None, self.input_size))

        decoder_input_h = Input((self.hidden_size,))
        decoder_input_c = Input((self.hidden_size,))

        decoder_lstm_input = LSTM(self.hidden_size, return_sequences=True)

        decoder_layer = decoder_lstm_input(decoder_inputs, initial_state=[decoder_input_h, decoder_input_c])
        for i in range(self.depth):
            decoder_layer = (LSTM(self.hidden_size, return_sequences=True))(decoder_layer)
        
        decoder_layer = (LSTM(self.hidden_size, return_sequences=True))(decoder_layer)

        decoder_dense = Dense(self.input_size, activation="softmax")
        # decoder_activation = Activation("softmax")

        decoder_output = decoder_dense(decoder_layer)

        self.decoder = Model(inputs=[decoder_inputs, decoder_input_h, decoder_input_c], outputs=[decoder_output], name="Decoder")

        model_output = self.decoder([decoder_inputs, self.encoder.outputs[0], self.encoder.outputs[1]])

        self.nn = self.model = Model(inputs=[encoder_inputs, decoder_inputs], outputs=[model_output], name="LSTM_AE")

        # -------------------------------------------------

        # MODEL -------------------------------------------

        # self.decoder()

        # model = Model([encoder_inputs, decoder_inputs], decoder_output)
        # self.nn = self.model = Model(inputs=[encoder_inputs, decoder_inputs], outputs=[decoder_output], name="LSTMAE")

        

        


    def fit(self, *args, **kwargs):
        self.nn.fit(*args, **kwargs)

    def compile(self, *args, **kwargs):
        self.nn.compile(*args, **kwargs)
        self.encoder.compile(*args, **kwargs)
        self.decoder.compile(*args, **kwargs)

        # self.predict_name(np.zeros((1, self.input_size)))
    
    def predict_name(self, name_token, **kwargs):
        # print(np.expand_dims(name_token, axis=0).shape)
        # input()
        encoder_h, encoder_c = self.encoder.predict(np.expand_dims(name_token, axis=0))

        # print(encoder_h.shape, encoder_c.shape)

        initial = np.zeros((1, 1, self.input_size))
        initial[0][0][1] = 1
        result = np.array(initial)
        for i in range(len(name_token) + 5):
            result = self.decoder.predict([result, encoder_h, encoder_c])
            result = np.array(np.concatenate([initial, result], axis=1))
            # print(result.shape)
            if np.argmax(result[-1]) == 2:
                break
        # print(np.argmax(result, axis=-1), result.shape)
        return result[0]


    def fit_generator(self, *args, **kwargs):
        self.nn.fit_generator(*args, **kwargs)




if __name__ == "__main__":

    model = LAE()
    model.model.summary()


