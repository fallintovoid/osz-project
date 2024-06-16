"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gegenstand {
    constructor(typ = "", faktor = 0) {
        this.typ = typ;
        this.faktor = faktor;
    }
    getTyp() {
        return this.typ;
    }
    setTyp(typ) {
        this.typ = typ;
    }
    getFaktor() {
        return this.faktor;
    }
    setFaktor(faktor) {
        if (faktor > 0) {
            this.faktor = faktor;
        }
        else {
            console.log("Der Faktor muss positiv sein.");
        }
    }
    toString() {
        return `Gegenstand{typ='${this.typ}', faktor=${this.faktor}}`;
    }
}
exports.default = Gegenstand;
