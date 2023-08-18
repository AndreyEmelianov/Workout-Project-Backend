import { faker } from '@faker-js/faker';
import { hash } from 'argon2';
import asyncHandler from 'express-async-handler';

import { Prisma } from '../prisma.js';
import { UserFields } from '../utils/user.utils.js';

import { generateToken } from './generate-token.js';

//@desc Auth user
//@route POST /api/auth/login
//@access Public

export const authUser = asyncHandler(async (req, res) => {
	const user = await Prisma.user.findMany({
		where: {
			password1: 'wewr'
		}
	});
	res.json(user);
});

//@desc Register user
//@route POST /api/auth/register
//@access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const isHaveUser = await Prisma.user.findUnique({
		where: {
			email
		}
	});

	if (isHaveUser) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = await Prisma.user.create({
		data: {
			email,
			password: await hash(password),
			name: faker.name.fullName()
		},
		select: UserFields
	});

	const token = generateToken(user.id);

	res.json({ user, token });
});