// Create function to color census tracts based on ____tract number_______
function getColor(d) {
  return d > 9000 ? '#800026' :
         d > 8000  ? '#BD0026' :
         d > 6000  ? '#E31A1C' :
         d > 4000  ? '#FC4E2A' :
         d > 2000   ? '#FD8D3C' :
         d > 1000   ? '#FEB24C' :
         d > 500   ? '#FED976' :
                    '#FFEDA0';
}


  // Adding tile layers
  var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
  });
  
  var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
  });
  
  // Creating map object
  var map = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 11,
  layers: [graymap, outdoors]
  });

  graymap.addTo(map);

  var heatmap = new L.LayerGroup();
  var departure_stations = new L.LayerGroup();
  var destination_stations = new L.LayerGroup();


  var baseMaps = {
    Grayscale: graymap,
    Outdoors: outdoors
  };
  
  var overlays = {
    "Top 20 Departure Stations": departure_stations,
    "Top 20 Destination Stations": destination_stations
  };
  
  L
    .control
    .layers(baseMaps, overlays)
    .addTo(map);




  var link = "data/boundaries.json";

// Make GEOJSON heatmap
d3.json(link, function(error, data) {
  if (error) return console.warn(error);
  
L.geoJson(data, {
style: function(feature) {
  return {
    color: "white",
    fillColor: getColor(feature.properties.name10),
    fillOpacity: 0.5,
    weight: 1.5
  };
},

// Mouseover/mouseout events
onEachFeature: function(feature, layer) {
  layer.on({
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.8
      });
    },
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.5
      });
    },
  });
  // Popup info
  layer.bindPopup("<h3>" + feature.properties.namelsad10 + "</h3>");

}
}).addTo(map)

// make heatmap legend
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 500, 1000, 2000, 4000, 6000, 8000, 9000],
      labels = [];
      div.innerHTML+='<div><b><h3>Legend: Census Tract Group</h3></b></div>';
  // loop through our magnitude intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style=\"background:' 
          + getColor(grades[i] + 1) 
          + '\"></i> ' 
          + '<b>' 
          + grades[i] 
          + (grades[i + 1] ? '&ndash;' + grades[i + 1]  + '</b>' + '<br>' : '+');
  }

  return div;
};

legend.addTo(map);


// make Departure Station markers
var departure_list = [
  {name: "Streeter Dr & Grand Ave", location: [41.892278,	-87.612043]},
  {name: "Canal St & Adams St", location: [41.879255,	-87.639904]},
  {name: "Clinton St & Washington Blvd", location: [41.88338,	-87.64117]},
  {name: "Clinton St & Madison St", location: [41.882242,	-87.641066]},
  {name: "Lake Shore Dr & Monroe St", location: [41.880958,	-87.616743]},
  {name: "Michigan Ave & Washington St", location: [41.88389277,	-87.62464914]},
  {name: "Millennium Park", location: [41.8810317,	-87.62408432]},
  {name: "Theater on the Lake", location: [41.926277,	-87.630834]},
  {name: "Columbus Dr & Randolph St", location: [41.884728,	-87.619521]},
  {name: "Lake Shore Dr & North Blvd", location: [41.911722,	-87.626804]},
  {name: "Daley Center Plaza", location: [41.884241,	-87.629634]},
  {name: "Kingsbury St & Kinzie St", location: [41.88917683,	-87.63850577]},
  {name: "Franklin St & Monroe St", location: [41.880317,	-87.635185]},
  {name: "Michigan Ave & Oak St", location: [41.90096039,	-87.62377664]},
  {name: "Canal St & Madison St", location: [41.882091,	-87.639833]},
  {name: "Orleans St & Merchandise Mart Plaza", location: [41.888243,	-87.63639]},
  {name: "LaSalle St & Jackson Blvd", location: [41.87817,	-87.631985]},
  {name: "Shedd Aquarium", location: [41.86722596,	-87.61535539]},
  {name: "Dearborn St & Erie St", location: [41.893992,	-87.629318]},
  {name: "Indiana Ave & Roosevelt Rd", location: [41.867888,	-87.623041]}
];

// Loop through the cities array 
for (var i = 0; i < departure_list.length; i++) {
  var station = departure_list[i];
  L.circle(station.location,{color: '#53DEEB', fillColor: '#53DEEB', fillOpacity: 0.75, radius: 400})
    .bindPopup("<h3>" + station.name + "</h3>")
    .addTo(departure_stations);
}

// make Destination Station markers
var destination_list = [
  {name: "LaSalle St & Jackson Blvd", location: [41.87817,	-87.631985]},
  {name: "Clinton St & Lake St", location: [41.885637,	-87.641823]},
  {name: "Clark St & Elm St", location: [41.902973,	-87.63128]},
  {name: "Fairbanks Ct & Grand Ave", location: [41.89186,	-87.62062]},
  {name: "Canal St & Adams St", location: [41.879255,	-87.639904]},
  {name: "Clinton St & Washington Blvd", location: [41.88338,	-87.64117]},
  {name: "Clinton St & Madison St", location: [41.882242,	-87.641066]},
  {name: "Lake Shore Dr & Monroe St", location: [41.880958,	-87.616743]},
  {name: "Millennium Park", location: [41.8810317,	-87.62408432]},
  {name: "Theater on the Lake", location: [41.926277,	-87.630834]},
  {name: "Michigan Ave & Washington St", location: [41.88389277,	-87.62464914]},
  {name: "Lake Shore Dr & Monroe St", location: [41.880958	-87.616743]},
  {name: "Daley Center Plaza", location: [41.884241,	-87.629634]},
  {name: "Michigan Ave & Oak St", location: [41.90096039,	-87.62377664]},
  {name: "Kingsbury St & Kinzie St", location: [41.88917683,	-87.63850577]},
  {name: "Franklin St & Monroe St", location: [41.880317,	-87.635185]},
  {name: "Canal St & Madison St", location: [41.882091,	-87.639833]},
  {name: "Franklin St & Monroe St", location: [41.880317,	-87.635185]},
  {name: "LaSalle St & Jackson Blvd", location: [41.87817,	-87.631985]},
  {name: "Dearborn St & Erie St", location: [41.893992,	-87.629318]},
];

// Loop through the cities array 
for (var i = 0; i < destination_list.length; i++) {
  var station = destination_list[i];
  L.circle(station.location,{color:"#EEDA17",fillColor: "#EEDA17",fillOpacity: 0.75,radius: 400})
    .bindPopup("<h3>" + station.name + "</h3>")
    .addTo(destination_stations);
}

});