(function (NearByShops, $, undefined) {

    "use strict";
    var map, infowindow;

    NearByShops.prototype = {

        initMap: function () {

            var pyrmont = { lat: -33.867, lng: 151.195 },
                mapHolder = document.getElementById("map-canvas");

            mapHolder.style.height = "600px";
            mapHolder.style.marginTop = "13px";
            mapHolder.style.color = "#000000";
            mapHolder.style.borderRadius = "6px";

            map = new google.maps.Map(mapHolder,
            {
                center: pyrmont,
                zoom: 15
            });

            infowindow = new google.maps.InfoWindow;

            var service = new google.maps.places.PlacesService(map);

            service.nearbySearch(
            {
                location: pyrmont,
                radius: 500,
                type: ["store"]
            }, NearByShops.prototype.callback);
        },

        callback: function (results, status) {

            if (status === google.maps.places.PlacesServiceStatus.OK) {

                for (var i = 0; i < results.length; i++) {

                    NearByShops.prototype.createMarker(results[i]);
                }
            }
        },

        createMarker: function (place) {

            var placeLoc = place.geometry.location,
                marker = new google.maps.Marker(
                {
                    map: map,
                    position: placeLoc
                });

            google.maps.event.addListener(marker, "click", function () {

                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
    }

}(window.NearByShops = window.NearByShops || {}, jQuery));