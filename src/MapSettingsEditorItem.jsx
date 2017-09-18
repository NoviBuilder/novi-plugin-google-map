const React = novi.react.React;
import Body from "./editor/MapSettingsBody";
import * as Utils from "./Utils";
const Icons = novi.ui.icons;
const Icon = novi.ui.icon;

const EditorItem = {
    trigger: <Icon>
                <svg viewBox="0 0 20 20">
                    <path d="M17.071 2.929c-1.889-1.889-4.4-2.929-7.071-2.929s-5.182 1.040-7.071 2.929c-1.889 1.889-2.929 4.4-2.929 7.071s1.040 5.182 2.929 7.071c1.889 1.889 4.4 2.929 7.071 2.929s5.182-1.040 7.071-2.929c1.889-1.889 2.929-4.4 2.929-7.071s-1.040-5.182-2.929-7.071zM18.397 6.761c-0.195-0.351-0.685-0.518-1.325-0.736-0.687-0.234-0.93-0.94-1.211-1.758-0.244-0.71-0.496-1.443-1.095-1.899 1.639 1.027 2.924 2.567 3.631 4.393zM15.591 10.191c0.076 0.677 0.154 1.378-0.687 2.322-0.227 0.255-0.36 0.61-0.501 0.986-0.326 0.871-0.634 1.694-1.946 1.706-0.037-0.044-0.141-0.21-0.234-0.733-0.085-0.482-0.134-1.106-0.187-1.765-0.080-1.012-0.171-2.16-0.421-3.112-0.32-1.217-0.857-1.936-1.641-2.198-0.342-0.114-0.692-0.17-1.068-0.17-0.278 0-0.53 0.030-0.752 0.056-0.173 0.020-0.337 0.040-0.475 0.040 0 0-0 0-0 0-0.234 0-0.499 0-0.826-0.748-0.469-1.075-0.123-2.798 1.254-3.707 0.755-0.498 1.276-0.711 1.742-0.711 0.372 0 0.773 0.129 1.342 0.433 0.672 0.358 1.199 0.404 1.583 0.404 0.152 0 0.29-0.008 0.423-0.016 0.112-0.007 0.217-0.013 0.315-0.013 0.22 0 0.398 0.029 0.607 0.171 0.385 0.263 0.585 0.844 0.796 1.458 0.32 0.932 0.683 1.988 1.835 2.38 0.155 0.053 0.421 0.143 0.61 0.222-0.163 0.168-0.435 0.411-0.702 0.649-0.172 0.154-0.367 0.328-0.583 0.525-0.624 0.569-0.55 1.235-0.484 1.822zM1.001 9.923c0.108 0.019 0.224 0.042 0.344 0.067 0.562 0.12 0.825 0.228 0.94 0.289-0.053 0.103-0.16 0.255-0.231 0.355-0.247 0.351-0.555 0.788-0.438 1.269 0.079 0.325 0.012 0.723-0.103 1.091-0.332-0.938-0.513-1.946-0.513-2.996 0-0.026 0.001-0.051 0.001-0.077zM10 19c-3.425 0-6.41-1.924-7.93-4.747 0.262-0.499 0.748-1.603 0.521-2.569 0.016-0.097 0.181-0.331 0.28-0.472 0.271-0.385 0.608-0.863 0.358-1.37-0.175-0.356-0.644-0.596-1.566-0.804-0.214-0.048-0.422-0.087-0.599-0.118 0.536-4.455 4.338-7.919 8.935-7.919 1.578 0 3.062 0.409 4.352 1.125-0.319-0.139-0.608-0.161-0.84-0.161-0.127 0-0.253 0.007-0.375 0.015-0.119 0.007-0.242 0.014-0.364 0.014-0.284 0-0.638-0.034-1.112-0.287-0.724-0.385-1.266-0.55-1.812-0.55-0.676 0-1.362 0.262-2.293 0.876-0.805 0.531-1.411 1.343-1.707 2.288-0.289 0.921-0.258 1.864 0.087 2.654 0.407 0.932 0.944 1.348 1.742 1.348 0 0 0 0 0 0 0.197 0 0.389-0.023 0.592-0.047 0.205-0.024 0.416-0.049 0.635-0.049 0.271 0 0.51 0.038 0.751 0.118 0.439 0.147 0.763 0.639 0.991 1.504s0.314 1.966 0.391 2.936c0.064 0.81 0.124 1.574 0.257 2.151 0.081 0.35 0.185 0.616 0.32 0.813 0.201 0.294 0.489 0.456 0.811 0.456 0.884 0 1.59-0.285 2.099-0.847 0.423-0.467 0.639-1.044 0.813-1.508 0.102-0.273 0.208-0.556 0.311-0.672 1.137-1.277 1.020-2.329 0.934-3.098-0.063-0.564-0.064-0.764 0.164-0.972 0.212-0.193 0.405-0.366 0.575-0.518 0.363-0.324 0.625-0.558 0.809-0.758 0.126-0.138 0.422-0.461 0.34-0.865-0.001-0.004-0.002-0.007-0.002-0.011 0.343 0.951 0.53 1.976 0.53 3.044 0 4.963-4.037 9-9 9z" />
                </svg>
            </Icon>,
    tooltip: "Change Map settings",
    header: [<Icon>
                <svg viewBox="0 0 20 20">
                    <path d="M17.071 2.929c-1.889-1.889-4.4-2.929-7.071-2.929s-5.182 1.040-7.071 2.929c-1.889 1.889-2.929 4.4-2.929 7.071s1.040 5.182 2.929 7.071c1.889 1.889 4.4 2.929 7.071 2.929s5.182-1.040 7.071-2.929c1.889-1.889 2.929-4.4 2.929-7.071s-1.040-5.182-2.929-7.071zM18.397 6.761c-0.195-0.351-0.685-0.518-1.325-0.736-0.687-0.234-0.93-0.94-1.211-1.758-0.244-0.71-0.496-1.443-1.095-1.899 1.639 1.027 2.924 2.567 3.631 4.393zM15.591 10.191c0.076 0.677 0.154 1.378-0.687 2.322-0.227 0.255-0.36 0.61-0.501 0.986-0.326 0.871-0.634 1.694-1.946 1.706-0.037-0.044-0.141-0.21-0.234-0.733-0.085-0.482-0.134-1.106-0.187-1.765-0.080-1.012-0.171-2.16-0.421-3.112-0.32-1.217-0.857-1.936-1.641-2.198-0.342-0.114-0.692-0.17-1.068-0.17-0.278 0-0.53 0.030-0.752 0.056-0.173 0.020-0.337 0.040-0.475 0.040 0 0-0 0-0 0-0.234 0-0.499 0-0.826-0.748-0.469-1.075-0.123-2.798 1.254-3.707 0.755-0.498 1.276-0.711 1.742-0.711 0.372 0 0.773 0.129 1.342 0.433 0.672 0.358 1.199 0.404 1.583 0.404 0.152 0 0.29-0.008 0.423-0.016 0.112-0.007 0.217-0.013 0.315-0.013 0.22 0 0.398 0.029 0.607 0.171 0.385 0.263 0.585 0.844 0.796 1.458 0.32 0.932 0.683 1.988 1.835 2.38 0.155 0.053 0.421 0.143 0.61 0.222-0.163 0.168-0.435 0.411-0.702 0.649-0.172 0.154-0.367 0.328-0.583 0.525-0.624 0.569-0.55 1.235-0.484 1.822zM1.001 9.923c0.108 0.019 0.224 0.042 0.344 0.067 0.562 0.12 0.825 0.228 0.94 0.289-0.053 0.103-0.16 0.255-0.231 0.355-0.247 0.351-0.555 0.788-0.438 1.269 0.079 0.325 0.012 0.723-0.103 1.091-0.332-0.938-0.513-1.946-0.513-2.996 0-0.026 0.001-0.051 0.001-0.077zM10 19c-3.425 0-6.41-1.924-7.93-4.747 0.262-0.499 0.748-1.603 0.521-2.569 0.016-0.097 0.181-0.331 0.28-0.472 0.271-0.385 0.608-0.863 0.358-1.37-0.175-0.356-0.644-0.596-1.566-0.804-0.214-0.048-0.422-0.087-0.599-0.118 0.536-4.455 4.338-7.919 8.935-7.919 1.578 0 3.062 0.409 4.352 1.125-0.319-0.139-0.608-0.161-0.84-0.161-0.127 0-0.253 0.007-0.375 0.015-0.119 0.007-0.242 0.014-0.364 0.014-0.284 0-0.638-0.034-1.112-0.287-0.724-0.385-1.266-0.55-1.812-0.55-0.676 0-1.362 0.262-2.293 0.876-0.805 0.531-1.411 1.343-1.707 2.288-0.289 0.921-0.258 1.864 0.087 2.654 0.407 0.932 0.944 1.348 1.742 1.348 0 0 0 0 0 0 0.197 0 0.389-0.023 0.592-0.047 0.205-0.024 0.416-0.049 0.635-0.049 0.271 0 0.51 0.038 0.751 0.118 0.439 0.147 0.763 0.639 0.991 1.504s0.314 1.966 0.391 2.936c0.064 0.81 0.124 1.574 0.257 2.151 0.081 0.35 0.185 0.616 0.32 0.813 0.201 0.294 0.489 0.456 0.811 0.456 0.884 0 1.59-0.285 2.099-0.847 0.423-0.467 0.639-1.044 0.813-1.508 0.102-0.273 0.208-0.556 0.311-0.672 1.137-1.277 1.020-2.329 0.934-3.098-0.063-0.564-0.064-0.764 0.164-0.972 0.212-0.193 0.405-0.366 0.575-0.518 0.363-0.324 0.625-0.558 0.809-0.758 0.126-0.138 0.422-0.461 0.34-0.865-0.001-0.004-0.002-0.007-0.002-0.011 0.343 0.951 0.53 1.976 0.53 3.044 0 4.963-4.037 9-9 9z" />
                </svg>
            </Icon>, <span>Google Map Settings</span>],
    body: [<Body/>],
    closeIcon: "submit",
    title: "Google Map Settings",
    onSubmit: onMapSettingsSubmitAction,
    width: 340,
    height: 274
};

