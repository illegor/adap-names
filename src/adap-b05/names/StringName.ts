import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import {IllegalArgumentException} from "../common/IllegalArgumentException";
import {MethodFailedException} from "../common/MethodFailedException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();

        if(delimiter != null){
            this.delimiter = delimiter;
        }
        //if(other.length < 1) throw new IllegalArgumentException("invalid component (const)");
        this.name = other;


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
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if(i < 0 || i > this.getNoComponents())throw new IllegalArgumentException("invalid index");
        let sol = ""
        let k = 0;
        let j = 0;
        while(k < i){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                k++;
            }
            j++;
            if(j == this.name.length)break;

        }
        while(this.name.charAt(j) != this.getDelimiterCharacter() && j <  this.name.length){
            sol += this.name.charAt(j);
            j++;
        }
        for(let l = 0; l < sol.length; l++){
            if(sol.charAt(l) == ESCAPE_CHARACTER){
                let firstPart = this.name.substr(0, k);
                let lastPart = this.name.substr(k+1);
                sol = firstPart+lastPart;
            }
        }

        return sol;
    }

    public setComponent(i: number, c: string) {
        if(i > this.getNoComponents() || i<0) throw new IllegalArgumentException("invalid index");
        if(c.length < 1) throw new IllegalArgumentException("invalid component");
        this.insert(i, c);
        if(this.getComponent(i) != c){
            throw new MethodFailedException("component not set");
        }
    }

    public insert(i: number, c: string) {
        if(i > this.getNoComponents() || i<0) throw new IllegalArgumentException("invalid index");
        if(c.length < 1) throw new IllegalArgumentException("invalid component");
        var len: number = this.getNoComponents();
        if(i == this.getNoComponents()){
            this.append(c);
            return;
        }

        let k = 0;
        let j = 0;
        while(k < i){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                k++;
            }
            j++;

        }

        let firstPart = this.name.substr(0, j);
        let lastPart = this.name.substr(j);
        this.name = firstPart+c+ this.getDelimiterCharacter() +lastPart;
        this.noComponents++;
        if(this.getNoComponents() != len+1){
            throw new MethodFailedException("not inserted");
        }
        if(this.getComponent(i) != c){
            throw new MethodFailedException("inserted at wrong index");
        }
    }

    public append(c: string) {
        if(c.length < 1) throw new IllegalArgumentException("invalid component");
        var len: number = this.getNoComponents();
        this.name += this.getDelimiterCharacter();
        this.name += c;
        this.noComponents++;
        if(this.getNoComponents() != len+1){
            throw new MethodFailedException("not inserted");
        }
    }

    public remove(i: number) {
        if(i > this.getNoComponents() || i<0) throw new IllegalArgumentException("invalid index");
        var len: number = this.getNoComponents();
        let k = 0;
        let j = 0;
        while(k < i){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                k++;
            }
            j++;

        }
        let firstPart = this.name.substr(0, j);

        while(k < i+1){
            if(this.name.charAt(j) == (this.getDelimiterCharacter()) || j == this.name.length){
                k++;
            }
            j++;

        }



        if(j < this.name.length){
            let lastPart = this.name.substr(j);
            this.name = firstPart+lastPart;
        }
        else this.name = firstPart;
        if(i == this.getNoComponents()-1){
            let newname = this.name.substring(0, this.name.length-1);
            this.name = newname;

        }
        this.noComponents--;
        if(this.getNoComponents() != len-1){
            throw new MethodFailedException("not removed");
        }

    }

    public concat(other: Name): void {
        super.concat(other);
    }

}