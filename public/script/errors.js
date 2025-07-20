import { Entity } from "./entity.js";

/**
 * @description An exception for page numbers not within range.
 */
export class InvalidPageNumberError extends RangeError{
    constructor(inputNumber, minNumber, maxNumber, msg) {
        super(msg, {cause: `Page number ${inputNumber} is not within the range of ${minNumber} to ${maxNumber}`});
        this.name = "InvalidPageNumber";
    }
};

export class InvalidIdError extends Error {
    constructor(id, entityType, msg){
        super(msg, {case: `No ${Entity.getEntityName(entityType)} with an id of ${id} that exists`});
        this.name = "InvalidIdError";
    }
}