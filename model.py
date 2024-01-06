import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
from sklearn.preprocessing import StandardScaler

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

# Create and train the Random Forest classifier
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Make predictions on the test set
rf_predictions = rf_model.predict(X_test)

# Evaluate the Random Forest model accuracy
rf_accuracy = accuracy_score(y_test, rf_predictions)
print(f'Random Forest Model Accuracy: {rf_accuracy * 100:.2f}%')

# Save the Random Forest model and scaler using pickle
with open('rf_model.pkl', 'wb') as model_file:
    pickle.dump(rf_model, model_file)

with open('rf_scaler.pkl', 'wb') as scaler_file:
    pickle.dump(scaler, scaler_file)

# Load the Random Forest model and scaler using pickle
with open('rf_model.pkl', 'rb') as model_file:
    loaded_rf_model = pickle.load(model_file)

with open('rf_scaler.pkl', 'rb') as scaler_file:
    loaded_rf_scaler = pickle.load(scaler_file)

# Example new data
new_weather_data = np.array([[0, 70, 8]])
# Normalize the new data using the loaded scaler
new_weather_data_normalized = loaded_rf_scaler.transform(new_weather_data)
predicted_clothing_type = loaded_rf_model.predict(new_weather_data_normalized)

print(f'Recommended clothing type (Random Forest): {predicted_clothing_type[0]}')

# Calculate F1 score on the test set for the Random Forest model
rf_f1 = f1_score(y_test, rf_predictions, average='weighted')
print("Random Forest F1 Score:", rf_f1)
