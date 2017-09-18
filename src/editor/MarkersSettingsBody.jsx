const Input = novi.ui.input;
const Component = novi.react.Component;
const React = novi.react.React;
const Button = novi.ui.button;

export default class MarkersSettingsBody extends Component {
    constructor(props) {
        super(props);

        this._renderMarkerSettings = this._renderMarkerSettings.bind(this);
        this._renderMarkers = this._renderMarkers.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.addAutoCompleteToInput = this.addAutoCompleteToInput.bind(this);
        this._showAutoComplete = this._showAutoComplete.bind(this);
        this._renderAutocompleteList = this._renderAutocompleteList.bind(this);
        this.hideAutoCompleteBox = this.hideAutoCompleteBox.bind(this);
        this.onAutocompleteListItem = this.onAutocompleteListItem.bind(this);

        this.projectDir = props.element.ownerDocument.head.querySelector('base').getAttribute('href');

        let markerElements = props.element.querySelectorAll('.google-map-markers li');
        let markers = [];

        if (markerElements.length) {
            for (let i = 0; i < markerElements.length; i++) {
                if (markerElements[i].getAttribute('data-location').length) {
                    markers.push({
                        location: markerElements[i].getAttribute('data-location'),
                        description: markerElements[i].getAttribute('data-description') || ""
                    });
                }
            }
        }

        if (markers.length === 0) {
            markers.push({
                location: "",
                description: ""
            });
        }

        this.componentStyle = `
            .google-map-plugin-markers{
                max-height: 153px;
                overflow-y: scroll;
                background: #181D27;
                padding: 10px 5px 10px 13px;
                box-sizing: border-box;
            }

            .google-map-plugin-markers::-webkit-scrollbar {
              width: 8px;
              height: 8px;
              background: #181D27; }

            .google-map-plugin-markers::-webkit-scrollbar-thumb {
              height: 6px;
              width: 6px;
              border: 2px solid transparent;
              background-clip: padding-box;
              -webkit-border-radius: 4px;
              background-color: #109DF7; 
            }
            
            .google-map-plugin-marker {
                position: relative;
            }
            
            .google-map-plugin-marker + .google-map-plugin-marker{
                padding-top: 10px;
                margin-top: 10px;
                border-top: 1px solid #111419;
            }
            
            .google-map-plugin-markers .novi-input input{
                background: #111419; 
            }
            .google-map-plugin-markers .novi-input + .novi-input{
                margin-left: 15px;
            }
            
            .google-map-plugin-marker-remove{
                width: 40px;
                text-align: center;
                cursor: pointer;
                flex-shrink: 0;
                z-index: 1;
                margin-top: 22px;
            }
            
            .google-map-plugin-autocomplete-list{
                list-style-type: none;
                margin: 0;
                padding: 0;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #181D27;
                color: #fff;
                z-index: 10;
                padding: 4px 0;
            }
            
            .google-map-plugin-autocomplete-list-item{
                padding: 8px 10px;
                white-space: nowrap;
                box-sizing:border-box;
                display: flex;
                cursor: pointer;
            }
            
            .google-map-plugin-autocomplete-list-item + .google-map-plugin-autocomplete-list-item{
                border-top: 1px solid #000; 
            }
            
            .google-map-plugin-autocomplete-list-item:hover{
                background: #109DF7;
            }
            
            .google-map-plugin-icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                fill: #fff;
                margin-right: 5px;
                flex-shrink: 0;
            }
            
            .google-map-plugin-autocomplete-description{
                display: inline-block;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .google-map-plugin-marker-address, .google-map-plugin-marker-description{
                width: 50%;
            }
            
            .google-map-plugin-marker-description{
                margin-left: 15px;
            }
        `;

        this.autoCompleteService = new props.element.google.maps.places.AutocompleteService();
        this.setBodyHeightByMarkerLength(markers);
        this.interval = null;

        this.markerKey = new Date().getTime();
        let initMarkers = [];
        for (let i in markers) {
            let marker = Object.assign({}, markers[i]);
            initMarkers.push(marker);
        }

        this.state = {
            element: props.element,
            markers,
            initMarkers
        };
    }

    render() {
        return (
            <div
                className="google-map-plugin" style={{
                "padding": "15px 12px",
                "display": "flex",
                "flexDirection": "column",
                "height": "100%",
                "color": "#6E778A",
                "boxSizing": "border-box",
                "position": "relative"
            }}
            >
                <style>{this.componentStyle}</style>
                {this._renderMarkerSettings()}
                {this._renderAutocompleteList()}
            </div>
        )
    }

    _renderAutocompleteList() {
        if (!this.state.autocomplete || !this.state.autocomplete.results) return null;

        let styles = this.getPositionByInput(this.state.autocomplete.input);

        return (
            <ul style={styles} className={"google-map-plugin-autocomplete-list"}>
                {this._renderAutocompleteListItem()}
            </ul>
        )
    }