export default EditorItem;

function onMapSettingsSubmitAction(headerStates, bodyStates) {
    let state = bodyStates[0];
    let saveState = {
        zoom: state.zoom,
        center: state.center,
        style: state.style,
        customStyle: state.customStyle,
        icon: state.icon,
        activeIcon: state.activeIcon
    };

    if ( novi.utils.lodash.isEqual(saveState, state.initData)) return;

    novi.element.setAttribute(state.element, "data-zoom", state.zoom);
    state.element.setAttribute("data-zoom", state.zoom);
    novi.element.setAttribute(state.element, "data-center", state.center);
    state.element.setAttribute("data-center", state.center);

    let styles;
    switch (state.style.value){
        case "custom":
            novi.element.setAttribute(state.element, "data-styles", state.customStyle);
            state.element.setAttribute("data-styles", state.customStyle);
            styles = state.customStyle;
            break;
        case "default":
            novi.element.removeAttribute(state.element, "data-styles");
            state.element.removeAttribute("data-styleszoom");
            styles = '[]';
            break;
        default:
            novi.element.setAttribute(state.element, "data-styles", state.style.value);
            state.element.setAttribute("data-styles", state.style.value);
            styles = state.style.value;
            break;
    }

    if (state.icon !== state.initData.icon){
        novi.element.setAttribute(state.element, "data-icon", state.icon);
        state.element.setAttribute("data-icon", state.icon);

        // Remove all separate added markers
        let markers = state.element.querySelectorAll('.google-map-markers li');

        for (let i = 0; i < markers.length; i++){
            if (novi.element.hasStaticReference(markers[i])){
                novi.element.removeAttribute(markers[i], "data-icon");
                markers[i].removeAttribute("data-icon");
            }
        }
    }

    if (state.activeIcon !== state.initData.activeIcon){
        novi.element.setAttribute(state.element, "data-icon-active", state.activeIcon);
        state.element.setAttribute("data-icon-active", state.activeIcon);

        // Remove all separate added markers
        let markers = state.element.querySelectorAll('.google-map-markers li');

        for (let i = 0; i < markers.length; i++){
            if (novi.element.hasStaticReference(markers[i])){
                novi.element.removeAttribute(markers[i], "data-icon-active");
                markers[i].removeAttribute("data-icon-active");
            }
        }
    }


    if (state.element.map && state.element.geocoder && state.element.google){
        let map = state.element.map;

        // Change map zoom
        if (state.zoom !== state.initData.zoom){
            map.setZoom(parseInt(state.zoom));
        }

        // Change map Center
        if (state.center !== state.initData.center){
            Utils.getLatLngObject(state.center, state.element.geocoder, state.element.google, (result)=>{
                map.setCenter(result);
            })
        }

        // Change map Styles
        if (state.style !== state.initData.style){
            map.setOptions({styles: JSON.parse(styles)});
        }

        // Change marker icon
        if (state.icon !== state.initData.icon){
            // Remove all separate added markers
            let markers = state.element.querySelectorAll('.google-map-markers li');

            for (let i = 0; i < markers.length; i++){
                if (novi.element.hasStaticReference(markers[i])){
                    markers[i].gmarker.setIcon(state.icon);
                }
            }
        }
    }else{
        novi.page.forceUpdate();
    }

}