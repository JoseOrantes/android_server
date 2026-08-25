import { Request, Response } from 'express';
export declare const createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserByEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateUser: (req: Request, res: Response) => Promise<void>;
export declare const deleteUser: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=UserController.d.ts.map