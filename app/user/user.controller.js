import asyncHandler from 'express-async-handler';

import { Prisma } from '../prisma.js';
import { UserFields } from '../utils/user.utils.js';

//@desc  GET user profile
//@route GET /api/users/profile
//@access Private

export const getUserProfile = asyncHandler(async (req, res) => {
	const user = await Prisma.user.findUnique({
		where: {
			id: req.user.id
		},
		select: UserFields
	});

	res.json(user);
});
