

export const TRUE = "true";
export const FALSE = "false";

export const LOCAL_STORAGE = 0;
export const SESSION_STORAGE = 1;

export const STORAGE_KEY = Object.freeze({
    CACHE_CHARACTER_COUNT: "RickAndMortyWikiCharacterCount",
    CACHE_CHARACTER_PAGE: "RickAndMortyWikiCharacterPage",
    CACHE_LOCATION_COUNT: "RickAndMortyWikiLocationCount",
    CACHE_LOCATION_PAGE: "RickAndMortyWikiLocationPage",
    CACHE_EPISODE_COUNT: "RickAndMortyWikiEpisodeCount",
    CACHE_EPISODE_PAGE: "RickAndMortyWikiEpisodePage",
    CACHE_FAVORITE_CHARACTERS: "RickAndMortyWikiFavoriteCharacters",
    CACHE_FAVORITE_LOCATIONS: "RickAndMortyWikiFavoriteLocations",
    CACHE_FAVORITE_EPISODES: "RickAndMortyWikiFavoriteEpisodes",

    /**
     * If this is true, then the app will use the values that has been fetched previously.
     * If this is false, then the app will use default values for some of the keys in the storage.
     */
    APP_IS_USED: "RickAndMortyWikiAppIsUsed"
});

export const DEFAULT_STORAGE_KEY_VALUE = Object.freeze({
    CHARACTER_COUNT: 826,
    CHARACTER_PAGE: 42,
    LOCATION_COUNT: 126,
    LOCATION_PAGE: 7,
    EPISODE_COUNT: 51,
    EPISODE_PAGE: 3,
    FAVORITE_CHARACTERS: [],
    FAVORITE_LOCATIONS: [],
    FAVORITE_EPISODES: [],
    DARK_MODE: [],
    APP_IS_USED: false
});

export function setStorageKeys(){
    if(!containsLocalStorageKey(STORAGE_KEY.APP_IS_USED))
        localStorage.setItem(STORAGE_KEY.APP_IS_USED, DEFAULT_STORAGE_KEY_VALUE.APP_IS_USED);
    
}

function containsLocalStorageKey(key) {
    return containsStorageItem(key, LOCAL_STORAGE);
}

function containsSessionStorageKey(key) {
    return containsSessionStorageKey(key, SESSION_STORAGE);
}

function isStorageItemArray(key, storage){
    if(!containsStorageItem(key, storage))
        return false;
    return 
}

function containsStorageItem(key, storage){
    if(storage === LOCAL_STORAGE)
        return localStorage.getItem(key) !== null;
    else if(storage === SESSION_STORAGE)
        return sessionStorage.getItem(key) !== null;
    else{
        throw new Error("Unknown identifier for storage item retrieval.")
    }
}

