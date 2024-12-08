import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
//import {AssertionDispatcher, ExceptionType} from "../common/AssertionDispatcher";
import {InvalidStateException} from "../../adap-b04/common/InvalidStateException";

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
        //this.assertFileOpen(0);
        this.state = FileState.OPEN;

        //this.assertFileClosed(2);
    }

    public read(noBytes: number): Int8Array {
        let result: Int8Array = new Int8Array(noBytes);
        // do something

        let tries: number = 0;
        for (let i: number = 0; i < noBytes; i++) {
            try {
                result[i] = this.readNextByte();
            } catch(ex) {
                tries++;
                if (ex instanceof MethodFailedException) {
                    // Oh no! What @todo?!
                }
            }
        }

        return result;
    }

    protected readNextByte(): number {
        return 0; // @todo
    }

    public close(): void {
        //this.assertFileClosed(0);
        this.state = FileState.CLOSED;
        //this.assertFileOpen(2);
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

    /**protected assertFileOpen(et: ExceptionType)  :void {
        const fs: FileState = this.doGetFileState();
        AssertionDispatcher.dispatch(et,fs == FileState.OPEN,"File already open");
    }
    protected assertFileClosed(et: ExceptionType)  :void {
        const fs: FileState = this.doGetFileState();
        AssertionDispatcher.dispatch(et,fs == FileState.CLOSED,"File already closed");
    }**/

}