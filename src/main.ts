import app from './app';
import initDatabase from './infrastructure/database/initDatabase';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function start() {
	await initDatabase();
	app.listen(Number(PORT), HOST, () => {
		console.log(`Server listening on ${HOST}:${PORT}`);
	});
}

void start();
