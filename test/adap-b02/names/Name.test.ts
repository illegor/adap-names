import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b02/names/Name";
import { StringName } from "../../../src/adap-b02/names/StringName";
import { StringArrayName } from "../../../src/adap-b02/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");

    
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
    let m: Name = new StringName("oss.cs.fau.de");
    m.remove(3);
    expect(m.asString()).toBe("oss.cs.fau");
  });
  it("test getNoComponents", () =>{
    let n: Name = new StringName("oss.fau.de");
    let l = n.getNoComponents();
    expect(l).toBe(3);
    n.insert(0, "cs");
    l = n.getNoComponents();
    expect(l).toBe(4);
    n.remove(0)
    l = n.getNoComponents();
    expect(l).toBe(3);
    n.append("cs");
    l = n.getNoComponents();
    expect(l).toBe(4);
    
    let o: Name = new StringName("");
    let a = o.getNoComponents();
    expect(a).toBe(0);
    
  })
  it("test getComponent", () => {
    let n: Name = new StringName("oss.fau.de");
    
    expect(n.getComponent(0)).toBe("oss");
    expect(n.getComponent(1)).toBe("fau");
    expect(n.getComponent(2)).toBe("de");
    expect(n.getComponent(3)).toBe("");

    n.insert(2, "abcd");
  
    expect(n.getComponent(0)).toBe("oss");
    expect(n.getComponent(1)).toBe("fau");
    expect(n.getComponent(2)).toBe("abcd");
    expect(n.getComponent(3)).toBe("de");
  })
  it("test setComponent", () => {
    let n: Name = new StringName("oss.fau.de");
    n.setComponent(0, "abcd")
    expect(n.asString()).toBe("abcd.fau.de");
    n.setComponent(1, "efgh")
    expect(n.asString()).toBe("abcd.efgh.de");
    n.setComponent(2, "qq")
    expect(n.asString()).toBe("abcd.efgh.qq");
    n.setComponent(4, "abcd")
    expect(n.asString()).toBe("abcd.efgh.qq");
 
  })
  it("test concat", () => {
    let n: StringName = new StringName("oss.fau.de");
    let m: Name = new StringName("");
    n.concat(m);
    expect(n.asString()).toBe("oss.fau.de")
  })
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
    n.remove(2);
    expect(n.asString()).toBe("cs.fau");
  });
  it("test getNoComponents"), () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents).toBe(4);
    let m: Name = new StringArrayName([]);
    expect(n.getNoComponents).toBe(0);
  }
  it("test getComponent"), () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(0)).toBe("oss");
    expect(n.getComponent(1)).toBe("cs");
    expect(n.getComponent(3)).toBe("de");
    expect(n.getComponent(100)).toBe("");
  }
  it("test getComponent"), () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    (n.setComponent(0, "abcd"));
    expect(n.asString()).toBe("abcd.cs.fau.de");
    (n.setComponent(1, "qwer"));
    expect(n.asString()).toBe("abcd.qwer.fau.de");
    (n.setComponent(3, "mm"));
    expect(n.asString()).toBe("abcd.qwer.fau.mm");
    (n.setComponent(100, "qwer"));
    expect(n.asString()).toBe("abcd.qwer.fau.mm");
  }
  it("test concat", () => {
    let n: StringArrayName = new StringArrayName(["oss", "cs", "fau", "de"]);
    let m: Name = new StringName("ab.cd.ef");
    n.concat(m);
    expect(n.asString()).toBe("oss.cs.fau.de.ab.cd.ef")
  })
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
  
});
