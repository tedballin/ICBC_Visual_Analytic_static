var dim = "type";
//**********************************************************************************
//********  LEAFLET HEXBIN LAYER CLASS *********************************************
//**********************************************************************************
L.HexbinLayer = L.Class.extend({
  includes: L.Mixin.Events,
  initialize: function (rawData, options) {
    this.levels = {};
    this.layout = d3.hexbin().radius(10);
    this.rscale = d3.scaleSqrt().range([0, 10]).clamp(true);
    this.rwData = rawData;
    this.config = options;
  },
  project: function (x) {
    var point = this.map.latLngToLayerPoint([x[1], x[0]]);
    return [point.x, point.y];
  },
  getBounds: function (d) {
    var b = d3.geoBounds(d)
    return L.bounds(this.project([b[0][0], b[1][1]]), this.project([b[1][0], b[0][1]]));
  },
  update: function () {
    var pad = 100,
      xy = this.getBounds(this.rwData),
      zoom = this.map.getZoom();

    this.container
      .attr("width", xy.getSize().x + (2 * pad))
      .attr("height", xy.getSize().y + (2 * pad))
      .style("margin-left", (xy.min.x - pad) + "px")
      .style("margin-top", (xy.min.y - pad) + "px");

    if (!(zoom in this.levels)) {
      this.levels[zoom] = this.container.append("g").attr("class", "zoom-" + zoom);
      this.genHexagons(this.levels[zoom]);
      this.levels[zoom].attr("transform", "translate(" + -(xy.min.x - pad) + "," + -(xy.min.y - pad) + ")");
    }
    if (this.curLevel) {
      this.curLevel.style("display", "none");
    }
    this.curLevel = this.levels[zoom];
    this.curLevel.style("display", "inline");
  },
  genHexagons: function (container) {
    var data = this.rwData.features.map(function (d) {
      var coords = this.project(d.geometry.coordinates)
      return [coords[0], coords[1], d.properties];
    }, this);

    var bins = this.layout(data);
    var hexagons = container.selectAll(".hexagon").data(bins);

    var counts = [];
    bins.map(function (elem) {
      counts.push(elem.length)
    });
    this.rscale.domain([0, (ss.mean(counts) + (ss.standard_deviation(counts) * 3))]);

    var path = hexagons.enter().append("path").attr("class", "hexagon");

    this.config.style.call(this, path);

    that = this;
    hexagons.merge(path)
      .attr("d", function (d) {
        return that.layout.hexagon(that.rscale(d.length));
      })
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .on("mouseover", function (d) {
        var s = 0,
          k = 0;
        d.map(function (e) {
          if (e.length === 3) e[2][dim] === 1 ? ++k : ++s;
          console.log(s);
        });
        that.config.mouse.call(this, [s, k]);
        d3.select("#tooltip")
          .style("visibility", "visible")
          .style("top", function () {
            return (d3.event.pageY - 130) + "px"
          })
          .style("left", function () {
            return (d3.event.pageX - 130) + "px";
          })
      })
      .on("mouseout", function (d) {
        d3.select("#tooltip").style("visibility", "hidden")
      });
  },
  addTo: function (map) {
    map.addLayer(this);
    return this;
  },
  onAdd: function (map) {
    this.map = map;
    var overlayPane = this.map.getPanes().overlayPane;

    if (!this.container || overlayPane.empty) {
      this.container = d3.select(overlayPane)
        .append('svg')
        .attr("id", "hex-svg")
        .attr('class', 'leaflet-layer leaflet-zoom-hide');
    }
    map.on({
      'moveend': this.update
    }, this);
    this.update();
  }
});

L.hexbinLayer = function (data, styleFunction) {
  return new L.HexbinLayer(data, styleFunction);
};



var leafletMap = L.mapbox.map('mapContainer', 'delimited.ge9h4ffl')
  .setView([49.246292, -123.116226], 10);

