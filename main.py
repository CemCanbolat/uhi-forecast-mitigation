from pipeline import run_city_prediction_pipeline
from core.model import get_model
from core.gee_client import authenticate_and_initialize_gee
# Load your trained model
model = get_model()

print(model)
# # Run the full pipeline
authenticate_and_initialize_gee()
output = run_city_prediction_pipeline("Istanbul, Turkey", "2024-02-01", "2024-08-18", model, export_only=False)

print("Pipeline finished.")
