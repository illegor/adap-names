import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        this.noComponents = 0;
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

    public asString(delimiter: string = this.delimiter): string {
        let sol = this.name;
        sol.replaceAll(ESCAPE_CHARACTER, '')
        return sol ;
    }

    public asDataString(): string {
        return this.name;
    }

    public isEmpty(): boolean {
        return(this.name === "");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        if(this.name == "")return 0;
        let i = 1;
        let j = 0;
        while(j < this.name.length){
            if(this.name.charAt(j) == this.getDelimiterCharacter()){
               i++;
            }
            j++;

        }
        return i;
    }

    public getComponent(x: number): string {
        let sol = ""
        if(x > this.getNoComponents() || x<0) {return sol};
        let i = 0;
        let j = 0;
        while(i < x){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                i++;
            }
            j++;
            if(j == this.name.length)break;

        }
        while(this.name.charAt(j) != this.getDelimiterCharacter() && j !=  this.name.length){
            sol += this.name.charAt(j);
            j++;
        }
        for(let i = 0; i < sol.length; i++){
            if(sol.charAt(i) == ESCAPE_CHARACTER){
                let firstPart = this.name.substr(0, i);
                let lastPart = this.name.substr(i+1);
                sol = firstPart+lastPart;
            }
        }
        return sol;
    }

    public setComponent(n: number, c: string): void {
        if(n > this.getNoComponents() || n<0) {return};
        this.remove(n);
        this.insert(n, c);

    }

    public insert(n: number, c: string): void {
        if(n > this.getNoComponents() || n<0) {return};
        if(n == this.getNoComponents()){
            this.append(c);
            return;
        }
        let i = 0;
        let j = 0;
        while(i < n){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                i++;
            }
            j++;

        }

        let firstPart = this.name.substr(0, j);
        let lastPart = this.name.substr(j);
        this.name = firstPart+c+ this.getDelimiterCharacter() +lastPart;
        this.noComponents++;
    }

    public append(c: string): void {
        this.name += this.getDelimiterCharacter();
        this.name += c;
        this.noComponents++;
        //throw new Error("needs implementation");
    }

    public remove(n: number): void {

        if(n > this.getNoComponents() || n<0) {return};
        let i = 0;
        let j = 0;
        while(i < n){
            if(this.name.charAt(j) == (this.getDelimiterCharacter())){
                i++;
            }
            j++;

        }
        let firstPart = this.name.substr(0, j);

       while(i < n+1){
        if(this.name.charAt(j) == (this.getDelimiterCharacter()) || j == this.name.length){
            i++;
        }
        j++;

    }



        if(j < this.name.length){
        let lastPart = this.name.substr(j);
        this.name = firstPart+lastPart;
        }
        else this.name = firstPart;
        if(n == this.getNoComponents()-1){
            let newname = this.name.substring(0, this.name.length-1);
            this.name = newname;

        }
        this.getNoComponents();

    }

    public concat(other: Name): void {
        if(other.isEmpty()){return;};
        if(other.getDelimiterCharacter() == this.getDelimiterCharacter()){
            let c = other.getNoComponents();
            for(let i = 0; i < c; i++){
                this.append(other.getComponent(i));
            }
        }
    }

}