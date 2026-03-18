import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

interface LeafletMapProps {
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  initialRegion = {
    latitude: 9.9463, // Default to Kochi, India as per previous context
    longitude: 76.3215,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }
}) => {
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100vw; }
          .leaflet-control-attribution { display: none !important; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map', {
            zoomControl: false,
            attributionControl: false
          }).setView([${initialRegion.latitude}, ${initialRegion.longitude}], 15);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          // Add a marker at the center
          L.marker([${initialRegion.latitude}, ${initialRegion.longitude}]).addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View className="h-[200px] w-full rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100">
      <WebView
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        className="flex-1"
        startInLoadingState={true}
        renderLoading={() => (
          <View className="absolute inset-0 justify-center items-center bg-slate-50">
            <ActivityIndicator size="large" color="#0ea5e9" />
          </View>
        )}
      />
    </View>
  );
};
