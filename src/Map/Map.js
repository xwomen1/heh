import React, { useEffect, useRef, useState } from 'react';
import H from '@here/maps-api-for-javascript';
import { Modal } from '@mui/material';
import BasicModal from './popup';

const Map = (props) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null);
    const { apikey, userPosition, restaurantPosition } = props;
    const [open, setopen] = useState(false);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
  


    useEffect(() => {
        // Check if the map object has already been created
        if (!map.current) {
            // Create a platform object with the API key
            platform.current = new H.service.Platform({ apikey });
            // Create a new Raster Tile service instance
            const rasterTileService = platform.current.getRasterTileService({
                queryParams: {
                    style: "explore.day",
                    size: 512,
                },
            });
            // Creates a new instance of the H.service.rasterTile.Provider class
            // The class provides raster tiles for a given tile layer ID and pixel format
            const rasterTileProvider = new H.service.rasterTile.Provider(rasterTileService);
            // Create a new Tile layer with the Raster Tile provider
            const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
            // Create a new map instance with the Tile layer, center and zoom level
            const newMap = new H.Map(
                mapRef.current,
                rasterTileLayer, {
                    pixelRatio: window.devicePixelRatio,
                    center: userPosition,
                    zoom: 14,
                },
            );

            // Add panning and zooming behavior to the map
            const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));

            // Set the map object to the reference
            map.current = newMap;
            map.mapevents = behavior;

            // Function to handle click on map
            const handleMapClick = (event) => {
                // Additional information to display
                const additionalInfo = "Additional information goes here.";
                // const additionalInfo = "Additional information goes here.";
                const { lat, lng } = map.current.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
                // alert(`Clicked at: \nLatitude ${lat}, Longitude ${lng}\n${additionalInfo}` );
                setopen(true);
                setLat(lat);
                setLong(lng);
            };
            

            // Add tap event listener to the map
            map.current.addEventListener('tap', handleMapClick);

        }
    }, [apikey, userPosition, restaurantPosition]);

    

    // Return a div element to hold the map
    return  <div>
    <div style={{ width: "100%", height :"700px" }} ref={mapRef} />  
{open && (
    <Modal
    open={open}
    onClose={() => { setopen(false)}}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <BasicModal lng={long} lat={lat}/>
  </Modal>
)}
    </div>
    
}

export default Map;
