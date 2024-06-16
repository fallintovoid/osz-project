import ConsoleInput from "./Input";

export class ConsoleHelper {
  public sendMessage(message: string) {
    console.log("=".repeat(60));
    console.log(message);
    console.log("=".repeat(60));
  }

  public async openMenu(
    options: string[],
    consoleHelper: ConsoleInput
  ): Promise<number> {
    options.forEach((option, i) => {
      console.log(`${i + 1}. ${option}`);
    });
    console.log("=".repeat(60));

    return await consoleHelper.getInputNumber(
      (value) => value >= 1 && value <= options.length,
      "Choose option: "
    );
  }
}
