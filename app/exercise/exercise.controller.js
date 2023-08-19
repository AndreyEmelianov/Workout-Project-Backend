import asyncHandler from 'express-async-handler';

import { Prisma } from '../prisma.js';

//@desc  Create new exercise
//@route  Post api/exercise
//@access Private

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body;

	const exercise = await Prisma.exercise.create({
		data: {
			name,
			times,
			iconPath
		}
	});

	res.json(exercise);
});

//@desc  Get exercises
//@route  Get api/exercises
//@access Private

export const getExercises = asyncHandler(async (req, res) => {
	const exercises = await Prisma.exercise.findMany();

	res.json(exercises);
});
