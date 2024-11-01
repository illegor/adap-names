import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";

export class StringArrayName implements Name {

    protected components: string[] = [];
    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(other: string[], delimiter?: string) {
        this.components = other; //falls leer, egal, Fehlerbehandlung in jeweiligen Methoden
        if(delimiter != null){
            this.delimiter = delimiter;
        }
        else{
            this.delimiter = DEFAULT_DELIMITER; //Default, falls kein Delimiter mitgegeben, da optional
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        let res = "" //leerer String wird nach und nach gefüllt
        if(this.components === null || this.getNoComponents() == 0) return res; //falls nichts in components --> nichts zum lesen da
        for(let i = 0; i < this.getNoComponents()-1; i++){ //nur bis ...-1, um am Ende keinen überflüssigen delimiter zu haben
            res += this.components[i];
            res += delimiter;
            
            }
        res += this.components[this.getNoComponents()-1]; //letztes Part hinzufügen
            
        return res;
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        return(this.components.length == 0);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length
    }

    public getComponent(i: number): string {
        
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes erlauben
            return this.components[i]; //component zurückgeben
    
            }
        
            throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts ausgegeben werden
    }

    public setComponent(i: number, c: string): void {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes können auch geändert werden
            this.components[i] = c; //Component ändern
        }
        //throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts geändert werden
    }

    public insert(i: number, c: string): void {
        if(i < 0 || i > this.getNoComponents()) return
        let first = this.components.slice(0, i) //c soll an Stelle i hinzugefügt werden --> Components bis i erstmal kopieren
        first.push(c); //c an Stelle i hinzufügen
        this.components = first.concat(this.components.slice(i, this.getNoComponents())); //rest der Components hinzufügen
        
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if(i > -1 && i < this.getNoComponents()){ 
            let first = this.components.slice(0, i) //Component an Stelle i soll entfernt werden --> Components bis i erstmal kopieren
            this.components = first.concat(this.components.slice(i+1, this.getNoComponents())); //i überspringen und Rest kopieren
            }
            //throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts geändert werden
    }

    public concat(other: Name): void {
        for(let i = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }
        //throw new Error("needs implementation");
    }

}