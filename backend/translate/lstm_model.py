import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0'; os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'; print("Silencing tensorflow logs")
import tensorflow as tf

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, LSTM, RepeatVector, Lambda, TimeDistributed, Activation, Bidirectional

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
    
    def _init_model(self):

        def repeat_vector(args):
            layer_to_repeat = args[0]
            sequence_layer = args[1]
            return RepeatVector(tf.shape(sequence_layer)[1])(layer_to_repeat)

        input_layer = Input((None, self.input_size), name="InputLayer")

        layer = input_layer

        for i in range(self.depth):
            layer = (LSTM(self.hidden_size, return_sequences=True))(layer)
        # layer = LSTM(self.hidden_size, return_sequences=True, go_backwards=False)(layer)
        # layer = LSTM(1000, return_sequences=True)(layer)
        # layer = LSTM(1000, return_sequences=True, go_backwards=True)(layer)
        # layer = LSTM(1000, return_sequences=True)(layer)
        
        # _, _, layer = LSTM(self.hidden_size, return_sequences=False, return_state=True)(layer)
        # layer = Lambda(repeat_vector, output_shape=(None, self.input_size))([layer, input_layer])

        for i in range(self.depth):
            layer = (LSTM(self.hidden_size, return_sequences=True))(layer)

        # layer = LSTM(self.hidden_size, return_sequences=True)(layer)
        # layer = LSTM(1000, return_sequences=True)(layer)
        # layer = LSTM(1000, return_sequences=True)(layer)
        # layer = LSTM(1000, return_sequences=True)(layer)
        # layer = LSTM(1000, return_sequences=True)(layer)

        layer = LSTM(self.input_size, return_sequences=True)(layer)
        layer = TimeDistributed(Activation("softmax"))(layer)

        self.model = Model(inputs=[input_layer], outputs=[layer], name="LSTMAE")
        self.nn = self.model

    def fit(self, *args, **kwargs):
        self.nn.fit(*args, **kwargs)

    def compile(self, *args, **kwargs):
        self.nn.compile(*args, **kwargs)

    def fit_generator(self, *args, **kwargs):
        self.nn.fit_generator(*args, **kwargs)




if __name__ == "__main__":

    model = LAE()
    model.model.summary()