    _renderAutocompleteListItem() {
        return this.state.autocomplete.results.map((item) => {
            return <li className={"google-map-plugin-autocomplete-list-item"} onMouseDown={this.onAutocompleteListItem}>
                <div className="google-map-plugin-icon">
                    <svg viewBox="0 0 20 20">
                        <path
                            d="M10 20c-0.153 0-0.298-0.070-0.393-0.191-0.057-0.073-1.418-1.814-2.797-4.385-0.812-1.513-1.46-2.999-1.925-4.416-0.587-1.787-0.884-3.472-0.884-5.008 0-3.308 2.692-6 6-6s6 2.692 6 6c0 1.536-0.298 3.22-0.884 5.008-0.465 1.417-1.113 2.903-1.925 4.416-1.38 2.571-2.74 4.312-2.797 4.385-0.095 0.121-0.24 0.191-0.393 0.191zM10 1c-2.757 0-5 2.243-5 5 0 3.254 1.463 6.664 2.691 8.951 0.902 1.681 1.809 3.014 2.309 3.71 0.502-0.699 1.415-2.040 2.318-3.726 1.223-2.283 2.682-5.687 2.682-8.935 0-2.757-2.243-5-5-5z"
                        />
                        <path
                            d="M10 9c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zM10 4c-1.103 0-2 0.897-2 2s0.897 2 2 2c1.103 0 2-0.897 2-2s-0.897-2-2-2z"
                        />
                    </svg>
                </div>
                <span className={"google-map-plugin-autocomplete-description"}>
                    {item.description}
                </span>
            </li>
        })
    }

    onAutocompleteListItem(e) {
        let li = e.target;
        if (e.target.tagName !== "LI") {
            while (li.tagName !== "LI") {
                li = li.parentElement;
            }
        }

        let markers = this.state.markers.slice(0);
        markers[this.state.autocomplete.index].location = li.querySelector(".google-map-plugin-autocomplete-description").innerHTML;

        this.setState({
            markers
        })
    }

    _showAutoComplete(input, index) {
        if (!input) return null;
        let value = input.value;
        if (value.length > 2) {
            this.autoCompleteService.getQueryPredictions({input: value}, this._handleAutoCompleteData.bind(this, input, index));
        }
    }

    hideAutoCompleteBox() {
        if (!this.state.autocomplete) return;
        this.setState({
            autocomplete: null
        })
    }

    getPositionByInput(input) {
        let pluginElement = input;
        while (!pluginElement.classList.contains('google-map-plugin')) {
            pluginElement = pluginElement.parentElement;
        }

        let pluginBounds = pluginElement.getBoundingClientRect();
        let inputBounds = input.getBoundingClientRect();

        return {
            top: inputBounds.top - pluginBounds.top + 28,
            left: inputBounds.left - pluginBounds.left,
            width: inputBounds.width
        }
    }

    _renderMarkerSettings() {
        if (this.state.mapSettings) return null;
        return (
            <div>
                <p className="novi-label" style={{marginTop: "0"}}>
                    Markers:
                </p>
                <div className={"google-map-plugin-markers"} onScroll={this.hideAutoCompleteBox}>
                    {this._renderMarkers()}
                </div>
                <div style={{textAlign: "right"}}>
                    <Button
                        onClick={this.addMarker} messages={{"textContent": "Add Marker"}} style={{marginRight: -10}}
                    />
                </div>
            </div>
        );
    }

    _renderMarkers() {
        return this.state.markers.map((marker, index) => {
            return (
                <div
                    key={this.markerKey + '-' + index}
                    style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}
                    className={"google-map-plugin-marker"}
                >
                    <div className={"google-map-plugin-marker-address"}>
                        <p className="novi-label" style={{marginTop: "0"}}>
                            Marker Location*:
                        </p>
                        <Input
                            type="text"
                            onChange={this._handleMarkerChange.bind(this, "location", index)}
                            value={marker.location} onFocus={this.addAutoCompleteToInput.bind(this, index)}
                            onBlur={this.hideAutoCompleteBox} placeholder={"Type location..."}
                        />
                    </div>
                    <div className={"google-map-plugin-marker-description"}>
                        <p className="novi-label" style={{marginTop: "0"}}>
                            Marker Description:
                        </p>
                        <Input
                            type="text" onChange={this._handleMarkerChange.bind(this, "description", index)}
                            value={marker.description} placeholder={"Type description..."}
                        />
                    </div>
                    <div
                        className={"google-map-plugin-marker-remove"}
                        onClick={this.removeMarker.bind(this, index)}
                    >
                        <svg viewBox="0 0 20 20" style={{width: 10, height: 10, display: "inline-block", fill: "#fff"}}>
                            <path
                                d="M10.707 10.5l8.646-8.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-8.646 8.646-8.646-8.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l8.646 8.646-8.646 8.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l8.646-8.646 8.646 8.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-8.646-8.646z"
                            />
                        </svg>
                    </div>
                </div>
            )
        })
    }

    _handleAutoCompleteData(input, index, results) {
        this.setState({
            autocomplete: {
                input, results, index
            }
        })
    }

    addAutoCompleteToInput(index, e) {
        this._showAutoComplete(e.target, index);
    }

    setBodyHeightByMarkerLength(markers) {
        switch (markers.length) {
            case 1:
                novi.editor.setBodyHeight(153);
                break;
            default:
                novi.editor.setBodyHeight(228);
                break;
        }
    }

    _handleMarkerChange(property, index, e) {
        let markers = this.state.markers.slice(0);
        markers[index][property] = e.target.value;
        this.setState({
            markers
        });

        if (property === "location") {
            this._showAutoComplete(e.target, index);
        }
    }

    addMarker() {
        let markers = this.state.markers.slice(0);
        markers.push({location: "", description: ""});
        this.markerKey = new Date().getTime();
        this.setState({
            markers
        });
        this.setBodyHeightByMarkerLength(markers);
    }

    removeMarker(position) {
        let markers = this.state.markers.slice(0);
        if (markers.length === 1) {
            if (!markers[0].location.length && !markers[0].description.length) return;

            markers[0].location = "";
            markers[0].description = "";
            return this.setState({
                markers
            });
        }

        this.markerKey = new Date().getTime();
        markers.splice(position, 1);
        this.setState({
            markers
        });
        this.setBodyHeightByMarkerLength(markers);
    }
}