from flask import Flask, request, render_template, jsonify, send_from_directory
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the model
model = pickle.load(open('model.pkl', 'rb'))
# Load the scaler
with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

@app.route('/favicon.ico')
def favicon():
    return ''

# Serve static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received data:", data)

    temperature, humidity, windSpeed = data['temperature'], data['humidity'], data['windSpeed']
    print("Input features:", temperature, humidity, windSpeed)

    # Normalize input features
    input_data = np.array([[temperature, humidity, windSpeed]])
    input_data_normalized = scaler.transform(input_data)

    # Make predictions using the loaded model
    predicted_clothing_type = model.predict(input_data_normalized)[0]
    print("Predicted Clothing Type:", predicted_clothing_type)

    return jsonify({'clothingType': predicted_clothing_type})

if __name__ == '__main__':
    app.run(debug=True)
