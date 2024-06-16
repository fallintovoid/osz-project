"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Weapon = void 0;
const weapons_1 = require("../constants/weapons");
class Weapon {
    constructor(name) {
        this.name = name;
        this.power = weapons_1.weaponsList[name];
    }
    getPower() {
        return this.power;
    }
    getName() {
        return this.name;
    }
}
exports.Weapon = Weapon;
