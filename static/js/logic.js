// Create function to color countries based on ___________
  
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
  center: [30, 0],
  zoom: 3,
  layers: [graymap, outdoors]
  });

  var link = "boundaries.geojson";

// Grab GEOJSON
d3.json(link, function(error, data) {
  if (error) return console.warn(error);
  
L.geoJson(data, {
style: function(feature) {
  return {
    color: "white",
    fillColor: "gray",
    fillOpacity: 0.8,
    weight: 1.5
  };
},

// Mouseover/mouseout events
onEachFeature: function(feature, layer) {
  layer.on({
    mouseover: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.1
      });
    },
    mouseout: function(event) {
      layer = event.target;
      layer.setStyle({
        fillOpacity: 0.8
      });
    },
  });
  // Popup info
  layer.bindPopup("<h1>" + feature.properties.ADMIN +"<br>"+ feature.properties.total + " total medals" + "</h1> <hr> <h2>" + 
  //feature.properties.ISO_A3 + "</h2>" + 
  "<p><h3> Gold medals: " + feature.properties.gold + "</h3></p>" +
  "<p><h3> Silver medals: " + feature.properties.silver +"</h3></p>" +
  "<p><h3> Bronze medals: " + feature.properties.bronze +"</h3></p>" +
  "<a href=\"/country/" +feature.properties.ISO_A3 +"\" class=\"button\">Go to Country page</a>");

}
}).addTo(map)

});