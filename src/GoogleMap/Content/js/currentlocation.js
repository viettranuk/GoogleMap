(function (CurrentLocation, $, undefined) {

    "use strict";
    var userPostcodeInputSelector = "#userPostcode",
        userLocatorButtonSelector = "#userLocatorButton > i.fa";

    CurrentLocation.prototype = {

        setPlaceholderText: function () {

            $(userPostcodeInputSelector).attr("placeholder", "Use current location");
        },

        resetPlaceholderText: function () {

            $(userPostcodeInputSelector).attr("placeholder", "Enter postcode of your current location");
        },

        getCurrentLocation: function () {

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(CurrentLocation.prototype.getPosition, CurrentLocation.prototype.getPositionErrorCallback);

            } else {

                alert("Sorry, this function is not currently supported by your browser. Please manually type in your postcode");
            }
        },

        getPosition: function (position) {

            var mapHolder = document.getElementById("map-canvas"),
                myLatitude = position.coords.latitude,
                myLongtitude = position.coords.longitude,
                latlng = new google.maps.LatLng(myLatitude, myLongtitude),
                mapOptions = {
                    zoom: 15,
                    center: latlng,
                    mapTypeId: "roadmap"
                },                
                infowindow = new google.maps.InfoWindow,
                geocoder = new google.maps.Geocoder;

            geocoder.geocode({ "latLng": latlng }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {

                    if (results[0]) {

                        var i, myPostcode = "",
                            addressComponents = results[0].address_components;

                        for (i = addressComponents.length; i--;) {

                            var comTypes = addressComponents[i].types;

                            $(comTypes).each(function (index) {

                                if (comTypes[index] === "postal_code") {

                                    myPostcode = addressComponents[i].short_name;
                                    return;
                                }
                            });

                            if (myPostcode !== "") { break; }
                        }

                        if (myPostcode !== "") {

                            $(userPostcodeInputSelector).val(myPostcode);
                        }
                        
                        var map = new google.maps.Map(mapHolder, mapOptions),
                            marker = new google.maps.Marker({
                                position: latlng,
                                map: map
                            });

                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);

                        mapHolder.style.height = "600px";
                        mapHolder.style.marginTop = "13px";
                        mapHolder.style.color = "#000000";
                        mapHolder.style.borderRadius = "6px";
                        mapHolder.style.border = "2px solid white";

                        google.maps.event.trigger(map, "resize");

                    } else {

                        alert("Sorry, no results found. Please type in your postcode manually.");
                    }

                } else {

                    alert("Sorry, service failed due to: " + status + ". Please type in your postcode manually.");
                }
            });
        },

        getPositionErrorCallback: function (error) {

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    alert("Request for location service has been denied. Please type in your postcode manually.");
                    break;

                case error.POSITION_UNAVAILABLE:
                    alert("Sorry, location information is currently unavailable. Please type in your postcode manually.");
                    break;

                case error.TIMEOUT:
                    alert("Sorry, the request to get your location has timed out. Please type in your postcode manually.");
                    break;

                case error.UNKNOWN_ERROR:
                    alert("Sorry, an unknown error occurred while processing your request. Please type in your postcode manually.");
                    break;
            }
        }
    }

}(window.CurrentLocation = window.CurrentLocation || {}, jQuery));