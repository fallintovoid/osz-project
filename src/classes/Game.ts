import { weaponsList } from "../constants/weapons";
import { ConsoleHelper } from "../lib/ConsoleHelper";
import ConsoleInput from "../lib/Input";
import { WeaponName } from "../types/weapon";
import { Monster } from "./Monster";
import { Player } from "./Player";
import { Room } from "./Room";
import { Weapon } from "./Weapon";

export class Game {
  private rooms: Room[];
  private player: Player;
  private consoleInput: ConsoleInput;
  private consoleHelper: ConsoleHelper;
  private currentRoomId: number;
  private numberOfRooms: number;

  constructor() {
    this.numberOfRooms = 6;
    this.rooms = [];
    this.player = new Player();
    this.player.addWeapon("Spiderbite Sickle");
    this.generateDungeon();
    this.consoleInput = new ConsoleInput();
    this.consoleHelper = new ConsoleHelper();
    this.currentRoomId = 0;
  }

  private generateDungeon(): void {
    const room1Weapon = new Weapon("Blightbloom Bow");
    const room1 = new Room(0, this.generateMonsters(20, 2), room1Weapon);

    const room2Weapon = new Weapon("Doomblade");
    const room2 = new Room(1, this.generateMonsters(30, 2), room2Weapon);

    const room3Weapon = new Weapon("Hellfire Flail");
    const room3 = new Room(2, this.generateMonsters(40, 2), room3Weapon);

    const room4Weapon = new Weapon("Infernal Lance");
    const room4 = new Room(3, this.generateMonsters(50, 2), room4Weapon);

    const room5Weapon = new Weapon("Runeblade");
    const room5 = new Room(4, this.generateMonsters(60, 2), room5Weapon);

    const room6Weapon = new Weapon("Voidreaver Axe");
    const room6 = new Room(5, this.generateMonsters(70, 2), room6Weapon);

    this.rooms = [room1, room2, room3, room4, room5, room6];
  }

  private generateMonsters(maxPower: number, amount: number): Monster[] {
    const monsters: Monster[] = [];

    for (let i = 1; i <= amount; i++) {
      const newMonster = new Monster(
        `Dungeon monster ${i}`,
        this.generateWeapon(maxPower)
      );

      monsters.push(newMonster);
    }

    return monsters;
  }

  private generateWeapon(maxPower: number): Weapon {
    const validWeapons = Object.entries(weaponsList).filter((item) => {
      const [, strength] = item;

      return strength <= maxPower;
    }) as [WeaponName, number][];

    const randomIndex = Math.floor(Math.random() * validWeapons.length);
    const [weaponName] = validWeapons[randomIndex];

    return new Weapon(weaponName);
  }

  private logGameEnd(): void {
    console.clear();
    this.consoleHelper.sendMessage("You have lost");
  }

  private logGameWin(): void {
    console.clear();
    this.consoleHelper.sendMessage("You have won");
  }

  public async init(): Promise<void> {
    let isReady = "";

    while (isReady !== "y") {
      console.clear();

      this.consoleHelper.sendMessage(
        "Welcome, brave adventurer, to the Dungeon of Doom!\n Here, you will face untold dangers and uncover hidden treasures.\n Sharpen your sword, ready your spells, and prepare for the unknown.\n\n Are you ready for your journey? y/n"
      );
      isReady = await this.consoleInput.getInputString(
        (value) => value === "y" || value === "n"
      );

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

      this.consoleHelper.sendMessage(
        `You are right now in room number ${
          this.currentRoomId + 1
        } \n Monsters in this room: \n ${monstersMessage}`
      );

      let menuAnswer = 0;
      menuAnswer = await this.consoleHelper.openMenu(
        ["Fight monster", "Open inventory", "Show fight logs"],
        this.consoleInput
      );

      if (menuAnswer === 1) {
        const hasWon = this.player.fightEnemy(monsters[0], this.currentRoomId);

        if (hasWon) {
          room.removeMonster(monsters[0]);

          if (room.getMonsters().length === 0) {
            this.player.addWeapon(room.getRoomReward().getName());
            this.currentRoomId = this.rooms.indexOf(room) + 1;
          }
          continue;
        }
      } else if (menuAnswer === 2) {
        await this.player.showInventory();
        continue;
      } else if (menuAnswer === 3) {
        await this.player.showFightLogs();
      }
    }
  }
}
