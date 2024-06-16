import { weaponsList } from "../constants/weapons";
import { WeaponName } from "../types/weapon";

export class Weapon {
  private power: number;
  private name: WeaponName;

  constructor(name: WeaponName) {
    this.name = name;
    this.power = weaponsList[name];
  }

  public getPower(): number {
    return this.power;
  }

  public getName(): WeaponName {
    return this.name;
  }
}
