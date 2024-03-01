import Map from './Map/Map';
// import React, { useState } from 'react';
// import RestaurantList from './RestaurantList/RestaurantList';

const apikey = 'ztM1WgNY33qugsdwo08ZIQSRsAlobRop4kAZka7e5Zo'


function App() {
  // Austurvöllur square in Reykjavik
 const userPosition = { lat: 21.019852790335754, lng: 105.81759163037341 };
// const restaurantList = [
//   {
//     name: "Chua lang",
//     location: { lat: 21.016387, lng: 105.817611 },
//   },
//   {
//     name: "thanh cong",
//     location: { lat: 21.020053799230134, lng: 105.81831797041525 },
//   },
//   {
//     name: "lang chu tich",
//     location: { lat: 21.038556503867852, lng: 105.83089912105224 },
//   },
//   {
//     name: "doi can",
//     location: { lat: 21.035711982112772, lng: 105.81891629988009 },
//   },
// ];
// const [restaurantPosition, setRestaurantPosition] = useState(null);

// const onClickHandler_ = (location) => {
//   setRestaurantPosition(location);
// };

  return (
    <div>
      {/* <RestaurantList list={restaurantList} onClickHandler={onClickHandler_} /> */}
      <Map
        apikey={apikey}
        userPosition={userPosition}
        // restaurantPosition={restaurantPosition}
      />
    </div>
  );
};

export default App;
