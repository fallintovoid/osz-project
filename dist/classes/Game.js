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
exports.Game = void 0;
const weapons_1 = require("../constants/weapons");
const ConsoleHelper_1 = require("../lib/ConsoleHelper");
const Input_1 = __importDefault(require("../lib/Input"));
const Monster_1 = require("./Monster");
const Player_1 = require("./Player");
const Room_1 = require("./Room");
const Weapon_1 = require("./Weapon");
class Game {
    constructor() {
        this.numberOfRooms = 6;
        this.rooms = [];
        this.player = new Player_1.Player();
        this.player.addWeapon("Spiderbite Sickle");
        this.generateDungeon();
        this.consoleInput = new Input_1.default();
        this.consoleHelper = new ConsoleHelper_1.ConsoleHelper();
        this.currentRoomId = 0;
    }
    generateDungeon() {
        const room1Weapon = new Weapon_1.Weapon("Blightbloom Bow");
        const room1 = new Room_1.Room(0, this.generateMonsters(20, 2), room1Weapon);
        const room2Weapon = new Weapon_1.Weapon("Doomblade");
        const room2 = new Room_1.Room(1, this.generateMonsters(30, 2), room2Weapon);
        const room3Weapon = new Weapon_1.Weapon("Hellfire Flail");
        const room3 = new Room_1.Room(2, this.generateMonsters(40, 2), room3Weapon);
        const room4Weapon = new Weapon_1.Weapon("Infernal Lance");
        const room4 = new Room_1.Room(3, this.generateMonsters(50, 2), room4Weapon);
        const room5Weapon = new Weapon_1.Weapon("Runeblade");
        const room5 = new Room_1.Room(4, this.generateMonsters(60, 2), room5Weapon);
        const room6Weapon = new Weapon_1.Weapon("Voidreaver Axe");
        const room6 = new Room_1.Room(5, this.generateMonsters(70, 2), room6Weapon);
        this.rooms = [room1, room2, room3, room4, room5, room6];
    }
    generateMonsters(maxPower, amount) {
        const monsters = [];
        for (let i = 1; i <= amount; i++) {
            const newMonster = new Monster_1.Monster(`Dungeon monster ${i}`, this.generateWeapon(maxPower));
            monsters.push(newMonster);
        }
        return monsters;
    }
    generateWeapon(maxPower) {
        const validWeapons = Object.entries(weapons_1.weaponsList).filter((item) => {
            const [, strength] = item;
            return strength <= maxPower;
        });
        const randomIndex = Math.floor(Math.random() * validWeapons.length);
        const [weaponName] = validWeapons[randomIndex];
        return new Weapon_1.Weapon(weaponName);
    }
    logGameEnd() {
        console.clear();
        this.consoleHelper.sendMessage("You have lost");
    }
    logGameWin() {
        console.clear();
        this.consoleHelper.sendMessage("You have won");
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let isReady = "";
            while (isReady !== "y") {
                console.clear();
                this.consoleHelper.sendMessage("Welcome, brave adventurer, to the Dungeon of Doom!\n Here, you will face untold dangers and uncover hidden treasures.\n Sharpen your sword, ready your spells, and prepare for the unknown.\n\n Are you ready for your journey? y/n");
                isReady = yield this.consoleInput.getInputString((value) => value === "y" || value === "n");
                if (isReady === "n") {
                    console.clear();
                    this.consoleHelper.sendMessage("You have gone out of dungeon");
                    return;
                }
            }
            while (this.currentRoomId !== this.numberOfRooms + 1) {
                if (this.currentRoomId > this.rooms.length - 1) {
                    this.logGameWin();
                    return;
                }
                if (this.player.getHealth() <= 0) {
                    this.logGameEnd();
                    return;
                }
                const room = this.rooms[this.currentRoomId];
                const monsters = room.getMonsters();
                let monstersMessage = "";
                monsters.forEach((item) => {
                    monstersMessage += `- ${item.getName()} (Power ${item.getStrength()}) \n`;
                });
                console.clear();
                this.consoleHelper.sendMessage(`You are right now in room number ${this.currentRoomId + 1} \n Monsters in this room: \n ${monstersMessage}`);
                let menuAnswer = 0;
                menuAnswer = yield this.consoleHelper.openMenu(["Fight monster", "Open inventory"], this.consoleInput);
                if (menuAnswer === 1) {
                    const hasWon = this.player.fightEnemy(monsters[0]);
                    if (hasWon) {
                        room.removeMonster(monsters[0]);
                        if (room.getMonsters().length === 0) {
                            this.player.addWeapon(room.getRoomReward().getName());
                            this.currentRoomId = this.rooms.indexOf(room) + 1;
                        }
                        continue;
                    }
                }
                else if (menuAnswer === 2) {
                    yield this.player.showInventory();
                    continue;
                }
            }
        });
    }
}
exports.Game = Game;
