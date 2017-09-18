import * as Utils from "./Utils";
const React = novi.react.React;
import Body from "./editor/MarkersSettingsBody";

const Icon = novi.ui.icon;

const EditorItem = {
    trigger: <Icon>
        <svg viewBox="0 0 20 20">
            <path
                d="M10 20c-0.153 0-0.298-0.070-0.393-0.191-0.057-0.073-1.418-1.814-2.797-4.385-0.812-1.513-1.46-2.999-1.925-4.416-0.587-1.787-0.884-3.472-0.884-5.008 0-3.308 2.692-6 6-6s6 2.692 6 6c0 1.536-0.298 3.22-0.884 5.008-0.465 1.417-1.113 2.903-1.925 4.416-1.38 2.571-2.74 4.312-2.797 4.385-0.095 0.121-0.24 0.191-0.393 0.191zM10 1c-2.757 0-5 2.243-5 5 0 3.254 1.463 6.664 2.691 8.951 0.902 1.681 1.809 3.014 2.309 3.71 0.502-0.699 1.415-2.040 2.318-3.726 1.223-2.283 2.682-5.687 2.682-8.935 0-2.757-2.243-5-5-5z"
            />
            <path
                d="M10 9c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM10 4c-1.103 0-2 0.897-2 2s0.897 2 2 2c1.103 0 2-0.897 2-2s-0.897-2-2-2z"
            />
        </svg>
    </Icon>,
    tooltip: "Customize Markers",
    header: [<Icon>
        <svg viewBox="0 0 20 20">
            <path
                d="M10 20c-0.153 0-0.298-0.070-0.393-0.191-0.057-0.073-1.418-1.814-2.797-4.385-0.812-1.513-1.46-2.999-1.925-4.416-0.587-1.787-0.884-3.472-0.884-5.008 0-3.308 2.692-6 6-6s6 2.692 6 6c0 1.536-0.298 3.22-0.884 5.008-0.465 1.417-1.113 2.903-1.925 4.416-1.38 2.571-2.74 4.312-2.797 4.385-0.095 0.121-0.24 0.191-0.393 0.191zM10 1c-2.757 0-5 2.243-5 5 0 3.254 1.463 6.664 2.691 8.951 0.902 1.681 1.809 3.014 2.309 3.71 0.502-0.699 1.415-2.040 2.318-3.726 1.223-2.283 2.682-5.687 2.682-8.935 0-2.757-2.243-5-5-5z"
            />
            <path
                d="M10 9c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM10 4c-1.103 0-2 0.897-2 2s0.897 2 2 2c1.103 0 2-0.897 2-2s-0.897-2-2-2z"
            />
        </svg>
    </Icon>, <span>Google Map Markers Settings</span>],
    body: [<Body/>],
    closeIcon: "submit",
    title: "Customize Markers",
    onSubmit: onMarkersSettingsSubmitAction,
    width: 540,
    height: 230
};

export default EditorItem;

function onMarkersSettingsSubmitAction(headerStates, bodyStates) {
    let state = bodyStates[0];
    let markers = state.markers.filter((marker) =>{ return marker.location.length > 0});

    if (novi.utils.lodash.isEqual(markers, state.initMarkers)) return;
    let shouldPageReload = false;

    let markerElements = state.element.querySelectorAll('.google-map-markers li');
    let i, elementToRemove = [];
    for (i = 0; i < markerElements.length; i++) {
        if (markers[i] && markers[i].location) {
            novi.element.setAttribute(markerElements[i], "data-location", markers[i].location);
            markerElements[i].setAttribute("data-location", markers[i].location);
            if (markers[i].description.length){
                novi.element.setAttribute(markerElements[i], "data-description", markers[i].description);
                markerElements[i].setAttribute("data-description", markers[i].description);
            }else{
                novi.element.removeAttribute(markerElements[i], "data-description");
                markerElements[i].removeAttribute("data-description");
            }
        } else {
            elementToRemove.push(markerElements[i]);
            shouldPageReload = true;
        }
    }

    for (i = 0; i < elementToRemove.length; i++){
        novi.element.remove(elementToRemove[i]);
    }

    if (markers.length > markerElements.length) {
        shouldPageReload = true;
        let list = novi.element.getStaticReference(state.element.querySelector('.google-map-markers'));
        let newMarker;

        for (i = markerElements.length; i < markers.length; i++) {
            newMarker = list.ownerDocument.createElement("li");
            newMarker.setAttribute("data-location", markers[i].location);
            if (markers[i].description.length){
                newMarker.setAttribute("data-description", markers[i].description);
            }
            novi.element.appendStatic(newMarker, list);
        }
    }

    if (!shouldPageReload && state.element.map && state.element.geocoder && state.element.google) {
        if (markers.length === state.initMarkers.length) {
            let markerElements = state.element.querySelectorAll('.google-map-markers li');
            for (let i = 0; i < markerElements.length; i++) {
                markerElements[i].infoWindow.setContent(markers[i].description);
                Utils.getLatLngObject(markers[i].location, state.element.geocoder, state.element.google, (result, markerElement) => {
                    markerElement.gmarker.setPosition(result);
                }, markerElements[i]);
            }
        }
    } else {
        novi.page.forceUpdate();
    }

}