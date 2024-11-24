import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {InvalidStateException} from "../common/InvalidStateException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if(delimiter.length > 1){
            throw new IllegalArgumentException("Delimiter not a char");
        }
        this.delimiter = delimiter;

        if(this.delimiter != delimiter){
            throw new InvalidStateException("Delimiter nicht gesetzt");
        }
    }

    public clone(): Name {

        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        var yeet: Name = this;
        if(delimiter.length > 1){
            throw new IllegalArgumentException("Delimiter not a char");
        }
        let sol = "";
        for(let i = 0; i < this.getNoComponents(); i++){
            sol+= this.getComponent(i);
            sol += delimiter;
        }
        if(sol.length > 0){
            sol = sol.substring(0, sol.length-1);
        }

        if (this != yeet){
            throw new InvalidStateException("something went wrong");
        }

        return sol;

    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        var yeet: Name = this;
        let sol = ""
        for(let i = 0; i < this.getNoComponents(); i++){
            sol+= this.getComponent(i);
            sol += "#";
        }
        if(sol.length > 0){
            sol = sol.substring(0, sol.length-1);
        }
        if (this != yeet){
            throw new InvalidStateException("something went wrong");
        }
        return sol;
    }

    public isEqual(other: Name): boolean {
        if(other == undefined){
            throw new IllegalArgumentException("other does not exist");
        }
        return this.asString() == other.asString();
    }

    public getHashCode(): number {
        var yeet: Name = this;
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        if (this != yeet){
            throw new InvalidStateException("something went wrong");
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() < 1;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        if(other == undefined){
            throw new IllegalArgumentException("other does not exist");
        }

        if(this.getDelimiterCharacter != other.getDelimiterCharacter){
            throw new IllegalArgumentException("other has wrong Delimiter");
        }
        return this.append(other.asString());
    }

}