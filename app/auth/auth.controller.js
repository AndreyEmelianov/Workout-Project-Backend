import { Prisma } from '../prisma.js';
//@desc Auth user
//@route POST /api/auth/login
//@access Public

export const authUser = async (req, res) => {
	const user = await Prisma.user.findMany();
	res.json(user);
};
