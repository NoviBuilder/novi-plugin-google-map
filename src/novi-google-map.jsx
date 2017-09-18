import MapSettingsEditorItem from "./MapSettingsEditorItem";
import MarkersSettingsEditorItem from "./MarkersSettingsEditorItem";
const React = novi.react.React;
import Settings from "./Settings";

const Plugin = {
    name: "novi-plugin-google-map",
    title: "Novi Google Map",
    description: "Novi Google Map description",
    version: "1.0.0",
    dependencies: {
        "novi": "0.8.5"
    },
    defaults: {
        querySelector: ".google-map-container"
    },
    ui: {
        editor: [MapSettingsEditorItem, MarkersSettingsEditorItem],
        settings: <Settings />,
    }
};

novi.plugins.register(Plugin);
