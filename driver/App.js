import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const App = () => {
  const [location, setLocation] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Request location permissions and start tracking
    requestLocationPermission();

    // Socket.io connection handling
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      // Request permissions and start watching position
      Geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          
          if (isOnline) {
            // Emit location update to server
            socket.emit('updateLocation', {
              type: 'driver',
              location: newLocation,
            });
          }
        },
        (error) => {
          console.log(error);
          Alert.alert('Error', 'Location permission denied');
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10, // Update every 10 meters
          interval: 5000, // Update every 5 seconds
        }
      );
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={location}
            title="Your Location"
          />
        </MapView>
      ) : (
        <View style={styles.center}>
          <Text>Loading map...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;