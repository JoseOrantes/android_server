import { IUserService } from '../../domain/services/userservice';
import User from '../../models/usermodel';

export class UserServiceImpl implements IUserService {
  async createUser(data: Partial<User>) {
    const user = await User.create(data as any);
    return user;
  }

  async getUserById(id: number) {
    return User.findByPk(id);
  }

  async getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async updateUser(id: number, data: Partial<User>) {
    const [affected] = await User.update(data as any, { where: { id_user: id } });
    return affected > 0;
  }

  async deleteUser(id: number) {
    const affected = await User.destroy({ where: { id_user: id } });
    return affected > 0;
  }
}

export default new UserServiceImpl();
