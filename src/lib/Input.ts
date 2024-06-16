import { rl } from "./readline";

export default class ConsoleInput {
  public async getInputNumber(
    validStatement: (value: number) => boolean,
    question?: string
  ): Promise<number> {
    return new Promise((resolve) => {
      const askQuestion = () => {
        rl.question(question || "", (answer) => {
          const parsedValue = parseInt(answer, 10);

          if (!isNaN(parsedValue) && validStatement(parsedValue)) {
            resolve(parsedValue);
          } else {
            askQuestion();
          }
        });
      };

      askQuestion();
    });
  }

  public async getInputString(
    validStatement: (value: string) => boolean,
    question?: string
  ): Promise<string> {
    return new Promise((resolve) => {
      const askQuestion = () => {
        rl.question(question || "", (answer) => {
          if (validStatement(answer)) {
            resolve(answer);
          } else {
            askQuestion();
          }
        });
      };

      askQuestion();
    });
  }
}
