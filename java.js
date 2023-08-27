// Include Leaflet JavaScript
var script = document.createElement('script');
script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
script.onload = function () {
    initializeMap();
};
document.head.appendChild(script);

function initializeMap() {
    var map = L.map('map').setView([-6.1754, 106.8272], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create layers for points, lines, and polygons
    var pointLayer = L.layerGroup();
    var lineLayer = L.layerGroup();
    var polygonLayer = L.layerGroup();

    // Add layers to the map
    var baseLayers = {
        "Points": pointLayer,
        "Lines": lineLayer,
        "Polygons": polygonLayer
    };

    L.control.layers(null, baseLayers).addTo(map);

    // Function to toggle layers based on checkbox state
    function toggleLayer(layer, checkboxId) {
        var checkbox = document.getElementById(checkboxId);
        if (checkbox.checked) {
            map.addLayer(layer);
        } else {
            map.removeLayer(layer);
        }
    }

    // Event listeners for checkboxes
    document.getElementById('pointLayerCheckbox').addEventListener('change', function () {
        toggleLayer(pointLayer, 'pointLayerCheckbox');
    });
    document.getElementById('lineLayerCheckbox').addEventListener('change', function () {
        toggleLayer(lineLayer, 'lineLayerCheckbox');
    });
    document.getElementById('polygonLayerCheckbox').addEventListener('change', function () {
        toggleLayer(polygonLayer, 'polygonLayerCheckbox');
    });

    // Fetch and display point data with custom color
    fetch('https://iserver.supermap.id/iserver/services/data-test_fe/rest/data/datasources/data/datasets/adm3_jakpus_point')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    // Customize the appearance of points with a custom color
                    return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: 'blue',
                        color: 'white',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                }
            }).addTo(pointLayer);
        });

    // Fetch and display line data with custom color
    fetch('https://iserver.supermap.id/iserver/services/data-test_fe/rest/data/datasources/data/datasets/adm3_jakpus_line')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            L.geoJSON(data, {
                style: function (feature) {
                    // Customize the appearance of lines with a custom color
                    return {
                        color: 'red',
                        weight: 3
                    };
                }
            }).addTo(lineLayer);
        });

    // Fetch and display polygon data with custom color
    fetch('https://iserver.supermap.id/iserver/services/data-test_fe/rest/data/datasources/data/datasets/adm3_jakpus_region')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            L.geoJSON(data, {
                style: function (feature) {
                    // Customize the appearance of polygons with a custom color
                    return {
                        fillColor: 'green',
                        fillOpacity: 0.5,
                        color: 'blue',
                        weight: 2
                    };
                }
            }).addTo(polygonLayer);
        });
}
