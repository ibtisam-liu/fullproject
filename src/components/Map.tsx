import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Salim Slem, Beirut coordinates
    const lng = 35.5018;
    const lat = 33.8938;

    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN_HERE';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: 15,
    });

    // Add marker for restaurant location
    new mapboxgl.Marker({ color: '#E8773D' })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<h3 class="font-bold">Delicious Bites</h3><p>Salim Slem, Beirut</p>')
      )
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-card p-4 rounded-lg shadow-lg z-10">
        <p className="text-sm text-muted-foreground mb-1">Note: Add your Mapbox token</p>
        <p className="text-xs text-muted-foreground">Get it from mapbox.com</p>
      </div>
    </div>
  );
};

export default Map;
