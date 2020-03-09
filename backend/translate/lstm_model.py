import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0'; os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'; print("Silencing tensorflow logs")
import tensorflow as tf

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, LSTM, RepeatVector

class LAE:

    def __init__(self, input_size=36, max_len=100):
        
        self.model = None
        self.input_size = input_size
        self.max_len = max_len
        self._init_model()
    
    def _init_model(self):

        input_layer = Input((None, self.input_size), name="InputLayer")

        layer = LSTM(1000, return_sequences=True)(input_layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=False)(layer)

        layer = RepeatVector(self.max_len)(layer)

        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(1000, return_sequences=True)(layer)
        layer = LSTM(self.input_size, return_sequences=True)(layer)

        self.model = Model(inputs=[input_layer], outputs=[layer], name="LSTMAE")
        self.nn = self.model




if __name__ == "__main__":

    model = LAE()
    model.model.summary()


