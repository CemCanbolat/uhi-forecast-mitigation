import tensorflow as tf 
from pathlib import Path
import numpy as np
from .custom_losses import focal_loss, dice_coefficient
from .preprocessing import clean_input

def predict_tile(model, tensor_data):
    """
    Predict UHI using the loaded model and preprocessed tensor data.

    Args:
        model (tf.keras.Model): Loaded Keras model.
        tensor_data (np.ndarray): Array of shape (4, 10, 64, 64)

    Returns:
        np.ndarray: Prediction array of shape (64, 64)
    """
    # Unpack the 4 data arrays
    LST_raw, NDVI_raw, NDBI_raw, VIIRS_raw = tensor_data

    # Clean NaNs and Infs
    LST = clean_input(LST_raw)
    NDVI = clean_input(NDVI_raw)
    NDBI = clean_input(NDBI_raw)
    VIIRS = clean_input(VIIRS_raw)

    # Expand dims to match model input: (1, 10, 64, 64, 1)
    input_dict = {
        'LST': np.expand_dims(LST, axis=-1)[np.newaxis, ...],
        'NDVI': np.expand_dims(NDVI, axis=-1)[np.newaxis, ...],
        'NDBI': np.expand_dims(NDBI, axis=-1)[np.newaxis, ...],
        'VIIRS': np.expand_dims(VIIRS, axis=-1)[np.newaxis, ...],
    }

    # Run prediction
    prediction = model.predict(input_dict, verbose=0)[0]  # (64, 64, 1)

    return prediction.squeeze()  # Return shape (64, 64)



def get_model():
    base_dir = Path(__file__).parents[2]  # two levels up from core/model
    model_path = base_dir / 'models' / 'uhi_predictor_003.keras'
    model_path = str(model_path)

    model = tf.keras.models.load_model(
        model_path,
        custom_objects={
            'loss': focal_loss(gamma=2.0, alpha=0.8),
            'dice_coefficient': dice_coefficient
            }
        )
    return model