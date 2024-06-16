import { Weapon } from "./Weapon";

export class Monster {
  private name: string;
  private strength: number;
  private weapon: Weapon;

  constructor(name: string, weapon: Weapon) {
    this.name = name;
    this.weapon = weapon;
    this.strength = weapon.getPower();
  }

  public getName(): string {
    return this.name;
  }

  public getStrength(): number {
    return this.strength;
  }

  public getWeapons(): Weapon {
    return this.weapon;
  }
}
