import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        
        if(delimiter != null){
            this.delimiter = delimiter;
        }
        else{
            this.delimiter = DEFAULT_DELIMITER; //Default, falls kein Delimiter mitgegeben, da optional
        }
        if(other != ""){
            this.name = other; 
            
            this.length++;
            }
        
        
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        return(this.name == "");
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.length;
    }

    public getComponent(x: number): string {
        let sol = ""
        if(x > this.length || x<1) {return sol};
        let i = 0;
        let j = 0;
        while(i < x){
            if(this.name.charAt(j) == this.getDelimiterCharacter()){
                i++;
            }
            j++;

        }
        while(this.name.charAt(j) != this.getDelimiterCharacter()){
            sol += this.name.charAt(j);
        }

        return sol;
    }

    public setComponent(n: number, c: string): void {
        throw new Error("needs implementation");
    }

    public insert(n: number, c: string): void {
        let i = 0;
        let j = 0;
        while(i < n){
            if(this.name.charAt(j) == this.getDelimiterCharacter()){
                i++;
            }
            j++;

        }

        let firstPart = this.name.substr(0, j);
        let lastPart = this.name.substr(j);
        this.name = firstPart+c+ this.getDelimiterCharacter() +lastPart;
    }

    public append(c: string): void {
        this.name += this.getDelimiterCharacter();
        this.name += c;
        this.length++;
        //throw new Error("needs implementation");
    }

    public remove(n: number): void {

        if(n > this.length || n<0) {return};
        let i = 0;
        let j = 0;
        while(i < n){
            if(this.name.charAt(j) == this.getDelimiterCharacter()){
                i++;
            }
            j++;

        }
       let k = j
       while(i < n+1){
        if(this.name.charAt(j) == this.getDelimiterCharacter()){
            i++;
        }
        j++;

    }
        console.log(k);
        console.log(j);
        let firstPart = this.name.substr(0, k);
        let lastPart = this.name.substr(j);
        this.name = firstPart+lastPart;
        this.length--;
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
    }

}