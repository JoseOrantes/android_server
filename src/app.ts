import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './interfaces/routes/userRoutes';
import authRoutes from './interfaces/routes/authRoutes';

dotenv.config();

const corsOrigins = (process.env.CORS_ORIGINS || '')
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean);

const app = express();

app.use(
	cors({
		origin(origin, callback) {
			if (!origin || corsOrigins.length === 0 || corsOrigins.includes(origin)) {
				return callback(null, true);
			}
			return callback(new Error('CORS origin not allowed'));
		},
	})
);
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', authRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

export default app;
