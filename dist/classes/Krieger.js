"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Krieger {
    constructor(name = "", alter = 0, macht = 0, ConsoleHelperInstance) {
        this.name = name;
        this.alter = alter;
        this.macht = macht;
        this.gegenstaende = [];
        this.ConsoleInput = ConsoleHelperInstance;
    }
    handeln(gegenstand) {
        if (this.gegenstaende.includes(gegenstand)) {
            this.gegenstaende.splice(this.gegenstaende.indexOf(gegenstand), 1);
            console.log(`${this.name} hat abgegeben: ${gegenstand}`);
        }
        else {
            this.gegenstaende.push(gegenstand);
            console.log(`${this.name} hat aufgenommen: ${gegenstand}`);
        }
        this.berechneMacht();
    }
    treffen(krieger) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ConsoleInput.header("Treffen");
            const gegenstaendeDesAnderen = krieger.getGegenstaende();
            const option = yield this.ConsoleInput.printMenu(`Gegenstand von ${this.name} zu ${krieger.getName()}`, ["Gegenstand geben", "Gegenstand erhalten"]);
            switch (option) {
                case 1:
                    if (this.gegenstaende.length > 0) {
                        const gegenstandIndex = yield this.ConsoleInput.printMenu(`Gegenstand von ${this.name} wählen`, this.gegenstaende.map((g) => g.toString()));
                        const selectedGegenstand = this.gegenstaende[gegenstandIndex - 1];
                        this.gegenstaende.splice(gegenstandIndex - 1, 1);
                        krieger.addGegenstand(selectedGegenstand);
                        this.ConsoleInput.valid(`${this.name} hat abgegeben: ${selectedGegenstand}`, true);
                        this.ConsoleInput.valid(`${krieger.getName()} hat aufgenommen: ${selectedGegenstand}`, true);
                    }
                    else {
                        this.ConsoleInput.valid("Keine Gegenstände zum Geben vorhanden.", false);
                    }
                    break;
                case 2:
                    if (gegenstaendeDesAnderen.length > 0) {
                        const gegenstandIndex = yield this.ConsoleInput.printMenu(`Gegenstand von ${krieger.getName()} wählen`, gegenstaendeDesAnderen.map((g) => g.toString()));
                        const selectedGegenstand = gegenstaendeDesAnderen[gegenstandIndex - 1];
                        krieger.removeGegenstand(selectedGegenstand);
                        this.addGegenstand(selectedGegenstand);
                        this.ConsoleInput.valid(`${krieger.getName()} hat abgegeben: ${selectedGegenstand}`, true);
                        this.ConsoleInput.valid(`${this.name} hat aufgenommen: ${selectedGegenstand}`, true);
                    }
                    else {
                        this.ConsoleInput.valid("Keine Gegenstände zum Erhalten vorhanden.", false);
                    }
                    break;
                default:
                    this.ConsoleInput.valid("Ungültige Option.", false);
                    break;
            }
        });
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getAlter() {
        return this.alter;
    }
    setAlter(alter) {
        this.alter = alter;
    }
    getGegenstaende() {
        return this.gegenstaende;
    }
    setGegenstaende(gegenstaende) {
        this.gegenstaende = gegenstaende;
    }
    getMacht() {
        return this.macht;
    }
    berechneMacht() {
        let neueMacht = 1; // Standardmacht, wenn keine Gegenstände vorhanden sind
        for (const gegenstand of this.gegenstaende) {
            neueMacht += gegenstand.getFaktor(); // Faktor des Gegenstands zur Macht addieren
        }
        this.macht = neueMacht;
    }
    addGegenstand(g) {
        this.gegenstaende.push(g);
        this.berechneMacht();
    }
    removeGegenstand(g) {
        const index = this.gegenstaende.indexOf(g);
        if (index !== -1) {
            this.gegenstaende.splice(index, 1);
            this.berechneMacht();
        }
    }
    toString() {
        return `Krieger{name='${this.name}', alter=${this.alter}, macht=${this.macht}, gegenstaende=${this.gegenstaende}}`;
    }
}
exports.default = Krieger;
