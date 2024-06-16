import { stdin, stdout } from "node:process";
import * as readline from "node:readline";

export const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});