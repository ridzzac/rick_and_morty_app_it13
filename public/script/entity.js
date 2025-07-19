/**
 * @private A token not for public use.
 */
const ___p_c_t = Symbol("_private_constructor_token");

export class Entity {
    id;
    name;
    url;
    status;
    species;
    type;
    gender;
    origin;
    location;
    image;
    episode;
    dimension;
    residents;
    air_date;
    characters;
    #entityType;

    constructor(token, entityType, id, name, url, status, species,
        type, gender, origin, location, image, episode,
        dimension, residents, air_date, characters) {
        if (token !== ___p_c_t)
            throw new Error("The constructor for Entity is not for public use. Please use the static factory methods.");
        this.entityType = entityType;
        this.id = id;
        this.name = name;
        this.url = url;
        this.status = status;
        this.species = species;
        this.type = type;
        this.gender = gender;
        this.origin = origin;
        this.location = location;
        this.image = image;
        this.episode = episode;
        this.dimension = dimension;
        this.residents = residents;
        this.air_date = air_date;
        this.characters = characters;
    }

    getEntityType() {
        return this.#entityType;
    }

    static TYPE = Object.freeze({
        CHARACTER: 0,
        LOCATION: 1,
        EPISODE: 2
    });

    static isType(entityType){
        return Object.values(Entity.TYPE).includes(entityType);
    }

    static createCharacter(id, name, status, species, type, gender, origin, location, image, episode, url) {
        return new Entity(___p_c_t, Entity.TYPE.CHARACTER, id, name, url, status, species, type, gender, origin, location, image, episode, null, null, null, null);
    }

    static createLocation(id, name, type, dimension, residents, url) {
        return new Entity(___p_c_t, Entity.TYPE.LOCATION, id,name, url, null, null, type, null, null, null, null, null, dimension, residents, null, null);
    }

    static createEpisode(id, name, air_date, episode, characters, url) {
        return new Entity(___p_c_t, Entity.TYPE.EPISODE, id, name, url, null, null, null, null, null, null, null, episode, null, null, air_date, characters);
    }

    static createCharacterFromJSON(json){
        return Entity.createCharacter(
            json.id,
            json.name,
            json.status,
            json.species,
            json.type,
            json.gender,
            json.origin,
            json.location,
            json.image,
            json.episode,
            json.url
        );
    }

    static createLocationFromJSON(json){
        return Entity.createLocation(
            json.id,
            json.name,
            json.type,
            json.dimension,
            json.residents,
            json.url
        );
    }

    static createEpisodeFromJSON(json){
        return Entity.createEpisode(
            json.id,
            json.name,
            json.air_date,
            json.episode,
            json.characters,
            json.url
        );
    }

    static getFactory(entityType){
        switch(entityType){
            case Entity.TYPE.CHARACTER:
                return Entity.createCharacter;
            case Entity.TYPE.LOCATION:
                return Entity.createLocation;
            case Entity.TYPE.EPISODE:
                return Entity.createEpisode;
            default:
                throw new Error(`No Entity is of type ${entityType}`);
        }
    }

    static getFactoryUsingJSON(entityType){
        switch(entityType){
            case Entity.TYPE.CHARACTER:
                return Entity.createCharacterFromJSON;
            case Entity.TYPE.LOCATION:
                return Entity.createLocationFromJSON;
            case Entity.TYPE.EPISODE:
                return Entity.createEpisodeFromJSON;
            default:
                throw new Error(`No Entity is of type ${entityType}`);
        }
    }

    static getURL(entityType){
        switch(entityType){
            case Entity.TYPE.CHARACTER:
                return "https://rickandmortyapi.com/api/character";
            case Entity.TYPE.LOCATION:
                return "https://rickandmortyapi.com/api/location"
            case Entity.TYPE.EPISODE:
                return "https://rickandmortyapi.com/api/episode";
            default:
                throw new Error(`No Entity is of type ${entityType}`);
        }
    }

    static getEntityName(entityType){
        switch(entityType){
            case Entity.TYPE.CHARACTER:
                return "Character";
            case Entity.TYPE.LOCATION:
                return "Location";
            case Entity.TYPE.EPISODE:
                return "Episode";
            default:
                return "unknown_entity_name";
        }
    }
}