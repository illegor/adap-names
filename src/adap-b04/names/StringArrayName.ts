import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {MethodFailureException} from "../common/MethodFailureException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super();
        if(other.length > 0 && other[0]!= ""){
            this.components = other;
        }
        else{
            throw new IllegalArgumentException("invalid other")
        }

    }

    public clone(): Name {
        return super.clone();
    }

    public asString(delimiter: string = this.delimiter): string {
       return super.asString(delimiter);
    }

    public toString(): string {
        return super.toString();
    }

    public asDataString(): string {
        return super.asDataString();
    }

    public isEqual(other: Name): boolean {
        return super.isEqual(other);
    }

    public getHashCode(): number {
        return super.getHashCode();
    }

    public isEmpty(): boolean {
        return super.isEmpty();
    }

    public getDelimiterCharacter(): string {
        return super.getDelimiterCharacter();
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public getComponent(i: number): string {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes erlauben
            return this.components[i]; //component zurückgeben

        }
        else throw new IllegalArgumentException("invalid index"); //falls Index ungültig --> Es kann nichts ausgegeben werden
    }

    public setComponent(i: number, c: string) {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index")
        if(c.length < 1) throw new IllegalArgumentException("invalid Component");

        this.components[i] = c;
        if(this.getComponent(i) != c){
            throw new MethodFailureException("component not set");
        }
    }

    public insert(i: number, c: string) {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index")
        if(c.length < 1) throw new IllegalArgumentException("invalid Component");
        var len: number = this.getNoComponents();
        let first = this.components.slice(0, i) //c soll an Stelle i hinzugefügt werden --> Components bis i erstmal kopieren
        first.push(c); //c an Stelle i hinzufügen
        this.components = first.concat(this.components.slice(i, this.getNoComponents())); //rest der Components hinzufügen
        if(this.getNoComponents() != len+1){
            throw new MethodFailureException("not inserted");
        }
        if(this.getComponent(i) != c){
            throw new MethodFailureException("inserted at wrong index");
        }
    }

    public append(c: string) {
        if(c.length < 1) throw new IllegalArgumentException("invalid Component");
        var len: number = this.getNoComponents();
        this.components.push(c);
        if(this.getNoComponents() != len+1){
            throw new MethodFailureException("not inserted");
        }
    }

    public remove(i: number) {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index")
        var len: number = this.getNoComponents();
        let first = this.components.slice(0, i) //Component an Stelle i soll entfernt werden --> Components bis i erstmal kopieren
        this.components = first.concat(this.components.slice(i+1, this.getNoComponents())); //i überspringen und Rest kopieren
        if(this.getNoComponents() != len-1){
            throw new MethodFailureException("not removed");
        }
    }

    public concat(other: Name): void {


        super.concat(other);

    }
}