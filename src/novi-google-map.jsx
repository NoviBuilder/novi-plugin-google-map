import MapSettingsEditorItem from "./MapSettingsEditorItem";
import MarkersSettingsEditorItem from "./MarkersSettingsEditorItem";
const React = novi.react.React;
import Settings from "./Settings";
const Language = novi.language;
const Plugin = {
    name: "novi-plugin-google-map",
    title: "Novi Google Map",
    description: "Novi Google Map description",
    version: "1.0.1",
    dependencies: {
        "novi": "0.8.6"
    },
    defaults: {
        querySelector: ".google-map-container"
    },
    ui: {
        editor: [MapSettingsEditorItem, MarkersSettingsEditorItem],
        settings: <Settings />,
    },
    onLanguageChange: onLanguageChange
};

function onLanguageChange(plugin){
    let messages = Language.getDataByKey("novi-plugin-google-map");
    plugin.ui.editor[0].title = messages.editor.mapSettingsTitle;
    plugin.ui.editor[0].tooltip = messages.editor.mapSettingsTooltip;
    plugin.ui.editor[0].header = <span>{messages.editor.mapSettingsHeader}</span>;
    plugin.ui.editor[1].title = messages.editor.markerSettingsTitle;
    plugin.ui.editor[1].tooltip = messages.editor.markerSettingsTooltip;
    plugin.ui.editor[1].header = <span>{messages.editor.markerSettingsHeader}</span>;
    return plugin;
}

novi.plugins.register(Plugin);
