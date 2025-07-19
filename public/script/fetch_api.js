import { getEntityFactory, ENTITY_TYPE_NAME } from "./entity_type.js";
import { ENTITY_TYPE } from "./entity_type.js";

// w! BELOW ARE OLD CODE. IT WILL BE DELETED!                             
// w! Replace these deprecated functions with new ones from fetchAPI.js   
// w!                                                                     
// w! fetchCharactersFromPage() -> getCharactersFromPage()                
// w! fetchLocationsFromPage() -> getLocationsFromPage()                  
// w! fetchEpisodesFromPage() -> getEpisodesFromPage                      
// w!                                                                     
// w! fetchAllCharacters() -> getAllCharacters()                          
// w! fetchAllLocations() -> getAllLocations()                            
// w! fetchAllEntities() -> getAllEntities()                              
// w!                                                                     
// w! fetchEntitiesFromPage() -> use the appropriate function             

const ENTITY_API_URL = Object.freeze({
    CHARACTER: "https://rickandmortyapi.com/api/character",
    LOCATION: "https://rickandmortyapi.com/api/location",
    EPISODE: "https://rickandmortyapi.com/api/episode"
});

const API_KEY = Object.freeze({
    RESULTS: "results",
    INFO: "info"
});

const DEFAULT_ENTITY_COUNTS = Object.freeze([
    826, 126, 51
]);

const DEFAULT_ENTITY_PAGES = Object.freeze([
    42, 7, 3
]);

let isOnline = false;

const maxEntityCounts = [null, null, null];
const maxEntityPages = [null, null, null];

async function setMaxEntityPagesValue(entity_type, pageValue) {
    maxEntityPages[entity_type] = pageValue;
}

async function setMaxEntityCountValue(entity_type, countValue) {
    maxEntityCounts[entity_type] = countValue;
}

async function getEntityPageValue(entity_type) {
    let value = maxEntityPages[entity_type];
    if (value == null)
        throw new Error(`The pages value of ${ENTITY_TYPE_NAME[entity_type]} is still not set.`)
    return value;
}

async function getEntityCountValue(entity_type) {
    let value = maxEntityPages[entity_type];
    if (value == null)
        throw new Error(`The count value of ${ENTITY_TYPE_NAME[entity_type]} is still not set.`)
    return value;
}

export async function setMaxEntityTypeInfo() {
    Object.values(ENTITY_TYPE).forEach(async entityType => {
        console.log(entityType);
        let info = await fetchEntityTypeInfo(entityType);
        setMaxEntityCountValue(entityType, info.count);
        console.log("count: " + getEntityCountValue(entityType));
        setMaxEntityPagesValue(entityType, info.pages);

    });
    console.log("Finished Setting");
}

function getEntityTypeURL(entityType) {
    switch (entityType) {
        case ENTITY_TYPE.CHARACTER:
            return ENTITY_API_URL.CHARACTER;
        case ENTITY_TYPE.LOCATION:
            return ENTITY_API_URL.LOCATION
        case ENTITY_TYPE.EPISODE:
            return ENTITY_API_URL.EPISODE;
        default:
            throw new Error("Unknown EntityType to get its URL");
    }
}

async function fetchEntityTypeInfo(entity_type) {
    let response = await fetch(getEntityTypeURL(entity_type));
    let info = { count: 0, pages: 0 };
    console.log("Response: " + response.ok)
    if (response.ok) {
        let data = await response.json();
        info.count = data[API_KEY.INFO].count;
        console.log(info.count);
        info.pages = data[API_KEY.INFO].pages;
        console.log(`info ${info}`);
    }
    else {
        alert(`Failed to fetch max page and count of ${ENTITY_TYPE_NAME[entity_type]}. Using the default values.`);
        info.count = DEFAULT_ENTITY_COUNTS[entity_type];
        info.pages = DEFAULT_ENTITY_PAGES[entity_type];
        console.log(`info ${info}`);
    }

    return info;
}

async function fetchAPI(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throwFetchResponseError("", response);
        }
        return response.json();
    }
    catch (error) {
        throw error;
    }
}

/**
 * Returns an array of Character objects from a specified page number.
 * @deprecated use `getCharactersFromPage()` from fetchAPI.js
 */
export async function fetchCharactersFromPage(pageNumber) {
    return fetchEntitiesFromPage(pageNumber, ENTITY_TYPE.CHARACTER);
}

/**
 * Returns an array of Location objects from a specified page number.
 * @deprecated use `getLocationsFromPage()` from fetchAPI.js
 * 
 */
export async function fetchLocationsFromPage(pageNumber) {
    return fetchEntitiesFromPage(pageNumber, ENTITY_TYPE.LOCATION);
}

/**
 * Returns an array of Episode objects from a specified page number.
 * @deprecated use `getEpisodesFromPage()` from fetchAPI.js
 */
export async function fetchEpisodesFromPage(pageNumber) {
    return fetchEntitiesFromPage(pageNumber, ENTITY_TYPE.EPISODE);
}

/** 
 * @deprecated use `getAllCharacters()` from fetchAPI.js
 */
export async function fetchAllCharacters() {
    return await fetchAllEntities(fetchCharactersFromPage, getEntityPageValue(ENTITY_TYPE.CHARACTER));
}

/**
 * @deprecated use `getAllLocations()` from fetchAPI.js
 */
export async function fetchAllLocations() {
    return await fetchAllEntities(fetchLocationsFromPage, getEntityPageValue(ENTITY_TYPE.LOCATION));
}

/**
 * @deprecated this function will be deleted
 */
export async function fetchAllEntities(func, maxPage) {
    let entities = [];
    console.log("max page: " + maxPage);
    for (let pageNumber = 1; pageNumber <= maxPage; ++pageNumber) {
        func(pageNumber)
            .then(arr => {
                console.log(`page ${pageNumber} is ${arr.length}`)
                entities = entities.concat(arr);
            })
    }
    return entities;
}

/**
 * Returns an array of specified EntityType objects from a specified page number.
 * @deprecated this function will be deleted.
 */
export async function fetchEntitiesFromPage(pageNumber, entityType) {
    try {
        let url = getEntityTypeURL(entityType);
        const data = await fetchAPI(getPageOfEntityTypeURL(url, pageNumber));
        const result = data[API_KEY.RESULTS];
        let output = [];
        let createEntity = getEntityFactory(entityType);
        for (let i = 0; i < result.length; ++i) {
            let ch = result[i];
            output.push(createEntity(ch));
        }
        return output;
    }
    catch (error) {
        throw error;
    }
}

function getPageOfEntityTypeURL(url, n) {
    return `${url}?page=${n}`;
}

function throwFetchResponseError(msg, response) {
    throw new Error(`HTTP Fetch Error: status: ${response.status}; message: ${msg}`);
}

// w! ABOVE ARE OLD CODE. IT WILL BE DELETED!                             
// w! Replace these deprecated functions with new ones from fetchAPI.js   
// w!                                                                     
// w! fetchCharactersFromPage() -> getCharactersFromPage()                
// w! fetchLocationsFromPage() -> getLocationsFromPage()                  
// w! fetchEpisodesFromPage() -> getEpisodesFromPage                      
// w!                                                                     
// w! fetchAllCharacters() -> getAllCharacters()                          
// w! fetchAllLocations() -> getAllLocations()                            
// w! fetchAllEntities() -> getAllEntities()                              
// w!                                                                     
// w! fetchEntitiesFromPage() -> use the appropriate function             