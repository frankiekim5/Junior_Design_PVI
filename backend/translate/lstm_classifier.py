import os; os.environ['CUDA_VISIBLE_DEVICES'] = '0'; os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'; print("Silencing tensorflow logs")
import tensorflow as tf; tf.get_logger().setLevel('WARNING')
import numpy as np

from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, LSTM, Activation, Dense, Concatenate

class LAC:

    def __init__(self, input_size=39, depth=2, hidden_size=256, classes=1000):
        
        self.model = None
        self.input_size = input_size
        self.depth = depth
        self.hidden_size = hidden_size
        self.classes = classes
        self._init_model()
    
    def __str__(self):
        
        lines = []

        # self.encoder.summary(print_fn=lambda line: lines.append(line))
        # self.decoder.summary(print_fn=lambda line: lines.append(line))
        self.model.summary(print_fn=lambda line: lines.append(line))

        return "\n".join(lines)
    
    def _init_model(self):
        # ENCODER ---------------------------------------
        encoder_layer = encoder_inputs = Input(shape=(None, self.input_size))

        for i in range(self.depth - 1):
            encoder_layer = (LSTM(self.hidden_size, return_sequences=True))(encoder_layer)

        _, encoder_h, encoder_c = LSTM(self.hidden_size, return_sequences=False, return_state=True)(encoder_layer)
        
        self.encoder = Model(inputs=[encoder_inputs], outputs=[encoder_h, encoder_c], name="Encoder")
        
        layer = Concatenate()([encoder_h, encoder_c])

        layer = Dense(self.classes, activation="softmax")(layer)

        self.nn = self.model = Model(inputs=[encoder_inputs], outputs=[layer], name="LSTM_Classifier")


if __name__ == "__main__":
    model = LAC()

    print(model)