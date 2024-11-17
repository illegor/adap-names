import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected length: number = 0;

    constructor(other: string, delimiter?: string) {
        super();
        this.length = 0;
        if(delimiter != null){
            this.delimiter = delimiter;
        }
        else{
            this.delimiter = DEFAULT_DELIMITER; //Default, falls kein Delimiter mitgegeben, da optional
        }
        if(other != ""){
            this.name = other; 
            
            this.length = this.getNoComponents();
            }
        
    }

    getNoComponents(): number {
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

    getComponent(i: number): string {
        let sol = ""
        if(i > this.length || i<0) {return sol};
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
        if(i > this.length || i<0) {return};
        this.remove(i);
        this.insert(i, c);
    }

    insert(i: number, c: string) {
        if(i > this.length || i<0) {return};
        if(i == this.length){
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
        this.length++;
    }
    append(c: string) {
        this.name += this.getDelimiterCharacter();
        this.name += c;
        this.length++;
    }
    remove(i: number) {
        if(i > this.length || i<0) {return};
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
        if(i == this.length-1){
            let newname = this.name.substring(0, this.name.length-1);
            this.name = newname;

        }
        this.length--;
    }
}