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
exports.Player = void 0;
const Input_1 = __importDefault(require("../lib/Input"));
const Weapon_1 = require("./Weapon");
class Player {
    constructor() {
        this.consoleInput = new Input_1.default();
        this.health = 100;
        this.keysAmount = 0;
        this.weapons = [];
        this.strength = 0;
        for (let i = 0; i < this.weapons.length; i++) {
            this.strength += this.weapons[i].getPower();
        }
    }
    getHealth() {
        return this.health;
    }
    setStrength(value) {
        this.strength = value;
    }
    setHealth(callback) {
        this.health = callback(this.health);
    }
    getStrength() {
        return this.strength;
    }
    getKeysAmount() {
        return this.keysAmount;
    }
    setKeysAmount(callback) {
        this.keysAmount = callback(this.keysAmount);
    }
    addWeapon(weaponName) {
        if (this.weapons.length === 2) {
            const newWeapon = new Weapon_1.Weapon(weaponName);
            const weaponOne = this.weapons[0];
            const weaponTwo = this.weapons[1];
            if (weaponOne.getPower() < weaponTwo.getPower()) {
                this.removeWeapon(weaponOne.getName());
            }
            else {
                this.removeWeapon(weaponTwo.getName());
            }
            this.weapons.push(newWeapon);
        }
        else {
            const weapon = new Weapon_1.Weapon(weaponName);
            this.weapons.push(weapon);
        }
        let strength = 0;
        for (let i = 0; i < this.weapons.length; i++) {
            strength += this.weapons[i].getPower();
        }
        this.setStrength(strength);
    }
    removeWeapon(weaponName) {
        if (this.weapons.length === 0) {
            console.log("--- Your weapon slots are empty ---");
        }
        else {
            this.weapons = this.weapons.filter((item) => {
                return item.getName() !== weaponName;
            });
        }
    }
    fightEnemy(monster) {
        console.clear();
        if (monster.getStrength() > this.strength) {
            // Monster stronger than player
            console.log(`> ${monster.getName()} dealed ${monster.getStrength() - this.strength} Damage to Player`);
            this.health -= monster.getStrength() - this.strength;
            return false;
        }
        else {
            // Player stronger than monster
            console.log(`> Player has killed ${monster.getName()}`);
            if (this.strength - monster.getStrength() < 50) {
                console.log(`> ${monster.getName()} dealed 5 Damage to Player`);
                this.health -= 5;
            }
            return true;
        }
    }
    showInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            console.clear();
            console.log("=".repeat(45));
            console.log(`Health Points: ${this.health}`);
            console.log(`Keys: ${this.keysAmount}`);
            console.log(`Strength: ${this.strength}`);
            console.log("-".repeat(45));
            for (let i = 0; i < this.weapons.length; i++) {
                console.log(`Weapon ${i + 1}: ${this.weapons[i].getName()} (Power ${this.weapons[i].getPower()})`);
            }
            console.log("=".repeat(45));
            let isClose = "";
            while (isClose !== "y") {
                isClose = yield this.consoleInput.getInputString((value) => value === "y", "Close inventory? (y): ");
            }
            return;
        });
    }
}
exports.Player = Player;
