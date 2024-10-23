import { test } from "vitest";

export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other;
        if(delimiter != null){
            this.delimiter = delimiter;
        }
        //throw new Error("needs implementation");
    }

    /** Returns human-readable representation of Name instance */
    public asNameString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public getComponent(i: number): string {
        if(i > -1 && i < this.components.length){
        return this.components[i];

        }
    
        throw new Error("invalid index");
        
    }

    public setComponent(i: number, c: string): void {
        if(i > -1 && i < this.components.length){
            this.components[i] = c;
        }
        //throw new Error("invalid index");
    }

    public getNoComponents(): number {
        return this.components.length;
        throw new Error("needs implementation");
    }

    public insert(i: number, c: string): void {
        this.components[i] = c;
        //throw new Error("needs implementation");
    }

    public append(c: string): void {
        this.components.push(c);
        throw new Error("needs implementation");
    }

    public remove(i: number): void {
        if(i > -1 && i < this.components.length){
            this.components[i] = "";
        }
        throw new Error("invalid index");
    }

}