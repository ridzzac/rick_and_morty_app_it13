import { Entity } from "./entity.js";
import { InvalidPageNumber } from "./errors.js";

const ENTITY_TYPE_URL_KEY = Object.freeze({
    RESULTS: "results",
    INFO: "info"
});

const CHARACTER_TYPE = Entity.TYPE.CHARACTER;
const LOCATION_TYPE = Entity.TYPE.LOCATION;
const EPISODE_TYPE = Entity.TYPE.EPISODE;

const maxEntityCount = [null, null, null];
const maxEntityPage = [null, null, null];

const MINIMUM_PAGE_NUMBER = 1;

const DEFAULT_CHARACTER_COUNT = 826;
const DEFAULT_CHARACTER_PAGES = 42;

const DEFAULT_LOCATION_COUNT = 126;
const DEFAULT_LOCATION_PAGES = 7;

const DEFAULT_EPISODE_COUNT = 51;
const DEFAULT_EPISODE_PAGES = 3;

const DEFAULT_SEASON_01_START_PAGE = 1;
const DEFAULT_SEASON_01_EPISODE_01_ID = 1;
const DEFAULT_SEASON_01_EPISODE_COUNT = 11;

const DEFAULT_SEASON_02_START_PAGE = 1;
const DEFAULT_SEASON_02_EPISODE_01_ID = 12;
const DEFAULT_SEASON_02_EPISODE_COUNT = 10;

const DEFAULT_SEASON_03_START_PAGE = 2;
const DEFAULT_SEASON_03_EPISODE_01_ID = 22;
const DEFAULT_SEASON_03_EPISODE_COUNT = 10;

const DEFAULT_SEASON_04_START_PAGE = 2;
const DEFAULT_SEASON_04_EPISODE_01_ID = 32;
const DEFAULT_SEASON_04_EPISODE_COUNT = 10;

const DEFAULT_SEASON_05_START_PAGE = 3;
const DEFAULT_SEASON_05_EPISODE_01_ID = 42;
const DEFAULT_SEASON_05_EPISODE_COUNT = 10;

const characterTypeInfo = {
    count: DEFAULT_CHARACTER_COUNT,
    pages: DEFAULT_CHARACTER_PAGES
};

const locationTypeInfo = {
    count: DEFAULT_LOCATION_COUNT,
    pages: DEFAULT_LOCATION_PAGES
};

/**
 * @deprecated making a new one
 */
const episodeTypeInfo = {
    count: DEFAULT_EPISODE_COUNT,
    pages: DEFAULT_EPISODE_PAGES,
    seasonStartPages: [
        DEFAULT_SEASON_01_START_PAGE,
        DEFAULT_SEASON_02_START_PAGE,
        DEFAULT_SEASON_03_START_PAGE,
        DEFAULT_SEASON_04_START_PAGE,
        DEFAULT_SEASON_05_START_PAGE
    ],
    episode01IDs: [
        DEFAULT_SEASON_01_EPISODE_01_ID,
        DEFAULT_SEASON_02_EPISODE_01_ID,
        DEFAULT_SEASON_03_EPISODE_01_ID,
        DEFAULT_SEASON_04_EPISODE_01_ID,
        DEFAULT_SEASON_05_EPISODE_01_ID
    ]
};

const episodeTypeInfo_test = {
    count: DEFAULT_EPISODE_COUNT,
    pages: DEFAULT_CHARACTER_PAGES,
    seasonInfo: [
        {
            startPage: DEFAULT_SEASON_01_START_PAGE,
            episode01ID: DEFAULT_SEASON_01_EPISODE_01_ID,
            episodeCount: DEFAULT_SEASON_01_EPISODE_COUNT
        },
        {
            startPage: DEFAULT_SEASON_02_START_PAGE,
            episode01ID: DEFAULT_SEASON_02_EPISODE_01_ID,
            episodeCount: DEFAULT_SEASON_02_EPISODE_COUNT
        },
        {
            startPage: DEFAULT_SEASON_03_START_PAGE,
            episode01ID: DEFAULT_SEASON_03_EPISODE_01_ID,
            episodeCount: DEFAULT_SEASON_03_EPISODE_COUNT
        },
        {
            startPage: DEFAULT_SEASON_04_START_PAGE,
            episode01ID: DEFAULT_SEASON_04_EPISODE_01_ID,
            episodeCount: DEFAULT_SEASON_04_EPISODE_COUNT
        },
        {
            startPage: DEFAULT_SEASON_05_START_PAGE,
            episode01ID: DEFAULT_SEASON_05_EPISODE_01_ID,
            episodeCount: DEFAULT_SEASON_05_EPISODE_COUNT
        }
    ]
}

