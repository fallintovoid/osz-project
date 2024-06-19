import { weaponsList } from "../constants/weapons";
import { ConsoleHelper } from "../lib/ConsoleHelper";
import ConsoleInput from "../lib/Input";
import { WeaponName } from "../types/weapon";
import { Monster } from "./Monster";
import { Weapon } from "./Weapon";

export class Player {
  private health: number;
  private strength: number;
  private weapons: Weapon[];
  private consoleInput: ConsoleInput;
  private consoleHelper: ConsoleHelper;
  private fightLogs: string[];

  constructor() {
    this.consoleInput = new ConsoleInput();
    this.consoleHelper = new ConsoleHelper();
    this.health = 100;
    this.weapons = [];
    this.fightLogs = [];
    this.strength = 0;

    for (let i = 0; i < this.weapons.length; i++) {
      this.strength += this.weapons[i].getPower();
    }
  }

  public async showFightLogs(): Promise<void> {
    console.clear();
    let message = "";
    this.fightLogs.forEach((log) => (message += `${log}\n`));

    this.consoleHelper.sendMessage(
      message.length > 0 ? message : "No logs yet"
    );

    const isClose = await this.consoleInput.getInputString(
      (value) => value === "y",
      "Close logs (y): "
    );

    if (isClose === "y") {
      return;
    }
  }

  public getHealth(): number {
    return this.health;
  }

  public setStrength(value: number): void {
    this.strength = value;
  }

  public setHealth(callback: (prev: number) => number): void {
    this.health = callback(this.health);
  }

  public getStrength(): number {
    return this.strength;
  }

  public addWeapon(weaponName: WeaponName): void {
    if (this.weapons.length === 2) {
      const newWeapon = new Weapon(weaponName);
      const weaponOne = this.weapons[0];
      const weaponTwo = this.weapons[1];

      if (weaponOne.getPower() < weaponTwo.getPower()) {
        this.removeWeapon(weaponOne.getName());
      } else {
        this.removeWeapon(weaponTwo.getName());
      }

      this.weapons.push(newWeapon);
    } else {
      const weapon = new Weapon(weaponName);
      this.weapons.push(weapon);
    }

    let strength = 0;

    for (let i = 0; i < this.weapons.length; i++) {
      strength += this.weapons[i].getPower();
    }

    this.setStrength(strength);
  }

  public removeWeapon(weaponName: WeaponName): void {
    if (this.weapons.length === 0) {
      console.log("--- Your weapon slots are empty ---");
    } else {
      this.weapons = this.weapons.filter((item) => {
        return item.getName() !== weaponName;
      });
    }
  }

  public fightEnemy(monster: Monster, currentRoomId: number): boolean {
    if (monster.getStrength() > this.strength) {
      // Monster stronger than player
      this.fightLogs.push(
        `(Room ${currentRoomId}) > ${monster.getName()} dealed ${
          monster.getStrength() - this.strength
        } Damage to Player. ${monster.getName()} is still alive`
      );
      this.health -= monster.getStrength() - this.strength;

      return false;
    } else {
      // Player stronger than monster
      this.fightLogs.push(
        `(Room ${currentRoomId}) > Player has killed ${monster.getName()}`
      );

      if (this.strength - monster.getStrength() < 50) {
        this.fightLogs.push(
          `(Room ${currentRoomId}) > ${monster.getName()} dealed 5 Damage to Player`
        );
        this.health -= 5;
      }

      return true;
    }
  }

  public async showInventory(): Promise<void> {
    console.clear();
    console.log("=".repeat(45));
    console.log(`Health Points: ${this.health}`);
    console.log(`Strength: ${this.strength}`);
    console.log("-".repeat(45));

    for (let i = 0; i < this.weapons.length; i++) {
      console.log(
        `Weapon ${i + 1}: ${this.weapons[i].getName()} (Power ${this.weapons[
          i
        ].getPower()})`
      );
    }

    console.log("=".repeat(45));

    const isClose = await this.consoleInput.getInputString(
      (value) => value === "y",
      "Close inventory? (y): "
    );

    if (isClose === "y") {
      return;
    }
  }
}
