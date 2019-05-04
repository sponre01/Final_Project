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


  var baseMaps = {
    Grayscale: graymap,
    Outdoors: outdoors
  };
  
  var overlays = {
    "Heatmap": heatmap
  };
  
  L
    .control
    .layers(baseMaps, overlays)
    .addTo(map);




  var link = "data/boundaries.json";

// Grab GEOJSON
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
  layer.bindPopup("<h1>" + feature.properties.namelsad10 + "</h1>");

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

});