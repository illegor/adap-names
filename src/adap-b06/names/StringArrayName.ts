import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {MethodFailedException} from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        if(source.length > 0 && source[0]!= ""){
            this.components = source;
        }
        else{
            throw new IllegalArgumentException("invalid other")
        }

    }

    public clone(): Name {
        return super.clone();
    }
    protected doCreate(): Name {
        return new StringArrayName(this.components, this.getDelimiterCharacter());
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

    public setComponent(i: number, c: string): Name {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index")
        if(c.length < 1) throw new IllegalArgumentException("invalid Component");
        let newcomps: string[] = this.components;
        newcomps[i] = c

        return new StringArrayName(newcomps, this.getDelimiterCharacter());
        //if(this.getComponent(i) != c){
          //  throw new MethodFailedException("component not set");
        //}
    }

    public insert(i: number, c: string): Name {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index")
        if(c.length < 1) throw new IllegalArgumentException("invalid Component");
        var len: number = this.getNoComponents();
        let first = this.components.slice(0, i) //c soll an Stelle i hinzugefügt werden --> Components bis i erstmal kopieren
        first.push(c); //c an Stelle i hinzufügen

        first = first.concat(this.components.slice(i, this.getNoComponents())); //rest der Components hinzufügen

        return new StringArrayName(first, this.getDelimiterCharacter());
        //if(this.getNoComponents() != len+1){
          //  throw new MethodFailedException("not inserted");
        //}
        //if(this.getComponent(i) != c){
          //  throw new MethodFailedException("inserted at wrong index");
        //}
    }

    public append(c: string) {
        if(c.length < 1) throw new IllegalArgumentException("invalid Component");
        var len: number = this.getNoComponents();
        let newcomps: string[] = this.components;
        newcomps.push(c);

        return new StringArrayName(newcomps, this.getDelimiterCharacter());
        //if(this.getNoComponents() != len+1){
          //  throw new MethodFailedException("not inserted");
        //}
    }

    public remove(i: number): Name {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index")
        var len: number = this.getNoComponents();
        let first = this.components.slice(0, i) //Component an Stelle i soll entfernt werden --> Components bis i erstmal kopieren
        first = first.concat(this.components.slice(i+1, this.getNoComponents())); //i überspringen und Rest kopieren
        //if(this.getNoComponents() != len-1){
          //  throw new MethodFailedException("not removed");
        //}
        return new StringArrayName(first, this.getDelimiterCharacter());
    }

    public concat(other: Name): void {


        super.concat(other);

    }
}