import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
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

    getComponent(i: number): string {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes erlauben
            return this.components[i]; //component zurückgeben
    
            }
        
            throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts ausgegeben werden
    }
    setComponent(i: number, c: string) {
        if(i > -1 && i < this.getNoComponents()){ //nur gültige Indizes können auch geändert werden
            this.components[i] = c; //Component ändern
        }
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
    remove(i: number) {
        if(i > -1 && i < this.getNoComponents()){ 
            let first = this.components.slice(0, i) //Component an Stelle i soll entfernt werden --> Components bis i erstmal kopieren
            this.components = first.concat(this.components.slice(i+1, this.getNoComponents())); //i überspringen und Rest kopieren
            }
            //throw new Error("invalid index"); //falls Index ungültig --> Es kann nichts geändert werden
    }
}