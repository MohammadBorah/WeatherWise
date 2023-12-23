
import pickle
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler

# Hypothetical weather data
weather_data = [
    {"temperature": -5, "humidity": 90, "wind_speed": 20, "clothing_type": "heavy"},
    {"temperature": -8, "humidity": 85, "wind_speed": 18, "clothing_type": "heavy"},
    {"temperature": -10, "humidity": 88, "wind_speed": 22, "clothing_type": "heavy"},
    {"temperature": 4, "humidity": 92, "wind_speed": 25, "clothing_type": "heavy"},
    {"temperature": 10, "humidity": 95, "wind_speed": 15, "clothing_type": "heavy"},
    {"temperature": 2, "humidity": 90, "wind_speed": 18, "clothing_type": "heavy"},
    {"temperature": 8, "humidity": 88, "wind_speed": 20, "clothing_type": "heavy"},
    {"temperature": 5, "humidity": 92, "wind_speed": 21, "clothing_type": "heavy"},
    {"temperature": -1, "humidity": 85, "wind_speed": 17, "clothing_type": "heavy"},
    {"temperature": -2, "humidity": 89, "wind_speed": 23, "clothing_type": "heavy"},

   
    {"temperature": 30, "humidity": 20, "wind_speed": 10, "clothing_type": "low"},
    {"temperature": 32, "humidity": 18, "wind_speed": 12, "clothing_type": "low"},
    {"temperature": 35, "humidity": 22, "wind_speed": 15, "clothing_type": "low"},
    {"temperature": 28, "humidity": 25, "wind_speed": 10, "clothing_type": "low"},
    {"temperature": 31, "humidity": 20, "wind_speed": 14, "clothing_type": "low"},
    {"temperature": 33, "humidity": 24, "wind_speed": 13, "clothing_type": "low"},
    {"temperature": 36, "humidity": 28, "wind_speed": 12, "clothing_type": "low"},
    {"temperature": 29, "humidity": 23, "wind_speed": 11, "clothing_type": "low"},
    {"temperature": 34, "humidity": 26, "wind_speed": 13, "clothing_type": "low"},
    {"temperature": 30, "humidity": 21, "wind_speed": 15, "clothing_type": "low"},

 
    {"temperature": 15, "humidity": 60, "wind_speed": 12, "clothing_type": "moderate"},
    {"temperature": 18, "humidity": 65, "wind_speed": 14, "clothing_type": "moderate"},
    {"temperature": 20, "humidity": 62, "wind_speed": 10, "clothing_type": "moderate"},
    {"temperature": 22, "humidity": 68, "wind_speed": 11, "clothing_type": "moderate"},
    {"temperature": 17, "humidity": 63, "wind_speed": 13, "clothing_type": "moderate"},
    {"temperature": 19, "humidity": 66, "wind_speed": 12, "clothing_type": "moderate"},
    {"temperature": 21, "humidity": 70, "wind_speed": 15, "clothing_type": "moderate"},
    {"temperature": 16, "humidity": 64, "wind_speed": 14, "clothing_type": "moderate"},
    {"temperature": 23, "humidity": 67, "wind_speed": 16, "clothing_type": "moderate"},
    {"temperature": 18, "humidity": 61, "wind_speed": 13, "clothing_type": "moderate"}
]


# Extract features and labels
features = np.array([[data['temperature'], data['humidity'], data['wind_speed']] for data in weather_data])
labels = np.array([data['clothing_type'] for data in weather_data])

# Normalize features
scaler = StandardScaler()
features_normalized = scaler.fit_transform(features)

# Split data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(features_normalized, labels, test_size=0.2, random_state=42)

# Create and train the Decision Tree classifier
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# Make predictions on the test set
predictions = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, predictions)
print(f'Model Accuracy: {accuracy * 100:.2f}%')

# Save the model and scaler using pickle
with open('model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('scaler.pkl', 'wb') as scaler_file:
    pickle.dump(scaler, scaler_file)

# Load the model and scaler using pickle
with open('model.pkl', 'rb') as model_file:
    loaded_model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    loaded_scaler = pickle.load(scaler_file)

# Example new data
new_weather_data = np.array([[25, 70, 8]])
# Normalize the new data using the loaded scaler
new_weather_data_normalized = loaded_scaler.transform(new_weather_data)
predicted_clothing_type = loaded_model.predict(new_weather_data_normalized)

print(f'Recommended clothing type: {predicted_clothing_type[0]}')
