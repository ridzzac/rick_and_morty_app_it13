/**
 * @deprecated use the static `Entity.TYPE` values from fetchAPI.js
 */
export const ENTITY_TYPE = Object.freeze({
    CHARACTER: 0,
    LOCATION: 1,
    EPISODE: 2
});

/**
 * The name of an EntityType.
 * ENTITY_TYPE.CHARACTER -> "Character"
 * ENTITY_TYPE.Location -> "Location"
 * ENTITY_TYPE.EPISODE -> "Episode"
 * 
 * @deprecated use `Entity.getEntityName()` from fetchAPI.js
 */
export const ENTITY_TYPE_NAME = Object.freeze([
    "Character", "Location", "Episode"
]);

/**
 * @deprecated use `Entity.getEntityName()` from fetchAPI.js
 */
export function getName(entityType){
    return ["Character", "Location", "Episode"][entityType];
}

const ENTITY_TYPE_KEY = Object.freeze({
    ID: "id",
    NAME: "name",
    URL: "url",
    STATUS: "status",
    SPECIES: "species",
    TYPE: "type",
    GENDER: "gender",
    ORIGIN: "origin",
    LOCATION: "location",
    IMAGE: "image",
    EPISODE: "episode",
    DIMENSION: "dimension",
    RESIDENTS: "residents",
    AIR_DATE: "air_date",
    CHARACTERS: "characters"
});

/**
 * @deprecated use the `Entity` class from fetchAPI.js
 */
export class Character {
    id;
    name;
    status;
    species;
    type;
    gender;
    origin;
    location;
    image;
    episodes;
    url;

    constructor(id, name, status, species, type, gender, origin, location, image, episodes, url) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
        this.episodes = episodes;
        this.url = url;
    }

    /**
     * Creates and returns a Character object using the specified object.
     * @deprecated use `Entity.createCharacter()` or `Entity.createCharacterFromJSON()` from fetchAPI.js
     */
    static create(object) {
        return new Character(
            object[ENTITY_TYPE_KEY.ID],
            object[ENTITY_TYPE_KEY.NAME],
            object[ENTITY_TYPE_KEY.STATUS],
            object[ENTITY_TYPE_KEY.SPECIES],
            object[ENTITY_TYPE_KEY.TYPE],
            object[ENTITY_TYPE_KEY.GENDER],
            object[ENTITY_TYPE_KEY.ORIGIN],
            object[ENTITY_TYPE_KEY.LOCATION],
            object[ENTITY_TYPE_KEY.IMAGE],
            object[ENTITY_TYPE_KEY.EPISODE],
            object[ENTITY_TYPE_KEY.URL]
        );
    }
};

/**
 * @deprecated use the Entity class from fetchAPI.js
 */
export class Location {
    id;
    name;
    type;
    dimension;
    residents;
    url;

    constructor(id, name, type, dimension, residents, url) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.dimension = dimension;
        this.residents = residents;
        this.url = url;
    }

    /**
     * Creates and returns a Location object using the specified object.
     * @deprecated use `Entity.createLocation()` or `Entity.createLocationFromJSON()` from fetchAPI.js
     */
    static create(object) {
        return new Location(
            object[ENTITY_TYPE_KEY.ID],
            object[ENTITY_TYPE_KEY.NAME],
            object[ENTITY_TYPE_KEY.TYPE],
            object[ENTITY_TYPE_KEY.DIMENSION],
            object[ENTITY_TYPE_KEY.RESIDENTS],
            object[ENTITY_TYPE_KEY.URL]
        );
    }
};

/**
 * @deprecated use the Entity class from fetchAPI.js
 */
export class Episode {
    id;
    name;
    air_date;
    episode;
    characters;
    url;

    constructor(id, name, air_date, episode, characters, url) {
        this.id = id;
        this.name = name;
        this.air_date = air_date;
        this.episode = episode;
        this.characters = characters;
        this.url = url;
    }

    /**
     * Creates and returns an Episode object using the specified object.
     * @deprecated use `Entity.createEpisode()` or `Entity.createEpisodeFromJSON()` from fetchAPI.js
     */
    static create(object){
        return new Episode(
            object[ENTITY_TYPE_KEY.ID],
            object[ENTITY_TYPE_KEY.NAME],
            object[ENTITY_TYPE_KEY.AIR_DATE],
            object[ENTITY_TYPE_KEY.EPISODE],
            object[ENTITY_TYPE_KEY.CHARACTERS],
            object[ENTITY_TYPE_KEY.URL]
        );
    }
};

/**
 * Returns the factory function of a specified EntityType.
 * @param {ENTITY_TYPE} entityType 
 * @deprecated use `getFactory()` or `getFactoryUsingJSON()` from fetchAPI.js
 */
export function getEntityFactory(entityType) {
    switch (entityType) {
        case ENTITY_TYPE.CHARACTER:
            return Character.create;
        case ENTITY_TYPE.LOCATION:
            return Location.create;
        case ENTITY_TYPE.EPISODE:
            return Episode.create;
        default:
            throw new Error("Unknown EntityType to get its factory function.");
    }
}