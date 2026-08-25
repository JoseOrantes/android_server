import { IUserService } from '../../domain/services/userservice';
import User from '../../models/usermodel';
export declare class UserServiceImpl implements IUserService {
    createUser(data: Partial<User>): Promise<User>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(id: number, data: Partial<User>): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
}
declare const _default: UserServiceImpl;
export default _default;
//# sourceMappingURL=UserServiceImpl.d.ts.map