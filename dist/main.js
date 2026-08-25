"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const initDatabase_1 = __importDefault(require("./infrastructure/database/initDatabase"));
const PORT = process.env.PORT || 3000;
async function start() {
    await (0, initDatabase_1.default)();
    app_1.default.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
void start();
//# sourceMappingURL=main.js.map