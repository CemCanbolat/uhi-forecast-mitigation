import numpy as np

def clean_input(array):
    """
    Replaces NaNs with 0.0 and handles infinities.
    Modify to use mean fallback if needed.
    """
    return np.nan_to_num(array, nan=0.0, posinf=1e3, neginf=-1e3)
