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

//@desc  Update exercise
//@route  PUT api/exercise/:id
//@access Private

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, iconPath } = req.body;

	try {
		const exercise = await Prisma.exercise.update({
			where: {
				id: Number(req.params.id)
			},
			data: {
				name,
				times,
				iconPath
			}
		});

		res.json(exercise);
	} catch (error) {
		res.status(404);
		throw new Error('Exercise not found!');
	}
});

//@desc  Delete exercise
//@route  DELETE api/exercise/:id
//@access Private

export const deleteExercise = asyncHandler(async (req, res) => {
	try {
		const exercise = await Prisma.exercise.delete({
			where: {
				id: Number(req.params.id)
			}
		});

		res.json({ message: `Exercise deleted!` });
	} catch (error) {
		res.status(404);
		throw new Error('Exercise not found!');
	}
});
