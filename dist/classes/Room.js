"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(id, monsters, roomReward) {
        this.id = id;
        this.monsters = monsters;
        this.roomReward = roomReward;
    }
    getRoomReward() {
        return this.roomReward;
    }
    getId() {
        return this.id;
    }
    getMonsters() {
        return this.monsters;
    }
    addMonster(monster) {
        this.monsters.push(monster);
    }
    removeMonster(monster) {
        this.monsters = this.monsters.filter((item) => item.getName() !== monster.getName());
    }
}
exports.Room = Room;
