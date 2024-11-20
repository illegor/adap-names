import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super();

        if(delimiter != null){
            this.delimiter = delimiter;
        }
        else{
            this.delimiter = DEFAULT_DELIMITER; //Default, falls kein Delimiter mitgegeben, da optional
        }
        if(other != ""){
            this.name = other;

            this.noComponents = this.getNoComponents();
            }

    }

    getNoComponents(): number {
        /*if(this.name == "")return 0;
        let i = 1;
        let j = 0;
        while(j < this.name.length){
            if(this.name.charAt(j) == this.getDelimiterCharacter()){
               i++;
            }
            j++;

        }
        return i;*/
        return this.noComponents;
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
        let sol = ""
        if(i > this.getNoComponents() || i<0) {return sol};
        let k = 0;
        let j = 0;
        while(k < i){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                k++;
            }
            j++;
            if(j == this.name.length)break;

        }
        while(this.name.charAt(j) != this.getDelimiterCharacter() && j !=  this.name.length){
            sol += this.name.charAt(j);
            j++;
        }
        for(let l = 0; l < sol.length; i++){
            if(sol.charAt(l) == ESCAPE_CHARACTER){
                let firstPart = this.name.substr(0, k);
                let lastPart = this.name.substr(k+1);
                sol = firstPart+lastPart;
            }
        }
        return sol;
    }
    setComponent(i: number, c: string) {
        if(i > this.getNoComponents() || i<0) {return};
        this.remove(i);
        this.insert(i, c);
    }
    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }
    public getHashCode(): number {
        throw new Error("needs implementation");
    }
    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }
    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }


    public concat(other: Name): void {
        throw new Error("needs implementation");
    }

    insert(i: number, c: string) {
        if(i > this.getNoComponents() || i<0) {return};
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
    }
    append(c: string) {
        this.name += this.getDelimiterCharacter();
        this.name += c;
        this.noComponents++;
    }
    remove(i: number) {
        if(i > this.getNoComponents() || i<0) {return};
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
    }
}