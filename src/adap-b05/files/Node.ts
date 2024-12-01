import { ExceptionType, AssertionDispatcher } from "../common/AssertionDispatcher";

import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.add(this);
    }

    public move(to: Directory): void {
        this.parentNode.remove(this);
        to.add(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        let sol = new Set<Node>();

        if(this.getBaseName() == bn) sol.add(this);

        if(this instanceof Directory){
            let children = Array.from(this.getChildren());
            for (const child of children) {
                const childMatches = child.findNodes(bn);
                for (const matchedNode of childMatches) {
                    sol.add(matchedNode);
                }
            }
        }


        return sol;
    }

        // Initialize a set to collect nodes that match the given basename.
        /**let matchedNodes = new Set<Node>();

        // Check if the current node matches the basename and add it to the set if it does.
        if (this.getBaseName() == bn) {
            matchedNodes.add(this);
        }

        // If the current node is a Directory, recursively search its children.
        let parent = this.getParentNode();



            // Call findNodes on each child
            let children = Array.from(parent.getChildren());
            for (const child of children) {
                const childMatches = child.findNodes(bn);
                for (const matchedNode of childMatches) {
                    matchedNodes.add(matchedNode);
                }
            }

        // Return the set of matched nodes.
        return matchedNodes;
    }


















let sol: Set<Node> = new Set();
        let full = this.getFullName();
        if(this.getBaseName() == bn){
            sol.add(this);
        }
        if(this.getParentNode() === null){
            return sol;
        }

        let sol2 = this.getParentNode().findNodes(bn);
        sol2.forEach(node => sol.add(node));

        this.assertClassInvariants();
        return sol;
        //throw new Error("needs implementation or deletion");
 */


    protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, ExceptionType.CLASS_INVARIANT);
    }

    protected assertIsValidBaseName(bn: string, et: ExceptionType): void {
        const condition: boolean = (bn != "");
        AssertionDispatcher.dispatch(et, condition, "invalid base name");
    }

}
