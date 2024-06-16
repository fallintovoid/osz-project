"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monster = void 0;
class Monster {
    constructor(name, weapon) {
        this.name = name;
        this.weapon = weapon;
        this.strength = weapon.getPower();
    }
    getName() {
        return this.name;
    }
    getStrength() {
        return this.strength;
    }
    getWeapons() {
        return this.weapon;
    }
}
exports.Monster = Monster;
