"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Volk {
    constructor(name, gruendung, chef) {
        this.name = name;
        this.gruendung = gruendung;
        this.chef = chef;
        this.mitglieder = [];
        if (chef !== null) {
            this.mitglieder.push(chef);
        }
    }
    getChef() {
        return this.chef;
    }
    setChef(chef) {
        if (chef !== null && !this.mitglieder.includes(chef)) {
            this.mitglieder.push(chef);
        }
        this.chef = chef;
    }
    getMitglieder() {
        return this.mitglieder;
    }
    addKrieger(krieger) {
        this.mitglieder.push(krieger);
        if (this.chef === null) {
            this.chef = krieger;
        }
    }
    removeKrieger(krieger) {
        const index = this.mitglieder.indexOf(krieger);
        if (index !== -1) {
            this.mitglieder.splice(index, 1);
            if (this.chef === krieger) {
                if (this.mitglieder.length > 0) {
                    this.chef = this.mitglieder[0];
                }
                else {
                    this.chef = null;
                }
            }
        }
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getGruendung() {
        return this.gruendung;
    }
    setGruendung(gruendung) {
        this.gruendung = gruendung;
    }
    getMacht() {
        let gesamtMacht = 0;
        if (this.chef !== null && !this.mitglieder.includes(this.chef)) {
            gesamtMacht += 2 * this.chef.getMacht();
        }
        for (const krieger of this.mitglieder) {
            gesamtMacht += krieger.getMacht();
        }
        return gesamtMacht;
    }
    toString() {
        let mitgliederStr = "";
        for (const krieger of this.mitglieder) {
            mitgliederStr += krieger.getName() + ", ";
        }
        if (this.mitglieder.length > 0) {
            mitgliederStr = mitgliederStr.substring(0, mitgliederStr.length - 2); // Remove the last ", "
        }
        const chefName = this.chef !== null ? this.chef.getName() : "Kein Chef";
        return `Volk{name='${this.name}', gruendung=${this.gruendung}, chef=${chefName}, mitglieder=[${mitgliederStr}]}`;
    }
}
exports.default = Volk;
