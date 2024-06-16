"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("./readline");
class ConsoleInput {
    getInputNumber(validStatement, question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const askQuestion = () => {
                    readline_1.rl.question(question || "", (answer) => {
                        const parsedValue = parseInt(answer, 10);
                        if (!isNaN(parsedValue) && validStatement(parsedValue)) {
                            resolve(parsedValue);
                        }
                        else {
                            askQuestion();
                        }
                    });
                };
                askQuestion();
            });
        });
    }
    getInputString(validStatement, question) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const askQuestion = () => {
                    readline_1.rl.question(question || "", (answer) => {
                        if (validStatement(answer)) {
                            resolve(answer);
                        }
                        else {
                            askQuestion();
                        }
                    });
                };
                askQuestion();
            });
        });
    }
}
exports.default = ConsoleInput;
