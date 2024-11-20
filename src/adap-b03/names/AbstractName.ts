import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;

        //throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        let sol = ""
        for(let i = 0; i < this.getNoComponents(); i++){
            sol+= this.getComponent(i);
            sol += this.getDelimiterCharacter();
        }
        if(sol.length > 0){
            sol = sol.substring(0, sol.length-1);
        }
        return sol;
        //throw new Error("needs implementation");
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let sol = ""
        for(let i = 0; i < this.getNoComponents(); i++){
            sol+= this.getComponent(i);
            sol += "#";
        }
        if(sol.length > 0){
            sol = sol.substring(0, sol.length-1);
        }
        return sol;
        //throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        return this.asString() == other.asString();
        //throw new Error("needs implementation");
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
        //throw new Error("needs implementation");
    }

    public clone(): Name {
        return {...this}
        //throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        return this.getNoComponents() < 1;
        //throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
        //throw new Error("needs implementation");
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        if(this.getDelimiterCharacter != other.getDelimiterCharacter){return;}
        return this.append(other.asString());
        //throw new Error("needs implementation");
    }

}