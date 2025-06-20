# 🚚  Delivery Tracker App

A real-time food delivery tracking system built using **React Native**, **Firebase Realtime Database**, and **Google Maps API**. This project simulates a food ordering process, live location tracking of the delivery person, and visual directions between the restaurant and the customer.

---

## 📱 Features

- Browse and select restaurants (Domino's, BrewBurg).
- Place orders with customer location pre-defined.
- Real-time order status updates via Firebase.
- Delivery agent view with:
  - List of pending orders
  - Live location tracking using GPS
  - Directions displayed on map
- Map integration using **react-native-maps** and **MapViewDirections**.

---

## 📸 Demo

### 1. Order Placement
- Select a restaurant and place an order.
- Map screen (MapScreen) attempts to load customer and restaurant location.

### 2. Delivery Tracking
- Delivery agent accepts pending orders.
- Live tracking starts and updates delivery location in Firebase.
- Map screen (DeliveryMapScreen) shows:
  - Green Marker ➤ Delivery Guy (Live Location)
  - Orange Route ➤ From delivery guy to restaurant
  - Blue Route ➤ From restaurant to customer

## 🛠️ Tech Stack

- **React Native (Expo/CLI)**
- **Firebase Realtime Database**
- **Google Maps API**
- **react-native-maps**
- **@react-native-community/geolocation**
- **@react-native-firebase/database**

---

## 🔧 Setup Instructions

1. **Clone this repository**
   ```bash
   git clone https://github.com/AakanshaAghav/react-native-project.git
   cd react-native-project
2. **Install dependencies**
   ```bash
   npm install
3. **Link native modules (if using bare workflow)**
   ```bash
   npx react-native link
4. **Run the app**
   ```bash
   npx react-native run-android
5. **Firebase Setup**
   - Add Firebase to your project.
   - Configure Realtime Database.
   - Place the Google google-services.json file in the android/app/ directory.
6. **Enable Maps API**
   - Enable Maps SDK for Android in your Google Cloud Console.
   - Enable Maps SDK for Android in your Google Cloud Console. 
   
## Limitations
- Map sometimes takes time to load due to network/API delays.
- Project not fully optimized or complete.
- No authentication or persistent session storage.
- Only static customer location is supported.


   
