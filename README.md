# Uber Tracking App

A real-time location tracking application with driver and rider interfaces, similar to Uber.

## Project Structure

```
uber-tracker/
├─ server/           # Backend Node.js server
│  ├─ package.json
│  ├─ server.js     # Main server file with Socket.IO setup
│  └─ auth.js       # Authentication routes
├─ driver/          # React Native driver app
│  ├─ package.json
│  └─ App.js        # Driver interface with location tracking
├─ rider/           # React rider web app
│  ├─ package.json
│  └─ src/
│     └─ App.js     # Rider interface with map view
```

## Components

### Server
- Node.js/Express backend
- Socket.IO for real-time location updates
- JWT authentication
- MongoDB database integration

### Driver App (React Native)
- Real-time location tracking
- Map view with current location
- Location updates via Socket.IO
- Authentication system

### Rider App (React)
- Google Maps integration
- Real-time driver location updates
- Trip request system
- Authentication system

## Setup Instructions

1. Server Setup:
   ```bash
   cd server
   npm install
   # Create .env file with MONGODB_URI and JWT_SECRET
   npm start
   ```

2. Driver App Setup:
   ```bash
   cd driver
   npm install
   # For iOS
   cd ios && pod install && cd ..
   npm run ios
   # For Android
   npm run android
   ```

3. Rider App Setup:
   ```bash
   cd rider
   npm install
   # Add your Google Maps API key in src/App.js
   npm start
   ```

## Environment Variables

### Server
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT

### Rider App
- Add your Google Maps API key in `rider/src/App.js`

## Features
- Real-time location tracking
- Secure authentication
- Interactive maps
- Bi-directional communication between driver and rider
- Location history
- Trip management

## Technologies Used
- Node.js
- Express
- Socket.IO
- MongoDB
- React
- React Native
- Google Maps API
- JWT Authentication