function getURLWithPageNumber(url, pageNumber) {
    return `${url}?page=${pageNumber}`;
}

function setMaxEntityCount(entityType, value) {
    throwIfNotEntity(entityType);
    maxEntityCount[entityType] = value;
}

function getMaxEntityCount(entityType) {
    throwIfNotEntity(entityType);
    let value = maxEntityCount[entityType];
    if (value === null)
        throw new Error(`The total count for ${getName(entityType)} is not set.`)
    return value;
}

function getMaxEntityPage(entityType) {
    throwIfNotEntity(entityType);
    let value = maxEntityPage[entityType];
    if (value === null)
        throw new Error(`The total pages for ${getName(entityType)} is not set.`)
    return value;
}

/**
 * @deprecated still working on it
 */
async function fetchSeasonsInfo() {
    const URL = Entity.getURL(EPISODE_TYPE);
    const output = [];
    const errors = [];
    let currentSeason;
    let episodeCount = 0;
    for(let pageNumber = 1; pageNumber <= episodeTypeInfo_test.pages; ++pageNumber){
        let urlPage = getURLWithPageNumber(URL , pageNumber);
        await fetch(urlPage)
        .then(response => response.json())
        .then(data => {
            let result = data[ENTITY_TYPE_URL_KEY.RESULTS];
            for(let i = 0; i < result.length; ++i){
                ++episodeCount;
                let episodeObj = result[i];
                currentSeason = episodeObj.episode.slice(1,3);
                let id = episodeObj.id;
            }
        });
    }


    return {output, errors};
}

async function fetchInfoEntityType(entityType) {
    let url = Entity.getURL(entityType);
    let response = await fetch(url);
    if (!response.ok)
        throw new Error(`Failed to fetch ${url}`);
    let data = await response.json();
    let info;
    switch (entityType) {
        case CHARACTER_TYPE:
            info = characterTypeInfo;
            break;
        case LOCATION_TYPE:
            info = locationTypeInfo;
            break;
        case EPISODE_TYPE:
            info = episodeTypeInfo_test;
            break;
    }
    info.count = data[ENTITY_TYPE_URL_KEY.INFO].count;
    info.pages = data[ENTITY_TYPE_URL_KEY.INFO].pages;
}

