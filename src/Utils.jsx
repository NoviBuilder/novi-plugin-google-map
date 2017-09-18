export function getLatLngObject(str, geocoder, google, callback, markerElement) {
    var coordinates = {};

    try {
        coordinates = JSON.parse(str);
        callback({
            lat: coordinates.lat,
            lng: coordinates.lng
        }, markerElement);
    } catch (e) {
        geocoder.geocode({'address': str}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();

                callback({
                    lat: latitude,
                    lng: longitude
                }, markerElement)
            }
        })
    }
}

export function getMarkerDescriptionNode(sourceElement){
    let element = sourceElement;
    while (!novi.utils.dom.hasNonEmptyTextNodes(element)) {
        for (let j = 0; j < element.childNodes.length; j++) {
            if (novi.utils.dom.hasNonEmptyTextNodes(element.childNodes[j])) {
                element = element.childNodes[j];
                break;
            }
        }
    }

    for (let j = 0; j < element.childNodes.length; j++) {
        if (novi.utils.dom.isNonEmptyTextNode(element.childNodes[j])) {
            return element.childNodes[j];
        }
    }

    return null;
}