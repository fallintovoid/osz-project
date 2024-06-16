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
exports.ConsoleHelper = void 0;
class ConsoleHelper {
    sendMessage(message) {
        console.log("=".repeat(60));
        console.log(message);
        console.log("=".repeat(60));
    }
    openMenu(options, consoleHelper) {
        return __awaiter(this, void 0, void 0, function* () {
            options.forEach((option, i) => {
                console.log(`${i + 1}. ${option}`);
            });
            console.log("=".repeat(60));
            return yield consoleHelper.getInputNumber((value) => value >= 1 && value <= options.length, "Choose option: ");
        });
    }
}
exports.ConsoleHelper = ConsoleHelper;
