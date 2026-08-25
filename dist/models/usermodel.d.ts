import { Model, Optional } from 'sequelize';
interface UserAttributes {
    id_user: number;
    email: string;
    password: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id_user'> {
}
export declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id_user: number;
    email: string;
    password: string;
}
export default User;
//# sourceMappingURL=usermodel.d.ts.map