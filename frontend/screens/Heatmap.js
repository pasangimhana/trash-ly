import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview"; // Import WebView for displaying web content

import styles from '../components/Styles.js';
import NavigationBar from '../components/NavigationBar.js';

const Heatmap = ({ navigation }) => {
  const webViewRef = useRef(null);

  useEffect(() => {
    // Run JavaScript code to initialize the Google Maps Heatmap
    const initHeatmap = `
      // Data points defined as an array of LatLng objects
      var heatmapData = [
        new google.maps.LatLng(7.8731, 80.7718), // Example heatmap data point for Sri Lanka
        // Add more data points as needed
      ];

      var sriLankaCenter = { lat: 7.8731, lng: 80.7718 };

      var map = new google.maps.Map(document.getElementById('map'), {
        center: sriLankaCenter,
        zoom: 7, // Adjust the zoom level as needed
        mapTypeId: 'satellite'
      });

      var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
      });
      heatmap.setMap(map);
    `;

    // Inject JavaScript code to initialize the heatmap into the WebView
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(initHeatmap);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.screenTitleContainer}>
        <Text style={styles.appTitle}>TRASH.LY</Text>
      </View>

      {/* Display the WebView to render the Google Maps Heatmap */}
      <WebView
        ref={webViewRef}
        source={{ html: "<div id='map' style='height: 100%;'></div>" }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
      />

      <NavigationBar navigation={navigation} />
    </View>
  );
}

export default Heatmap;

