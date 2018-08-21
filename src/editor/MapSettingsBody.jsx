const Input = novi.ui.input;
const Select = novi.ui.select;
const Component = novi.react.Component;
const React = novi.react.React;
const Types = novi.types;
const InputNumber = novi.ui.inputNumber;
const Language = novi.language;
const Icon = novi.ui.icon;
const Icons = novi.ui.icons;


export default class MapSettingsBody extends Component {
    constructor(props) {
        super(props);

        let zoom = novi.element.getAttribute(props.element, 'data-zoom') || 11;
        let center = novi.element.getAttribute(props.element, 'data-center') || "New York";
        let styles = novi.element.getAttribute(props.element, 'data-styles');
        let icon = novi.element.getAttribute(props.element, 'data-icon');
        let key = novi.element.getAttribute(props.element, 'data-key');
        let activeIcon = novi.element.getAttribute(props.element, 'data-icon-active');
        this.iconKey = new Date().getTime();
        this.activeIconKey = this.iconKey + 1;
        let style, customStyle = "";

        this._renderCustomStyleField = this._renderCustomStyleField.bind(this);
        this._handleStyleChange = this._handleStyleChange.bind(this);
        this.addAutoCompleteToInput = this.addAutoCompleteToInput.bind(this);
        this._showAutoComplete = this._showAutoComplete.bind(this);
        this._renderAutocompleteList = this._renderAutocompleteList.bind(this);
        this._handleZoomChange = this._handleZoomChange.bind(this);
        this.hideAutoCompleteBox = this.hideAutoCompleteBox.bind(this);
        this.onAutocompleteListItem = this.onAutocompleteListItem.bind(this);
        this._renderInfoIcon = this._renderInfoIcon.bind(this);
        this.messages = Language.getDataByKey("novi-plugin-google-map");
        this.styles = [
            {label: this.messages.editor.mapSettingsBody.defaultStyle, value: "default"},
            {
                label: "Ultra Light with Labels by hawasan",
                value: "[{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e9e9e9\"},{\"lightness\":17}]},{\"featureType\":\"landscape\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f5f5\"},{\"lightness\":20}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":17}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":29},{\"weight\":0.2}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":18}]},{\"featureType\":\"road.local\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#ffffff\"},{\"lightness\":16}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f5f5f5\"},{\"lightness\":21}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#dedede\"},{\"lightness\":21}]},{\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"visibility\":\"on\"},{\"color\":\"#ffffff\"},{\"lightness\":16}]},{\"elementType\":\"labels.text.fill\",\"stylers\":[{\"saturation\":36},{\"color\":\"#333333\"},{\"lightness\":40}]},{\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#f2f2f2\"},{\"lightness\":19}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#fefefe\"},{\"lightness\":20}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#fefefe\"},{\"lightness\":17},{\"weight\":1.2}]}]"
            },
            {
                label: "Subtle Grayscale by Paulo Avila",
                value: "[{\"featureType\":\"administrative\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":\"-100\"}]},{\"featureType\":\"administrative.province\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":-100},{\"lightness\":65},{\"visibility\":\"on\"}]},{\"featureType\":\"poi\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":-100},{\"lightness\":\"50\"},{\"visibility\":\"simplified\"}]},{\"featureType\":\"road\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":\"-100\"}]},{\"featureType\":\"road.highway\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"simplified\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"all\",\"stylers\":[{\"lightness\":\"30\"}]},{\"featureType\":\"road.local\",\"elementType\":\"all\",\"stylers\":[{\"lightness\":\"40\"}]},{\"featureType\":\"transit\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":-100},{\"visibility\":\"simplified\"}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"hue\":\"#ffff00\"},{\"lightness\":-25},{\"saturation\":-97}]},{\"featureType\":\"water\",\"elementType\":\"labels\",\"stylers\":[{\"lightness\":-25},{\"saturation\":-100}]}]"
            },
            {
                label: "Shades of Grey by Adam Krogh",
                value: "[{\"featureType\":\"all\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"saturation\":36},{\"color\":\"#000000\"},{\"lightness\":40}]},{\"featureType\":\"all\",\"elementType\":\"labels.text.stroke\",\"stylers\":[{\"visibility\":\"on\"},{\"color\":\"#000000\"},{\"lightness\":16}]},{\"featureType\":\"all\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":20}]},{\"featureType\":\"administrative\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":17},{\"weight\":1.2}]},{\"featureType\":\"landscape\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":20}]},{\"featureType\":\"poi\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":21}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":17}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry.stroke\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":29},{\"weight\":0.2}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":18}]},{\"featureType\":\"road.local\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":16}]},{\"featureType\":\"transit\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":19}]},{\"featureType\":\"water\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#000000\"},{\"lightness\":17}]}]"
            },
            {
                label: "Blue water by Xavier",
                value: "[{\"featureType\":\"administrative\",\"elementType\":\"labels.text.fill\",\"stylers\":[{\"color\":\"#444444\"}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#f2f2f2\"}]},{\"featureType\":\"poi\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"road\",\"elementType\":\"all\",\"stylers\":[{\"saturation\":-100},{\"lightness\":45}]},{\"featureType\":\"road.highway\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"simplified\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"labels.icon\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#46bcec\"},{\"visibility\":\"on\"}]}]"
            },
            {
                label: "Light dream by Roberta",
                value: "[{\"featureType\":\"landscape\",\"stylers\":[{\"hue\":\"#FFBB00\"},{\"saturation\":43.400000000000006},{\"lightness\":37.599999999999994},{\"gamma\":1}]},{\"featureType\":\"road.highway\",\"stylers\":[{\"hue\":\"#FFC200\"},{\"saturation\":-61.8},{\"lightness\":45.599999999999994},{\"gamma\":1}]},{\"featureType\":\"road.arterial\",\"stylers\":[{\"hue\":\"#FF0300\"},{\"saturation\":-100},{\"lightness\":51.19999999999999},{\"gamma\":1}]},{\"featureType\":\"road.local\",\"stylers\":[{\"hue\":\"#FF0300\"},{\"saturation\":-100},{\"lightness\":52},{\"gamma\":1}]},{\"featureType\":\"water\",\"stylers\":[{\"hue\":\"#0078FF\"},{\"saturation\":-13.200000000000003},{\"lightness\":2.4000000000000057},{\"gamma\":1}]},{\"featureType\":\"poi\",\"stylers\":[{\"hue\":\"#00FF6A\"},{\"saturation\":-1.0989010989011234},{\"lightness\":11.200000000000017},{\"gamma\":1}]}]"
            },
            {
                label: "Blue Essence by Famous Labs",
                value: "[{\"featureType\":\"landscape.natural\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"visibility\":\"on\"},{\"color\":\"#e0efef\"}]},{\"featureType\":\"poi\",\"elementType\":\"geometry.fill\",\"stylers\":[{\"visibility\":\"on\"},{\"hue\":\"#1900ff\"},{\"color\":\"#c0e8e8\"}]},{\"featureType\":\"road\",\"elementType\":\"geometry\",\"stylers\":[{\"lightness\":100},{\"visibility\":\"simplified\"}]},{\"featureType\":\"road\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"off\"}]},{\"featureType\":\"transit.line\",\"elementType\":\"geometry\",\"stylers\":[{\"visibility\":\"on\"},{\"lightness\":700}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#7dcdcd\"}]}]"
            },
            {
                label: "Pale Dawn by Adam Krogh",
                value: "[{\"featureType\":\"administrative\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"on\"},{\"lightness\":33}]},{\"featureType\":\"landscape\",\"elementType\":\"all\",\"stylers\":[{\"color\":\"#f2e5d4\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#c5dac6\"}]},{\"featureType\":\"poi.park\",\"elementType\":\"labels\",\"stylers\":[{\"visibility\":\"on\"},{\"lightness\":20}]},{\"featureType\":\"road\",\"elementType\":\"all\",\"stylers\":[{\"lightness\":20}]},{\"featureType\":\"road.highway\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#c5c6c6\"}]},{\"featureType\":\"road.arterial\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#e4d7c6\"}]},{\"featureType\":\"road.local\",\"elementType\":\"geometry\",\"stylers\":[{\"color\":\"#fbfaf7\"}]},{\"featureType\":\"water\",\"elementType\":\"all\",\"stylers\":[{\"visibility\":\"on\"},{\"color\":\"#acbcc9\"}]}]"
            },
            {label: this.messages.editor.mapSettingsBody.customStyle, value: "custom"}
        ];

        this.projectDir = props.element.ownerDocument.head.querySelector('base').getAttribute('href');

        if (!styles) {
            style = this.styles[0];
        } else {
            for (let i = 0; i < this.styles.length; i++) {
                if (this.styles[i].value === styles) {
                    style = this.styles[i];
                    break;
                }
            }
        }

        if (!style) {
            style = this.styles[this.styles.length - 1];
            customStyle = styles;
        } else {
            novi.editor.setBodyHeight(284);
        }

        this.commonIconStyles = {
            width: 30,
            height: 30,
            display: "inline-block",
            marginLeft: 10,
            cursor: "pointer"
        };

        this.componentStyle = `
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
            
            .novi-plugin-google-map-warning{
                
            }
            
            .novi-plugin-google-map-warning-icon{
                position: absolute;
                right: 0;
                top: 0;
                width: 20px;
                height: 20px;
                cursor: pointer;
            }
            
            .novi-plugin-google-map-warning-icon .novi-icon{
                width: 16px;
                height: 16px;
            }
            
            
            .novi-plugin-google-map-warning-message{
                width: 100%;
                position: absolute;
                background: #1C222E;
                z-index: 100;
                left: 0;
                color: #fff;
                padding: 15px 10px;
                box-sizing: border-box;
                border: 1px solid #000;
                border-radius: 3px;
                opacity: 0;
                pointer-events:none;
                transition: .3s all ease;
            }
            
            .novi-plugin-google-map-warning-message.active{
                opacity: 1;
                pointer-events:auto;
            }
            
            .novi-plugin-google-map-warning-message-link{
                color: #fff;
            }
            
            .novi-plugin-google-map-warning-message-link:hover{
                color: #109DF7;
            }
        `;

        this.autoCompleteService = new props.element.google.maps.places.AutocompleteService();


        this.state = {
            zoom,
            center,
            customStyle,
            style,
            icon,
            activeIcon,
            key,
            element: props.element,
            initData: {
                zoom,
                center,
                customStyle,
                style,
                icon,
                activeIcon,
                key
            }
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
                {this._renderMapSettings()}
            </div>
        )
    }

    _renderMapSettings() {
        const iconUrl = this.state.icon ? novi.utils.isRelativeURL(this.state.icon) ? this.projectDir + this.state.icon : this.state.icon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAEIElEQVR4nK2WUWgcVRSGj81FRx1kHqZ2hKksOkIoA2ZhA1vI4gYEs4KgSKhgfAiIT/VJfOpDCUWkfdHHUixIQVDykAehWTWyKwlmoQsVXDWUQUYywlRHuJVLmZq7jedMdkN2587uJO0PszPce+53z5xz7pllu7u7oFJ7ftbioXhLgnwFJJRxSO9NCWDQYsC+MSz9y9JyI1StZ8MDnfn5p4LQ/whAvmsahmYaJli6BkzTknkZx0Yo4rmIR3NRyD+uV6Y/s63COXd5+d9McKs263DBVxDouoXCPmxgga6DTZdl0iZax/PPBoFXFbXZN8qrDS8F3nitYgsuGgXbtp2CrQxPahPceMqdBM8PXD8IGsg4PfP1erAP9mq1J2IhVgq2ZTu2he8rc4H7ojVSSjuMwhVkveSsrt5NwL6I3tM0veTY+TxVaRLfEsNYIpYD8Cnz3qkZuNuFUs7XH6US5qXZ2bqAzM+Z74evGzpmA+MlDxmClJBBLGIyRJ2xDCPT9t6OhOu/3oLWH9vQvX8fXjhuwpsvngJTf1JpjxUFWP9nGBU/1WlWwr797RZcx6uv9vaf8OixR2BxekppbyPLQyYlTweWOieJOuFf8KO/nRr/5fbfyZxrPZ1etMfS6VdN7WkHX39YUjGWxjOIMQzpI0bqduFxNLkD9waGH5uYSOaU4aMxZJK3Hp591zL0lI174jjcFndhubMF3QPNqvjMiWROJWTRzaOINEUsXJBpMKl68iT8t9OFH3pVcQqr4tXnn0PPlOYgBDU/aOJx174IOT/rmKbScOIYQM15NrmG3jnDYw7EZDPfbbbqlWI74Lxkj6jnPAoiTtu1iZlUhMbYh34UNagdjimSEZLg8yhhQZ9Sbdxootd1L+Jzjnk0r70oIm/rLyNrH5x4Ddr7geA/FzBAqgY/0tc4hkCImBj9sX1wdX3TW6tMX+xwfn7KUicySz9hCPBAXCRGCkwq6OYlj4dv4+7OXrzHC21BxNJzDOvSwfEBMHX+oDK96HPesBimIaOH9EVtFm0lWi7S2kwwqbp+Y2OtUry8hbXtjkkk2tDtMq0ZnlO6pOvaUsTjBY6feiMjkREmDC+OBkuqeSW4vLoZYSKXPCE+mWJqsM/x6DK2RLa5wSRM5BVM5AcijrF3D5rxWIKQMsCEXclanwmmZPiV4tUgFucn2WCsw5i8havDCcsFJuFJuYZxPEffmIPjUSylrmnXRq0dCZ5pbP5eP11sI7xs9pJI3gI1Gpw7MjgxYOyrSCJY7plSfGls7LpxBvhvY43TR0Hb678cDwXmcu2BwTPrNzsYjgCrwCY0XgGNPTC4Z9SMpFzoP+dck8vqe/R4QfaeHxoY/31sJHFGGRqk+sKRweXGTQ/jzPvPDw3cs2zltj0UWEIuTw8NRsN/DgP+H7N336XO9W88AAAAAElFTkSuQmCC';
        const activeIconUrl = this.state.activeIcon ? novi.utils.isRelativeURL(this.state.activeIcon) ? this.projectDir + this.state.activeIcon : this.state.activeIcon : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAoCAYAAAD6xArmAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAEIElEQVR4nK2WUWgcVRSGj81FRx1kHqZ2hKksOkIoA2ZhA1vI4gYEs4KgSKhgfAiIT/VJfOpDCUWkfdHHUixIQVDykAehWTWyKwlmoQsVXDWUQUYywlRHuJVLmZq7jedMdkN2587uJO0PszPce+53z5xz7pllu7u7oFJ7ftbioXhLgnwFJJRxSO9NCWDQYsC+MSz9y9JyI1StZ8MDnfn5p4LQ/whAvmsahmYaJli6BkzTknkZx0Yo4rmIR3NRyD+uV6Y/s63COXd5+d9McKs263DBVxDouoXCPmxgga6DTZdl0iZax/PPBoFXFbXZN8qrDS8F3nitYgsuGgXbtp2CrQxPahPceMqdBM8PXD8IGsg4PfP1erAP9mq1J2IhVgq2ZTu2he8rc4H7ojVSSjuMwhVkveSsrt5NwL6I3tM0veTY+TxVaRLfEsNYIpYD8Cnz3qkZuNuFUs7XH6US5qXZ2bqAzM+Z74evGzpmA+MlDxmClJBBLGIyRJ2xDCPT9t6OhOu/3oLWH9vQvX8fXjhuwpsvngJTf1JpjxUFWP9nGBU/1WlWwr797RZcx6uv9vaf8OixR2BxekppbyPLQyYlTweWOieJOuFf8KO/nRr/5fbfyZxrPZ1etMfS6VdN7WkHX39YUjGWxjOIMQzpI0bqduFxNLkD9waGH5uYSOaU4aMxZJK3Hp591zL0lI174jjcFndhubMF3QPNqvjMiWROJWTRzaOINEUsXJBpMKl68iT8t9OFH3pVcQqr4tXnn0PPlOYgBDU/aOJx174IOT/rmKbScOIYQM15NrmG3jnDYw7EZDPfbbbqlWI74Lxkj6jnPAoiTtu1iZlUhMbYh34UNagdjimSEZLg8yhhQZ9Sbdxootd1L+Jzjnk0r70oIm/rLyNrH5x4Ddr7geA/FzBAqgY/0tc4hkCImBj9sX1wdX3TW6tMX+xwfn7KUicySz9hCPBAXCRGCkwq6OYlj4dv4+7OXrzHC21BxNJzDOvSwfEBMHX+oDK96HPesBimIaOH9EVtFm0lWi7S2kwwqbp+Y2OtUry8hbXtjkkk2tDtMq0ZnlO6pOvaUsTjBY6feiMjkREmDC+OBkuqeSW4vLoZYSKXPCE+mWJqsM/x6DK2RLa5wSRM5BVM5AcijrF3D5rxWIKQMsCEXclanwmmZPiV4tUgFucn2WCsw5i8havDCcsFJuFJuYZxPEffmIPjUSylrmnXRq0dCZ5pbP5eP11sI7xs9pJI3gI1Gpw7MjgxYOyrSCJY7plSfGls7LpxBvhvY43TR0Hb678cDwXmcu2BwTPrNzsYjgCrwCY0XgGNPTC4Z9SMpFzoP+dck8vqe/R4QfaeHxoY/31sJHFGGRqk+sKRweXGTQ/jzPvPDw3cs2zltj0UWEIuTw8NRsN/DgP+H7N336XO9W88AAAAAElFTkSuQmCC';

        let iconStyle = Object.assign({}, this.commonIconStyles);
        iconStyle.background = `url(${iconUrl}) center no-repeat / contain`;
        let activeIconStyle = Object.assign({}, this.commonIconStyles);
        activeIconStyle.background = `url(${activeIconUrl}) center no-repeat / contain`;

        return (
            <div>
                {this._renderAPIInput()}
                <div className="google-map-plugin-group" style={{display: "flex", marginTop: 15}}>
                    <div className="google-map-plugin-group-left" style={{width: "75%", position: "relative"}}>
                        <p className="novi-label" style={{"marginTop": "0"}}>
                            {this.messages.editor.mapSettingsBody.mapCenter}
                        </p>
                        <Input
                            key="center" id="novi-plugin-google-map-center-input" type="text"
                            onChange={this._handleInputChange.bind(this, "center")}
                            onFocus={this.addAutoCompleteToInput} value={this.state.center}
                            onBlur={this.hideAutoCompleteBox}
                        />
                        {this._renderAutocompleteList()}
                    </div>
                    <div className="google-map-plugin-group-right" style={{width: "25%", marginLeft: "15px"}}>
                        <p className="novi-label" style={{"marginTop": "0"}}>
                            {this.messages.editor.mapSettingsBody.zoom}
                        </p>
                        <InputNumber
                            min={0} max={18} onlyInteger={true} onChange={this._handleZoomChange}
                            value={this.state.zoom}
                        />
                    </div>
                </div>
                <p className="novi-label" style={{"marginTop": 15}}>
                    {this.messages.editor.mapSettingsBody.style}
                </p>
                <Select
                    searchable={false}
                    clearable={false}
                    options={this.styles} onChange={this._handleStyleChange}
                    value={this.state.style}
                />
                {this._renderCustomStyleField()}
                <div
                    className="google-map-plugin-group"
                    style={{"marginTop": 15, display: "flex", justifyContent: "space-between"}}
                >
                    <div
                        className="google-map-plugin-group-left"
                        style={{display: "flex", alignItems: "center", width: "50%"}}
                    >
                        <p className="novi-label" style={{"margin": "0", maxWidth: "70%"}}>
                            {this.messages.editor.mapSettingsBody.markerIcon}
                        </p>
                        <span key={this.iconKey} style={iconStyle} onClick={this.changeIcon.bind(this, "icon")}/>
                    </div>
                    <div
                        className="google-map-plugin-group-right"
                        style={{display: "flex", alignItems: "center", width: "50%"}}
                    >
                        <p className="novi-label" style={{"margin": "0", maxWidth: "70%"}}>
                            {this.messages.editor.mapSettingsBody.activeMarkerIcon}
                        </p>
                        <span
                            key={this.activeIconKey} style={activeIconStyle}
                            onClick={this.changeIcon.bind(this, "activeIcon")}
                        />
                    </div>
                </div>
            </div>
        )
    }

    _renderAPIInput(){
        let keySupported = this.state.element.keySupported !== undefined;

        return (
            <div style={{position: "relative"}}>
                <p className="novi-label" style={{marginTop: 0}}>
                    {this.messages.editor.mapSettingsBody.apiKey}
                </p>
                {!keySupported && this._renderInfoIcon()}
                <Input
                    key="center" id="novi-plugin-google-map-api-key-input" type="text" disabled={!keySupported}
                    title={""}
                    onChange={this._handleInputChange.bind(this, "key")}
                    value={this.state.key}
                />
            </div>
        )
    }

    _renderInfoIcon(){
        return (
            <div className={"novi-plugin-google-map-warning"}>
                <div className={"novi-plugin-google-map-warning-icon"} onClick={this.onInfoClick.bind(this)}>
                    <Icon>
                        {Icons.ICON_QUESTION_CIRCLE}
                    </Icon>
                </div>
                <div ref={(infoMessage) => this.infoMessage = infoMessage} className={"novi-plugin-google-map-warning-message"}>You need  update your Google Map initialization for use new feature. You can find it on
                    <a className="novi-plugin-google-map-warning-message-link" href="https://github.com/NoviBuilder/novi-plugin-google-map" target="_blank"> github</a></div>
            </div>
        )
    }

    onInfoClick(e){
        this.infoMessage.classList.toggle("active")
    }

    _renderAutocompleteList() {
        if (!this.state.autocomplete || !this.state.autocomplete.results) return null;

        return (
            <ul className={"google-map-plugin-autocomplete-list"}>
                {this._renderAutocompleteListItem()}
            </ul>
        )
    }

    _renderAutocompleteListItem() {
        return this.state.autocomplete.results.map(item => {
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
        if (e.target.tagName !== "LI"){
            while (li.tagName !== "LI"){
              li = li.parentElement;
            }
        }

        this.setState({
            center: li.querySelector(".google-map-plugin-autocomplete-description").innerHTML
        })
    }

    _showAutoComplete(input) {
        if (!input) return null;
        let value = input.value;
        if (value.length > 2){
            this.autoCompleteService.getQueryPredictions({input: value}, this._handleAutoCompleteData.bind(this, input));
        }
    }

    _handleAutoCompleteData(input, results) {
        this.setState({
            autocomplete: {
                input, results
            }
        })
    }

    addAutoCompleteToInput(e) {
        this._showAutoComplete(e.target);
    }

    hideAutoCompleteBox() {
        this.setState({
            autocomplete: null
        })
    }

    setBodyHeight(isCustom) {
        if (isCustom) {
            novi.editor.setBodyHeight(340);
        } else {
            novi.editor.setBodyHeight(284);
        }
    }

    _handleInputChange(property, e) {
        let newState = {};
        newState[property] = e.target.value;

        if (property === "customStyle"){
            let styles;
            try {
                styles = JSON.parse(e.target.value);
            }catch(e){
                styles = [];
            }

            if (this.state.element.map){
                this.state.element.map.setOptions({styles})
            }
        }

        this.setState(newState);
        if (property === "center"){
            this._showAutoComplete(e.target);
        }
    }

    _handleStyleChange(value) {
        if (value.value === "custom") {
            novi.editor.setBodyHeight(340);
        } else if (this.state.style.value === "custom") {
            novi.editor.setBodyHeight(284);
        }

        let styles;
        switch (value.value){
            case "custom":
                try {
                    styles = JSON.parse(this.state.customStyle);
                }catch(e){
                    styles = [];
                }
                break;
            case "default":
                styles = [];
                break;
            default:
                styles = JSON.parse(value.value);
                break;
        }

        if (this.state.element.map){
            this.state.element.map.setOptions({styles});
        }
        this.setState({style: value});
    }

    _handleZoomChange(value) {
        if (this.state.element.map) {
            this.state.element.map.setZoom(value);
        }
        this.setState({
            zoom: value
        })
    }

    _renderCustomStyleField() {
        if (this.state.style.value !== "custom") return null;
        return (<div className="google-map-plugin-group" style={{"marginTop": 15}}>
                <p className="novi-label" style={{"marginTop": "0"}}>
                    Custom Style:
                </p>
                <Input onChange={this._handleInputChange.bind(this, "customStyle")} value={this.state.customStyle}/>
            </div>
        )
    }

    changeIcon(stateProperty) {
        let src, imgSrc;
        src = this.state[stateProperty];
        if (src) {
            imgSrc = novi.utils.isRelativeURL(src) ? this.projectDir + src : src;

            this._loadImage(imgSrc).then(ratio => {
                novi.media.choose({onSubmit: this.onSubmit.bind(this, stateProperty), ratio, type: Types.mediaImage})
            })
        } else {
            novi.media.choose({onSubmit: this.onSubmit.bind(this, stateProperty), ratio: 1, type: Types.mediaImage})
        }
    }

    onSubmit(stateProperty, path) {
        let newState = {};
        newState[stateProperty] = path;
        this[stateProperty + "Key"] = new Date().getTime();
        this.setState(newState);
    }

    _loadImage(src) {
        return new Promise((resolve, reject) => {
                let img = new Image();
                img.src = src;
                img.onload = function (e) {
                    let img = e.target;
                    let width = img.naturalWidth,
                        height = img.naturalHeight;
                    let ratio = width / height;
                    resolve(ratio);
                };
            }
        )
    }
}