// Ambient module declarations to satisfy TS for optional deps
declare module 'bcrypt' {
	const bcrypt: any;
	export default bcrypt;
}

declare module 'jsonwebtoken' {
	const jwt: any;
	export default jwt;
	export function verify(token: string, secret: string): any;
	export function sign(payload: any, secret: string, options?: any): string;
}
