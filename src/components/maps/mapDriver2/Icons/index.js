import L from 'leaflet';

let tinyIcon = L.Icon.extend({
    options: {
        iconSize: [25, 40],
        iconAnchor: [12, 36],
        shadowSize: [41, 41],
        shadowAnchor: [12, 38],
        popupAnchor: [0, -30]
    }
});

let carIcon = new tinyIcon({
    iconUrl: require('./assets/car.png')
});

let clientIcon = new tinyIcon({
    iconUrl: require('./assets/client.png')
});

let clientIcon2 = new tinyIcon({
  iconUrl: require('./assets/client2.png')
});

export {
    carIcon,
    clientIcon,
    clientIcon2
}
