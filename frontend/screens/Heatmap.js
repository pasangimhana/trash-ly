import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Cluster } from 'react-native-maps';
import { Dimensions } from 'react-native';
import { useEffect, useState, useRef } from "react";

import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';

const Heatmap = ({ navigation, data, region }) => {

  const [markers, setMarkers] = useState([]);
  const clusterRef = useRef(null);

  const sriLankaHeatmapData = [
    { latitude: 7.873054, longitude: 80.771797, value: 75, type: 'high' }, // Colombo (higher intensity, high type)
    { latitude: 6.927079, longitude: 79.861244, value: 50, type: 'low' }, // Kandy (medium intensity, low type)
    { latitude: 9.931208, longitude: 80.070080, value: 25, type: 'high' }, // Jaffna (lower intensity, high type)
    // Add more data points for other locations in Sri Lanka
  ];

  useEffect(() => {
    setMarkers(sriLankaHeatmapData.map((point) => ({
      coordinate: {
        latitude: point.latitude,
        longitude: point.longitude,
      },
      opacity: Math.min(1, point.value / 100), // Adjust opacity based on value
      color: point.type === 'high' ? 'red' : 'blue', // Set marker color based on type
    })));
  }, []);

  const getClusterSize = () => {
    // Optional calculation based on screen dimensions (adjust as needed)
    const { width, height } = Dimensions.get('window');
    const clusterSize = Math.max(width / 100, height / 100); // Adjust divisor for desired cluster size
    return clusterSize;
  };

  const initialRegion = {
    latitude: 7.873054, // Center on Colombo, Sri Lanka (can be adjusted)
    longitude: 80.771797,
    latitudeDelta: 3.0, // Increased for wider view
    longitudeDelta: 3.0, // Increased for wider view
  };

  return (
    <View style={{flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>

      <MapView region={region} initialRegion={initialRegion}  style={ StyleSheet.absoluteFillObject } provider={MapView.PROVIDER_GOOGLE}>
      {clusterRef.current && // Render clusters only if ref is valid
        <Cluster ref={clusterRef} clusterSize={getClusterSize()}>
          {markers.map((marker) => (
            <Marker key={marker.coordinate.latitude + marker.coordinate.longitude} pinColor={marker.color} coordinate={marker.coordinate} opacity={marker.opacity}>
              {/* Optional marker content (e.g., icon) */}
            </Marker>
          ))}
        </Cluster>
      }
      {!clusterRef.current && markers.length > 0 && // Render individual markers if clustering is not used
        markers.map((marker) => (
          <Marker key={marker.coordinate.latitude + marker.coordinate.longitude} pinColor={marker.color} coordinate={marker.coordinate} opacity={marker.opacity}>
            {/* Optional marker content (e.g., icon) */}
          </Marker>
        ))}
    </MapView>

      <NavigationBar navigation={navigation} />
    </View>
  );
}

export default Heatmap;

