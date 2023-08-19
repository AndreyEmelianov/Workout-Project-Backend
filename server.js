import 'colors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { errorHandler, notFound } from './app/middleware/error.middleware.js';

import authRoutes from './app/auth/auth.routes.js';
import exerciseRoutes from './app/exercise/exercise.routes.js';
import { Prisma } from './app/prisma.js';
import userRoutes from './app/user/user.routes.js';

dotenv.config();

const app = express();

async function main() {
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.use(express.json());

	const __dirname = path.resolve();

	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

	app.use('/api/auth', authRoutes);
	app.use('/api/users', userRoutes);
	app.use('/api/exercises', exerciseRoutes);

	app.use(notFound);
	app.use(errorHandler);

	const PORT = process.env.PORT || 5000;

	app.listen(
		PORT,
		console.log(
			`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
		)
	);
}

main()
	.then(async () => {
		await Prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await Prisma.$disconnect();
		process.exit(1);
	});
