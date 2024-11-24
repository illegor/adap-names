import { Node } from "./Node";
import { Directory } from "./Directory";
import {InvalidStateException} from "../common/InvalidStateException";
import {MethodFailureException} from "../common/MethodFailureException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        if(this.doGetFileState() === FileState.OPEN) {
            throw new InvalidStateException("open file cant be opened")
        }
        this.state = FileState.OPEN;

        if(this.doGetFileState() === FileState.CLOSED) {
            throw new MethodFailureException("File not opened");
        }
        // do something
    }

    public close(): void {
        if(this.doGetFileState() === FileState.CLOSED) {
            throw new InvalidStateException("Closed file cant be closed")
        }
        this.state = FileState.CLOSED;

        if(this.doGetFileState() === FileState.OPEN) {
            throw new MethodFailureException("File not closed");
        }
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}