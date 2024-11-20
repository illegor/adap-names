export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 *
 * Homogenous name examples
 *
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
import { test } from "vitest";

export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];


    /** @methodtype constructor-methos (convenience-method) */
    /** Expects that all Name components are properly masked */
    constructor(other: string[], delimiter?: string) {
        this.components = other; //falls leer, egal, Fehlerbehandlung in jeweiligen Methoden
        if(delimiter != null){
            this.delimiter = delimiter;
        }


    }

    /** Returns human-readable representation of Name instance */
    /** @methodtype conversion-method */
    public asNameString(delimiter: string = this.delimiter): string {

        let res = "" //leerer String wird nach und nach gefüllt
        if(this.components === null || this.getNoComponents() == 0) return res; //falls nichts in components --> nichts zum lesen da
        for(let i = 0; i < this.getNoComponents()-1; i++){ //nur bis ...-1, um am Ende keinen überflüssigen delimiter zu haben
            res += this.components[i];
            res += delimiter;

            }
        res += this.components[this.getNoComponents()-1]; //letztes Part hinzufügen

        return res;


    }
    /** @methodtype get-method */
    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    /**
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public getComponent(i: number): string {

        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes erlauben
        return this.components[i]; //component zurückgeben

        }

        throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts ausgegeben werden

    }
    /** @methodtype set-method */
    public setComponent(i: number, c: string): void {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes können auch geändert werden
            this.components[i] = c; //Component ändern
        }
        throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts geändert werden
    }


    /** @methodtype get-method */
    /** Returns number of components in Name instance */
    public getNoComponents(): number {
        return this.components.length

    }

    /** Expects that new Name component c is properly masked */
    public insert(i: number, c: string): void {
        if(i < 0 || i > this.getNoComponents()) return
        let first = this.components.slice(0, i) //c soll an Stelle i hinzugefügt werden --> Components bis i erstmal kopieren
        first.push(c); //c an Stelle i hinzufügen
        this.components = first.concat(this.components.slice(i, this.getNoComponents())); //rest der Components hinzufügen


    }

    /** Expects that new Name component c is properly masked */
    public append(c: string): void {
        this.components.push(c);

    }

    public remove(i: number): void {
        if(i > -1 && i < this.getNoComponents()){
        let first = this.components.slice(0, i) //Component an Stelle i soll entfernt werden --> Components bis i erstmal kopieren
        this.components = first.concat(this.components.slice(i+1, this.getNoComponents())); //i überspringen und Rest kopieren
        }
        throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts geändert werden
    }

}