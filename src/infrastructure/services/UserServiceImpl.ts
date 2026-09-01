import User from '../../models/usermodel';
import bcrypt from 'bcrypt';
import { sequelize } from '../database/sequelize';

// Service implementation for user operations (no strict interface enforcement)
export class UserServiceImpl {
  private async getUserTableColumns(): Promise<Set<string>> {
    const colsDesc: any = await sequelize.getQueryInterface().describeTable('users');
    return new Set(Object.keys(colsDesc));
  }

  private pickExistingColumns(existing: Set<string>, columns: string[]) {
    return columns.filter((column) => existing.has(column));
  }

  async createUser(data: Partial<User>, options?: any): Promise<User> {
    if ((data as any).password) {
      const hash = await bcrypt.hash((data as any).password as string, 10);
      (data as any).password = hash;
    }
    // Ensure we only insert columns that exist in the database to avoid SQL errors
    // Use describeTable to avoid mariadb driver formatting issues
    const existing = await this.getUserTableColumns();
    const insertData: any = {};
    if (existing.has('email') && ((data as any).email || (data as any).correo)) insertData.email = (data as any).email || (data as any).correo;
    if (existing.has('password') && (data as any).password) insertData.password = (data as any).password;
    if (existing.has('usuario') && (data as any).usuario) insertData.usuario = (data as any).usuario;
    if (existing.has('nombre') && (data as any).nombre) insertData.nombre = (data as any).nombre;
    if (existing.has('apellido') && (data as any).apellido) insertData.apellido = (data as any).apellido;

    const user = (await User.create(insertData as any, options)) as User;
    return user;
  }

  async getUserById(id: number) {
    const existing = await this.getUserTableColumns();
    return User.findByPk(id, {
      attributes: this.pickExistingColumns(existing, ['id_user', 'email', 'password', 'nombre', 'apellido', 'usuario']),
    });
  }

  async getUserByEmail(email: string) {
    const existing = await this.getUserTableColumns();
    return User.findOne({
      where: { email },
      attributes: this.pickExistingColumns(existing, ['id_user', 'email', 'password', 'nombre', 'apellido', 'usuario']),
    });
  }

  // Find by username (case-sensitive lookup)
  async getUserByUsername(usuario: string) {
    const existing = await this.getUserTableColumns();
    if (!existing.has('usuario')) return null;
    return User.findOne({
      where: { usuario },
      attributes: this.pickExistingColumns(existing, ['id_user', 'email', 'password', 'nombre', 'apellido', 'usuario']),
    });
  }

  async updateUser(id: number, data: Partial<User>) {
    if ((data as any).password) {
      const hash = await bcrypt.hash((data as any).password as string, 10);
      (data as any).password = hash;
    }
    const existing = await this.getUserTableColumns();
    const updateData: any = {};
    if (existing.has('email') && (data as any).email) updateData.email = (data as any).email;
    if (existing.has('password') && (data as any).password) updateData.password = (data as any).password;
    if (existing.has('usuario') && (data as any).usuario) updateData.usuario = (data as any).usuario;
    if (existing.has('nombre') && (data as any).nombre) updateData.nombre = (data as any).nombre;
    if (existing.has('apellido') && (data as any).apellido) updateData.apellido = (data as any).apellido;
    const [affected] = await User.update(updateData as any, { where: { id_user: id } });
    return affected > 0;
  }

  async changePassword(id: number, currentPassword: string, newPassword: string) {
    const existing = await this.getUserTableColumns();
    const user = await User.findByPk(id, {
      attributes: this.pickExistingColumns(existing, ['id_user', 'password']),
    });
    if (!user) return false;
    const ok = await bcrypt.compare(currentPassword, (user as any).password);
    if (!ok) return false;
    const hash = await bcrypt.hash(newPassword, 10);
    const [affected] = await User.update({ password: hash } as any, { where: { id_user: id } });
    return affected > 0;
  }

  async deleteUser(id: number) {
    const affected = await User.destroy({ where: { id_user: id } });
    return affected > 0;
  }
}

export default new UserServiceImpl();
