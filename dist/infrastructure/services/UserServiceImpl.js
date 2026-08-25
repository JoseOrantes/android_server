"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServiceImpl = void 0;
const usermodel_1 = __importDefault(require("../../models/usermodel"));
class UserServiceImpl {
    async createUser(data) {
        const user = await usermodel_1.default.create(data);
        return user;
    }
    async getUserById(id) {
        return usermodel_1.default.findByPk(id);
    }
    async getUserByEmail(email) {
        return usermodel_1.default.findOne({ where: { email } });
    }
    async updateUser(id, data) {
        const [affected] = await usermodel_1.default.update(data, { where: { id_user: id } });
        return affected > 0;
    }
    async deleteUser(id) {
        const affected = await usermodel_1.default.destroy({ where: { id_user: id } });
        return affected > 0;
    }
}
exports.UserServiceImpl = UserServiceImpl;
exports.default = new UserServiceImpl();
//# sourceMappingURL=UserServiceImpl.js.map