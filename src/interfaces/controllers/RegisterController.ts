import { Request, Response } from 'express';
import { sequelize } from '../../infrastructure/database/sequelize';
import userService from '../../infrastructure/services/UserServiceImpl';
import profileService from '../../infrastructure/services/ProfileService';

// Register controller: creates user and profile in a transaction
// Returns standardResponse envelope with created resources
export const register = async (req: Request, res: Response) => {
  const { nombre, apellido, usuario, password, fotoBase64, telefono, correo, email, fechaNac, genero } = req.body;
  const emailToUse = correo || email;
  if (!usuario || !password || !emailToUse) return res.status(400).json({ standardResponse: { httpCode: 400, message: 'usuario, email and password required' } });

  // Transaction: create user and profile together
  const t = await sequelize.transaction();
  try {
    // create user (email stored in users table)
    const user = await (userService as any).createUser({ nombre, apellido, usuario, password, email: emailToUse } as any, { transaction: t });
    
    // create profile (do not duplicate email in profile)
    const profile = await profileService.createProfile((user as any).id_user, { fotoBase64, telefono, fechaNac, genero } as any, { transaction: t });
    await t.commit();

    const userObj = (user.toJSON ? user.toJSON() : user) as any;
    delete userObj.password;

    return res.status(201).json({
      standardResponse: { httpCode: 201, message: 'Usuario y perfil creados exitosamente' },
      body: { user: { id: userObj.id_user, nombre: userObj.nombre, apellido: userObj.apellido, usuario: userObj.usuario }, profile }
    });
  } catch (err) {
    await t.rollback();
    console.error('Register error:', err);
    return res.status(500).json({ standardResponse: { httpCode: 500, message: 'Registro falló' } });
  }
};