async function fetchEntitiesAsArrayFromPage(entityType, pageNumber) {
    console.log(`fetchEntitiesAsArrayFromPage: pageNumber: ${pageNumber}`)
    let url = getURLWithPageNumber(Entity.getURL(entityType), pageNumber);
    let output = [];
    let response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`);
    }
    let data = await response.json();
    let result = data[ENTITY_TYPE_URL_KEY.RESULTS];
    let create = Entity.getFactoryUsingJSON(entityType);
    for (let i = 0; i < result.length; ++i) {
        output.push(create(result[i]));
    }
    return output;
}

async function getAllOfEntityType(entityType) {
    const URL = Entity.getURL(entityType);
    let info;
    switch (entityType) {
        case CHARACTER_TYPE:
            info = characterTypeInfo;
            break;
        case LOCATION_TYPE:
            info = locationTypeInfo;
            break;
        case EPISODE_TYPE:
            info = episodeTypeInfo_test;
            break;
    }
    const pages = info.pages;
    const urlPages = [];
    for (let i = 1; i <= pages; ++i) {
        urlPages.push(getURLWithPageNumber(URL, i));
    }

    const output = [];
    const errors = [];
    for (const urlPage of urlPages) {
        try {
            const response = await fetch(urlPage);
            if (!response.ok)
                throw new Error(`Failed at ${urlPage}: HTTP ${response.status}`);
            const data = await response.json();
            const result = data[ENTITY_TYPE_URL_KEY.RESULTS];
            for (let i = 0; i < result.length; ++i) {
                output.push(result[i]);
            }
        }
        catch (error) {
            break;
        }
    }
    return { output: output, errors: errors };
}

function throwIfInvalidPage(entityType, inputPageNumber, minPageNumber, maxPageNumber) {
    let isInvalid = false;
    switch (entityType) {
        case CHARACTER_TYPE:
            if (inputPageNumber < 1 || inputPageNumber > characterTypeInfo.pages)
                isInvalid = true;
            break;
        case LOCATION_TYPE:
            if (inputPageNumber < 1 || inputPageNumber > locationTypeInfo.pages)
                isInvalid = true;
            break;
        case EPISODE_TYPE:
            if (inputPageNumber < 1 || inputPageNumber > episodeTypeInfo_test.pages)
                isInvalid = true;
            break;

    }
    if (isInvalid)
        throw new InvalidPageNumber(inputPageNumber, minPageNumber, maxPageNumber, `The page number for ${Entity.getEntityName(entityType)} is invalid`);
}

function throwIfNotEntity(entityType, msg = "Not an Entity") {
    if (!Entity.isType(entityType))
        throw new Error(msg);
}


// public

/**
 * Updates the character count and the number of pages.
 */
export async function updateCharacterCountAndPages() {
    await fetchInfoEntityType(CHARACTER_TYPE);
}

/**
 * Updates the location count and the number of pages.
 */
export async function updateLocationCountAndPages() {
    await fetchInfoEntityType(LOCATION_TYPE);
}

/**
 * Updates the episode count and the number of pages.
 */
export async function updateEpisodeCountAndPages() {
    await fetchInfoEntityType(EPISODE_TYPE);
}

/**
 * Returns a Promise of Entity Array of Characters from a specified page number.
 * @param {number} pageNumber 
 * @returns {Promise<Entity[]>}
 * @throws {Error}
 */
export function getCharactersFromPage(pageNumber) {
    throwIfInvalidPage(CHARACTER_TYPE, pageNumber, MINIMUM_PAGE_NUMBER, characterTypeInfo.pages);
    return fetchEntitiesAsArrayFromPage(CHARACTER_TYPE, pageNumber);
}

/**
 * Returns a Promise of Entity Array of Locations from a specified page number.
 * @param {number} pageNumber 
 * @returns {Promise<Entity[]>}
 * @throws {Error}
 */
export function getLocationsFromPage(pageNumber) {
    throwIfInvalidPage(LOCATION_TYPE, pageNumber, MINIMUM_PAGE_NUMBER, locationTypeInfo.pages);
    return fetchEntitiesAsArrayFromPage(LOCATION_TYPE, pageNumber);
}

/**
 * Returns a Promise of Entity Array of Episodes from a specified page number.
 * @param {number} pageNumber 
 * @returns {Promise<Entity[]>}
 * @throws {Error}
 */
export function getEpisodesFromPage(pageNumber) {
    throwIfInvalidPage(EPISODE_TYPE, pageNumber, MINIMUM_PAGE_NUMBER, episodeTypeInfo_test.pages);
    return fetchEntitiesAsArrayFromPage(EPISODE_TYPE, pageNumber);
}

export function getAllCharacterImages() {
    let output = [];
    let URL = Entity.getURL(CHARACTER_TYPE);
}

export function getAllCharacters() {
    return getAllOfEntityType(CHARACTER_TYPE);
}

export function getAllLocations() {
    return getAllOfEntityType(LOCATION_TYPE);
}

export function getAllEpisodes() {
    return getAllOfEntityType(EPISODE_TYPE);
}

/**
 * Returns an array of episodes from a specified season.
 * @deprecated Not ready for use
 * @experimental Still working on it
 */
export async function getAllEpisodesFromSeason(seasonNumber) {
    console.warn("WARNING: This function is experimental! Not ready for use!");
    let pageNumber = episodeTypeInfo.seasonStartPages[seasonNumber - 1];
    let episode01ID = episodeTypeInfo.episode01IDs[seasonNumber - 1];
    let output = [];
    let started = false;
    let done = false;

    console.log({ pageNumber, episode01ID });
    while (true) {
        let url = getURLWithPageNumber(Entity.getURL(EPISODE_TYPE), pageNumber);
        console.log({ url, output });
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                const result = data[ENTITY_TYPE_URL_KEY.RESULTS];
                for (let i = 0; i < result.length; ++i) {
                    let episode = result[i];
                    if (episode.id < episode01ID)
                        continue;
                    if (episode.id == 1) {
                        if (started === true)
                            break;
                        started = true;
                        done = true;
                    }
                    output.push(episode);
                }
            });
        if (done === true)
            break;
        ++pageNumber;
    }
    return output;
}

export async function getAllEpisodesBySeason() {
    let seasons = {};
    await getAllEpisodes()
        .then(data => {
            let currentSeason;
            const episodes = data.output;
            episodes.forEach((episode, i) => {
                const extractedSeason = episode.episode.slice(0, 3);
                if (currentSeason !== extractedSeason.slice(0, 3)) {
                    currentSeason = extractedSeason;
                    seasons[currentSeason] = [];
                }
                seasons[currentSeason].push(episode);
            });
        });
    return seasons;
}

await fetchSeasonsInfo()
console.log(episodeTypeInfo_test);