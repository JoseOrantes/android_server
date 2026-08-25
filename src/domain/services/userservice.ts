import { User } from '../../models/usermodel';

export interface IUserService {
  createUser(data: Partial<User>): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  updateUser(id: number, data: Partial<User>): Promise<boolean>;
  deleteUser(id: number): Promise<boolean>;
}
