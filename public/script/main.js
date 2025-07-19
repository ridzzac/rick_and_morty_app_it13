import { setStorageKeys } from "./storage.js";
import { setMaxEntityTypeInfo } from "./fetch_api.js";

const APP_TITLE = "Rick and Morty Wiki";

// EntityData
let selectedCharacterData;
let selectedLocationData;
let selectedEpisodeData;

document.addEventListener("DOMContentLoaded", e => {
    setMaxEntityTypeInfo();
    setStorageKeys();
});