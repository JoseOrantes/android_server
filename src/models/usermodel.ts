import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../infrastructure/database/sequelize';

interface UserAttributes {
  id_user: number;
  email: string;
  password: string;
  nombre?: string;
  apellido?: string;
  usuario?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id_user'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_user!: number;
  public email!: string;
  public password!: string;
  public nombre!: string;
  public apellido!: string;
  public usuario!: string;
}

User.init(
  {
    id_user: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING(200), allowNull: false, unique: true },
    nombre: { type: DataTypes.STRING(100), allowNull: true },
    apellido: { type: DataTypes.STRING(100), allowNull: true },
    usuario: { type: DataTypes.STRING(100), allowNull: true, unique: true },
    password: { type: DataTypes.STRING(255), allowNull: false },
  },
  { sequelize, tableName: 'users', timestamps: true }
);

export default User;
