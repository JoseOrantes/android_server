import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../infrastructure/database/sequelize';
import User from './usermodel';

// Profile attributes (profile table schema)
interface ProfileAttributes {
  id: number;
  userId: number;
  fotoBase64?: string | null;
  telefono?: string | null;
  fechaNac?: Date | null;
  genero?: string | null;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}

// Profile model
export class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
  public id!: number;
  public userId!: number;
  public fotoBase64!: string | null;
  public telefono!: string | null;
  public correo!: string | null;
  public fechaNac!: Date | null;
  public genero!: string | null;
}

Profile.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    fotoBase64: { type: DataTypes.TEXT, allowNull: true },
    telefono: { type: DataTypes.STRING(50), allowNull: true },
    fechaNac: { type: DataTypes.DATE, allowNull: true },
    genero: { type: DataTypes.STRING(10), allowNull: true },
  },
  { sequelize, tableName: 'profiles', timestamps: true }
);

// Association: Profile belongs to User
Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });

export default Profile;
