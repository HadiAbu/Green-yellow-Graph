class Greet {
  name: string | undefined;
  constructor(name: string | undefined) {
    this.name = name;
  }
  public greet() {}
  public getName() {}
}
export class newGreet extends Greet {
  public greet() {
    return this.name;
  }
}
