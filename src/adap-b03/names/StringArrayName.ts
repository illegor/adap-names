import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        if(other.length > 0 && other[0]!= ""){
            this.components = other;
            }
            if(delimiter != null){
                this.delimiter = delimiter;
            }

    }

    getNoComponents(): number {
        return this.components.length
    }

    public clone(): Name {
        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public toString(): string {
        throw new Error("needs implementation");
    }

    getComponent(i: number): string {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes erlauben
            return this.components[i]; //component zurückgeben

            }

            throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts ausgegeben werden
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }
    setComponent(i: number, c: string) {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes können auch geändert werden
            this.components[i] = c; //Component ändern
        }
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    insert(i: number, c: string) {
        if(i < 0 || i > this.getNoComponents()) return
        let first = this.components.slice(0, i) //c soll an Stelle i hinzugefügt werden --> Components bis i erstmal kopieren
        first.push(c); //c an Stelle i hinzufügen
        this.components = first.concat(this.components.slice(i, this.getNoComponents())); //rest der Components hinzufügen
    }
    append(c: string) {
        this.components.push(c);
    }
    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }


    remove(i: number) {
        if(i > -1 && i < this.getNoComponents()){
            let first = this.components.slice(0, i) //Component an Stelle i soll entfernt werden --> Components bis i erstmal kopieren
            this.components = first.concat(this.components.slice(i+1, this.getNoComponents())); //i überspringen und Rest kopieren
            }
            //throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts geändert werden
    }
    public concat(other: Name): void {
        throw new Error("needs implementation");
    }
}