//**********************************************************************************
//********  IMPORT DATA AND REFORMAT ***********************************************
//**********************************************************************************
d3.csv('data/2015_car crashes.csv', function (error, crash) {

  function reformat(array) {
    var data = [];
    array.map(function (d) {
      data.push({
        properties: {
          city: d["City"],
          crash_count: d["Crash Count"],
          type: +d["Crash Type"],
          location: d["Location"],
          year: d["Year"]
        },
        type: "Feature",
        geometry: {
          coordinates: [+d["Longitude"], d["Latitude"]],
          type: "Point"
        }
      });
    });
    return data;
  }
  var geoData = {
    type: "FeatureCollection",
    features: reformat(crash)
  };
  //**********************************************************************************
  //********  CREATE LEAFLET MAP *****************************************************
  //**********************************************************************************
  var cscale = d3.scaleLinear().domain([0, 1]).range(["#FFA500","#ff0000"]);
  // PDO:0, Casualty:1

  //**********************************************************************************
  //********  ADD HEXBIN LAYER TO MAP AND DEFINE HEXBIN STYLE FUNCTION ***************
  //**********************************************************************************
  var hexLayer = L.hexbinLayer(geoData, {
    style: hexbinStyle,
    mouse: makePie
  }).addTo(leafletMap);

  function hexbinStyle(hexagons) {
    hexagons
      .attr("stroke", "black")
      .attr("fill", function (d) {
        var values = d.map(function (elem) {
          return elem[2][dim];
        })
        var avg = d3.mean(d, function (d) {
          return +d[2][dim];
        })
        return cscale(avg);
      });
  }

  //**********************************************************************************
  //********  PIE CHART ROLL-OVER ****************************************************
  //**********************************************************************************
  function makePie(data) {

    //   d3.select("#tooltip").selectAll(".arc").remove()
    d3.select("#tooltip").selectAll(".pie").remove()

    var arc = d3.arc()
      .outerRadius(45)
      .innerRadius(10);

    var pie = d3.pie()
      .value(function (d) {
        return d;
      });

    var svg = d3.select("#tooltip").select("svg")
      .append("g")
      .attr("class", "pie")
      .attr("transform", "translate(50,50)");

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d, i) {
        return i === 1 ? '#ff0000' : 'orange';
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .style("text-anchor", "middle")
      .text(function (d) {
        return d.value === 0 ? "" : d.value;
      });
  }
});

window["update"]=function () {
  $("#hex-svg").remove();
  
  d3.csv('data/2015_car crashes.csv', function (error, crash) {

    function reformat(array) {
      var data = [];
      array.map(function (d) {
        //get value from bar js
        switch(window.cityname) {
          case "Vancouver":
          if (d["City"] == "VANCOUVER") {
            data.push({
              properties: {
                city: d["City"],
                crash_count: d["Crash Count"],
                type: +d["Crash Type"],
                location: d["Location"],
                year: d["Year"]
              },
              type: "Feature",
              geometry: {
                coordinates: [+d["Longitude"], d["Latitude"]],
                type: "Point"
              }
            });
          }
              break;

              case "North Van":
              if (d["City"] == "NORTH VANCOUVER") {
                data.push({
                  properties: {
                    city: d["City"],
                    crash_count: d["Crash Count"],
                    type: +d["Crash Type"],
                    location: d["Location"],
                    year: d["Year"]
                  },
                  type: "Feature",
                  geometry: {
                    coordinates: [+d["Longitude"], d["Latitude"]],
                    type: "Point"
                  }
                });
              }
                  break;

                  case "West Van":
              if (d["City"] == "WEST VANCOUVER") {
                data.push({
                  properties: {
                    city: d["City"],
                    crash_count: d["Crash Count"],
                    type: +d["Crash Type"],
                    location: d["Location"],
                    year: d["Year"]
                  },
                  type: "Feature",
                  geometry: {
                    coordinates: [+d["Longitude"], d["Latitude"]],
                    type: "Point"
                  }
                });
              }
                  break;

                  case "Burnaby":
              if (d["City"] == "BURNABY") {
                data.push({
                  properties: {
                    city: d["City"],
                    crash_count: d["Crash Count"],
                    type: +d["Crash Type"],
                    location: d["Location"],
                    year: d["Year"]
                  },
                  type: "Feature",
                  geometry: {
                    coordinates: [+d["Longitude"], d["Latitude"]],
                    type: "Point"
                  }
                });
              }
                  break;

                  case "Richmond":
                  if (d["City"] == "RICHMOND") {
                    data.push({
                      properties: {
                        city: d["City"],
                        crash_count: d["Crash Count"],
                        type: +d["Crash Type"],
                        location: d["Location"],
                        year: d["Year"]
                      },
                      type: "Feature",
                      geometry: {
                        coordinates: [+d["Longitude"], d["Latitude"]],
                        type: "Point"
                      }
                    });
                  }
                      break;

                      case "Coquitlam":
              if (d["City"] == "COQUITLAM") {
                data.push({
                  properties: {
                    city: d["City"],
                    crash_count: d["Crash Count"],
                    type: +d["Crash Type"],
                    location: d["Location"],
                    year: d["Year"]
                  },
                  type: "Feature",
                  geometry: {
                    coordinates: [+d["Longitude"], d["Latitude"]],
                    type: "Point"
                  }
                });
              }
                  break;

                  case "Surrey":
                  if (d["City"] == "SURREY") {
                    data.push({
                      properties: {
                        city: d["City"],
                        crash_count: d["Crash Count"],
                        type: +d["Crash Type"],
                        location: d["Location"],
                        year: d["Year"]
                      },
                      type: "Feature",
                      geometry: {
                        coordinates: [+d["Longitude"], d["Latitude"]],
                        type: "Point"
                      }
                    });
                  }
                      break;

                      case "New West":
              if (d["City"] == "NEW WESTMINSTER") {
                data.push({
                  properties: {
                    city: d["City"],
                    crash_count: d["Crash Count"],
                    type: +d["Crash Type"],
                    location: d["Location"],
                    year: d["Year"]
                  },
                  type: "Feature",
                  geometry: {
                    coordinates: [+d["Longitude"], d["Latitude"]],
                    type: "Point"
                  }
                });
              }
                  break;
          default:
          data.push({
            properties: {
              city: d["City"],
              crash_count: d["Crash Count"],
              type: +d["Crash Type"],
              location: d["Location"],
              year: d["Year"]
            },
            type: "Feature",
            geometry: {
              coordinates: [+d["Longitude"], d["Latitude"]],
              type: "Point"
            }
          });
      } 

      // if(window.cityname=="Vancouver"){
      //   if (d["City"] == "VANCOUVER") {
      //     data.push({
      //       properties: {
      //         city: d["City"],
      //         crash_count: d["Crash Count"],
      //         type: +d["Crash Type"],
      //         location: d["Location"],
      //         year: d["Year"]
      //       },
      //       type: "Feature",
      //       geometry: {
      //         coordinates: [+d["Longitude"], d["Latitude"]],
      //         type: "Point"
      //       }
      //     });
      //   }
      //   }
      });
      return data;
    }
    var geoData = {
      type: "FeatureCollection",
      features: reformat(crash)
    };
    //**********************************************************************************
    //********  CREATE LEAFLET MAP *****************************************************
    //**********************************************************************************
    var cscale = d3.scaleLinear().domain([0, 1]).range(["#FFA500","#ff0000"]);
    // PDO:0, Casualty:1

    //**********************************************************************************
    //********  ADD HEXBIN LAYER TO MAP AND DEFINE HEXBIN STYLE FUNCTION ***************
    //**********************************************************************************
    var hexLayer = L.hexbinLayer(geoData, {
      style: hexbinStyle,
      mouse: makePie
    }).addTo(leafletMap);

    function hexbinStyle(hexagons) {
      hexagons
        .attr("stroke", "black")
        .attr("fill", function (d) {
          var values = d.map(function (elem) {
            return elem[2][dim];
          })
          var avg = d3.mean(d, function (d) {
            return +d[2][dim];
          })
          return cscale(avg);
        });
    }

    //**********************************************************************************
    //********  PIE CHART ROLL-OVER ****************************************************
    //**********************************************************************************
    function makePie(data) {

      //   d3.select("#tooltip").selectAll(".arc").remove()
      d3.select("#tooltip").selectAll(".pie").remove()

      var arc = d3.arc()
        .outerRadius(45)
        .innerRadius(10);

      var pie = d3.pie()
        .value(function (d) {
          return d;
        });

      var svg = d3.select("#tooltip").select("svg")
        .append("g")
        .attr("class", "pie")
        .attr("transform", "translate(50,50)");

      var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

      g.append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
          return i === 1 ? '#ff0000' : 'orange';
        });

      g.append("text")
        .attr("transform", function (d) {
          return "translate(" + arc.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .text(function (d) {
          return d.value === 0 ? "" : d.value;
        });
    }
  });
}


