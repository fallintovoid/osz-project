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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleHelper_1 = __importDefault(require("../lib/ConsoleHelper"));
const Gegenstand_1 = __importDefault(require("./Gegenstand"));
const Krieger_1 = __importDefault(require("./Krieger"));
const Volk_1 = __importDefault(require("./Volk"));
class KtarisMain {
    constructor(ConsoleHelperInstance) {
        this.ConsoleInput = ConsoleHelperInstance;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const g1 = new Gegenstand_1.default("Quantenkanone", 17);
            const g2 = new Gegenstand_1.default("Graviton-Blaster", 15);
            const g3 = new Gegenstand_1.default("Quantenkanone", 17);
            const g4 = new Gegenstand_1.default("Dunkel-Emitter", 45);
            const g5 = new Gegenstand_1.default();
            g5.setTyp("Schatten-Flamme");
            g5.setFaktor(15);
            const allana = new Krieger_1.default("Allana", 140, 32, new ConsoleHelper_1.default());
            const tystae = new Krieger_1.default("Tystae", 70, 17, new ConsoleHelper_1.default());
            const inaraserra = new Krieger_1.default("Inara Serra", 163, 60, new ConsoleHelper_1.default());
            const bria = new Krieger_1.default("Bria", 148, 45, new ConsoleHelper_1.default());
            const katarus = new Volk_1.default("Katarus", 1247, allana);
            const arpasian = new Volk_1.default("Arpasian", 1023, null);
            arpasian.setChef(inaraserra);
            katarus.addKrieger(tystae);
            // 1. Allana findet einen neuen Gegenstand "Quantenkanone" mit dem Faktor 17
            allana.addGegenstand(g1);
            // Bildschirmausgabe
            console.log("Typ: " + g1.getTyp());
            console.log("Faktor: " + g1.getFaktor());
            console.log(g1.toString()); // Die toString() Methode wird aufgerufen
            console.log();
            console.log("Typ: " + g2.getTyp());
            console.log("Faktor: " + g2.getFaktor());
            console.log(g2); // Die toString() Methode wird selbstständig aufgerufen
            console.log();
            console.log("Typ : " + g3.getTyp());
            console.log("Faktor : " + g3.getFaktor());
            console.log(g3.toString()); // Die toString() Methode wird aufgerufen
            console.log();
            console.log("Typ: " + g4.getTyp());
            console.log("Faktor: " + g4.getFaktor());
            console.log(g1.toString()); // Die toString() Methode wird aufgerufen
            console.log();
            console.log("Typ: " + g5.getTyp());
            console.log("Faktor: " + g5.getFaktor());
            console.log(g1.toString()); // Die toString() Methode wird aufgerufen
            console.log();
            //Geben Sie die Werte der Objekte aus
            console.log(katarus.toString());
            console.log(arpasian.toString());
            console.log(allana.toString());
            console.log(tystae.toString());
            console.log(inaraserra.toString());
            console.log(katarus.toString() + " Chef: " + katarus.getChef().getName());
            console.log(arpasian.toString() +
                " Chef: " +
                (arpasian.getChef() != null
                    ? arpasian.getChef().getName()
                    : "Kein Chef"));
            // Jetzt werden die Methoden ausgeführt und die Ergebnisse überprüft
            // 2. Allana zeigt ihre neue Macht an (49).
            console.log("Allana's neue Macht: " + allana.getMacht());
            // 3. Katarus zeigt seine Macht an (115).
            console.log("Katarus' Macht: " + katarus.getMacht());
            // 4. Tystae verliert seine Quantenkanone.
            tystae.removeGegenstand(g1);
            console.log("Tystae's Gegenstände nach Entfernen: " +
                JSON.stringify(tystae.getGegenstaende()));
            // 5. Allana schenkt ihre Quantenkanone an Tystae.
            allana.handeln(g1);
            // 6. Katarus zeigt seine Macht an (98??).
            console.log("Katarus' Macht: " + katarus.getMacht());
            // 7. Arpasian nimmt die Kriegerin Bria (Alter: 148) auf. Sie wird auch gleich Chefin.
            arpasian.setChef(bria);
            arpasian.addKrieger(bria);
            console.log("Arpasian's Chef: " + arpasian.getChef().getName());
            // 8. Arpasian zeigt seine Macht an (62??).
            console.log("Arpasian's Macht: " + arpasian.getMacht());
            // 9. Zur Krönung erhält sie den Dunkel-Emitter von Inara.
            arpasian.getChef().handeln(g4);
            // 10. Bei genauer Betrachtung fällt auf, dass die Quantenkanone von Allana nur den Faktor 12 hat.
            for (const gegenstand of allana.getGegenstaende()) {
                if (gegenstand.getTyp() === "Quantenkanone") {
                    gegenstand.setFaktor(12);
                }
            }
            // 11. Katarus zeigt seine Macht an (71).
            console.log("Katarus' Macht: " + katarus.getMacht());
        });
    }
}
exports.default = KtarisMain;
