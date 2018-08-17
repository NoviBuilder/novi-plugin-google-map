# novi-plugin-google-map
Novi Builder Plugin for visual [Google Map](https://www.google.com.ua/maps?source=tldsi&hl=en) customization

## How to Install
You should follow several simple steps to install this plugin:
* Copy the novi-plugin-rd-facebook.js file to your path/to/novibuilder/plugins folder.
* Launch NoviBuilder

## What you are able to do
* Change map zoom
* Change center of map by address or coordinates
* Choose map styles from default list
* Set custom map styles
* Change marker icon image
* Change active marker icon image
* Add and remove unlimited count of markers
* Set description and location on each marker

## Developer Settings
* querySelector — contains a css selector which defines the Plugin container.

## How to add Google Map on your page
If your website doesn't contain Google Map follow the instructions below to install it.

### Include Google Map files to Website
Copy the "assets/rd-facebook.js" and "assets/rd-facebook.css" to website's JS and CSS folders respectively and include this files to your website.

### Add Google Map HTML Layout
Add basic Google Map HTML Layout:

```html
<div class="google-map-container" data-key="YOUR_API_KEY" data-zoom="16" data-center="New York, NY, United States">
    <div class="google-map"></div>
    <ul class="google-map-markers">
    </ul>
</div>
```

### Initialize Google Map
```js

"use strict";

/**
 * Initialize All Scripts
 */
$document.ready(function () {
    var maps = document.querySelectorAll(".google-map-container");
    if (maps.length) {
        var key;

        for ( var i = 0; i < maps.length; i++ ) {
                if (maps[i].hasAttribute( "data-key" ) ) {
                    key = maps[i].getAttribute( "data-key" );
                    break;
                }
        }

        $.getScript('//maps.google.com/maps/api/js?'+ ( key ? 'key='+ key + '&' : '' ) +'sensor=false&libraries=geometry,places&v=quarterly', function () {
            var head = document.getElementsByTagName('head')[0],
                    insertBefore = head.insertBefore;
    
            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };
            
            var geocoder = new google.maps.Geocoder;
            for (var i = 0; i < maps.length; i++) {
                var zoom = parseInt(maps[i].getAttribute("data-zoom")) || 11;
                var styles;
                if (maps[i].hasAttribute('data-styles')){
                    try {
                        styles = JSON.parse(maps[i].getAttribute("data-styles"));
                    }
                    catch (error){
                        styles = [];
                    }
                }
                var center = maps[i].getAttribute("data-center");
                
                // Initialize map
                var map = new google.maps.Map(maps[i].querySelectorAll(".google-map")[0], {
                    zoom: zoom,
                    styles: styles,
                    scrollwheel: false,
                    center: {lat: 0, lng: 0}
                });
                // Add map object to map node
                maps[i].map = map;
                maps[i].geocoder = geocoder;
                maps[i].keySupported = true;
                maps[i].google = google;
                
                // Get Center coordinates from attribute
                getLatLngObject(center, null, maps[i], function (location, markerElement, mapElement) {
                    mapElement.map.setCenter(location);
                })
    
                // Add markers from google-map-markers array
                var markerItems = maps[i].querySelectorAll(".google-map-markers li");
                if (markerItems.length){
                var markers = [];
                for (var j = 0; j < markerItems.length; j++){
                    var markerElement = markerItems[j];
                    getLatLngObject(markerElement.getAttribute("data-location"), markerElement, maps[i], function(location, markerElement, mapElement){
                        var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
                        var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
                        var info = markerElement.getAttribute("data-description") || "";
                        var infoWindow = new google.maps.InfoWindow({
                            content: info
                        });
                        markerElement.infoWindow = infoWindow;
                        var markerData = {
                            position: location,
                              map: mapElement.map
                        }
                        if (icon){
                          markerData.icon = icon;
                        }
                        var marker = new google.maps.Marker(markerData);
                        markerElement.gmarker = marker;
                        markers.push({markerElement: markerElement, infoWindow: infoWindow});
                        marker.isActive = false;
                        // Handle infoWindow close click
                        google.maps.event.addListener(infoWindow,'closeclick',(function(markerElement, mapElement){
                            var markerIcon;
                            markerElement.gmarker.isActive = false
                            if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
                                markerElement.gmarker.setIcon(markerIcon);
                            }
                        }).bind(this, markerElement, mapElement));
                    
                        
                            // Set marker active on Click and open infoWindow
                            google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
                                if (markerElement.infoWindow.getContent().length === 0) return;
                                var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
                                for (var k =0; k < markers.length; k++){
                                    var markerIcon;
                                    if (markers[k].markerElement === markerElement){
                                        currentInfoWindow = markers[k].infoWindow;
                                    }
                                    gMarker = markers[k].markerElement.gmarker;
                                    if (gMarker.isActive && markers[k].markerElement !== markerElement){
                                        gMarker.isActive = false;
                                        if (markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
                                            gMarker.setIcon(markerIcon);
                                        }
                                            markers[k].infoWindow.close();
                                    }
                                }
    
                                currentMarker.isActive = !currentMarker.isActive;
                                if (currentMarker.isActive) {
                                    if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")){
                                        currentMarker.setIcon(markerIcon);
                                    }
                                    
                                        currentInfoWindow.open(map, marker);
                                }else{
                                    if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
                                        currentMarker.setIcon(markerIcon);
                                    }
                                        currentInfoWindow.close();
                                }
                            }).bind(this, markerElement, mapElement))
                    })
                }	
                }
            }
        });
    }
    
    function getLatLngObject(str, marker, map, callback) {
        var coordinates = {};
        try {
            coordinates = JSON.parse(str);
            callback(new google.maps.LatLng(
                        coordinates.lat,
                        coordinates.lng
                    ), marker, map)
        } catch (e) {
            map.geocoder.geocode({'address': str}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
    
                    callback(new google.maps.LatLng(
                        parseFloat(latitude),
                        parseFloat(longitude)
                    ), marker, map)
                }
            })
        }
    }
});
```