import { Monster } from "./Monster";
import { Weapon } from "./Weapon";

export class Room {
  private id: number;
  private monsters: Monster[];
  private roomReward: Weapon;

  constructor(id: number, monsters: Monster[], roomReward: Weapon) {
    this.id = id;
    this.monsters = monsters;
    this.roomReward = roomReward;
  }

  public getRoomReward(): Weapon {
    return this.roomReward;
  }

  public getId(): number {
    return this.id;
  }

  public getMonsters(): Monster[] {
    return this.monsters;
  }

  public addMonster(monster: Monster): void {
    this.monsters.push(monster);
  }

  public removeMonster(monster: Monster): void {
    this.monsters = this.monsters.filter(
      (item) => item.getName() !== monster.getName()
    );
  }
}
