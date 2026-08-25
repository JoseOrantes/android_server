import app from './app';
import initDatabase from './infrastructure/database/initDatabase';

const PORT = process.env.PORT || 3000;

async function start() {
	await initDatabase();
	app.listen(PORT, () => {
		console.log(`Server listening on port ${PORT}`);
	});
}

void start();
