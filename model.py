import pickle
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import StandardScaler
import pandas as pd

# Read the CSV file into a DataFrame
df = pd.read_csv('C:/Users/HP/Desktop/WeatherWise/MOCK_DATA.csv')

# Drop rows with null values
df = df.dropna()

# Convert the DataFrame to a list of dictionaries
weather_data = df.to_dict(orient='records')

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
new_weather_data = np.array([[0, 70, 8]])
# Normalize the new data using the loaded scaler
new_weather_data_normalized = loaded_scaler.transform(new_weather_data)
predicted_clothing_type = loaded_model.predict(new_weather_data_normalized)

print(f'Recommended clothing type: {predicted_clothing_type[0]}')
