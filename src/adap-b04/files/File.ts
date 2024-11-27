import { Node } from "./Node";
import { Directory } from "./Directory";
import {InvalidStateException} from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

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
            throw new MethodFailedException("File not opened");
        }
        // do something
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        if(this.doGetFileState() === FileState.CLOSED) {
            throw new InvalidStateException("Closed file cant be closed")
        }
        this.state = FileState.CLOSED;

        if(this.doGetFileState() === FileState.OPEN) {
            throw new MethodFailedException("File not closed");
        }
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}