///////////////////////////crash choropleth
//create the map and display vancouver city block data on a map with a custom Mapbox style
var map = L.map('map').setView([49.20, -123.00], 10);

L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.light'
    }).addTo(map);

var geojson = L.geoJson(vanData).addTo(map);


//get color depending on the crash number density value
function getColor(d) {
    return d > 25000 ? '#225ea8' :
        d > 20000 ? '#1d91c0' :
        d > 15000 ? '#41b6c4' :
        d > 12000 ? '#7fcdbb' :
        d > 8000 ? '#c7e9b4' :
        d > 5000 ? '#edf8b1' :
        d > 3000 ? '#ffffd9' :
        '#FFEDA0';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.crash)
    };
}

var geojson = L.geoJson(vanData, {
    style: style,
}).addTo(map);


//adding interaction, mouseover for details
function highlightFeature(e) {
    //define event listener
    var layer = e.target;

    //highlight hoverd city
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}
//mouseout
function resetHighlight(e) {
    //reset the layer style to its default state
    geojson.resetStyle(e.target);
}

//click listener that zooms to the city
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//highlight bar city

//onEachFeature option to add the listeners on city layers
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(vanData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

//hover to show popups 
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Number of Car Crash</h4>' + (props ?
        '<b>' + props.name + '</b><br />' + props.crash + ' accidents' :
        'Hover over a city');
};

info.addTo(map);

//dupate control when hover
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//create legend
var legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [3000, 5000, 8000, 12000, 20000, 25000],

        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);



