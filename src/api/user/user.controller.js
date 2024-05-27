import { HttpException } from '../../shared/utils/http-exception.js';
import * as userRepository from './user.repository.js';

export const findAll = async (req, res, next) => {
    try {
        const users = await userRepository.findAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const create = async (req, res, next) => {
    const { name, age } = req.body;

    try {
        if (!name || !age) {
            throw new HttpException('Name and age are required', 400);
        }

        const parsedAge = parseInt(age);

        if (isNaN(parsedAge)) {
            throw new HttpException('Please enter correct age', 400);
        }

        const user = { name, age: parsedAge };
        const createdUser = await userRepository.save(user);

        res.status(201).json(createdUser);
    } catch (err) {
        next(err);
    }
};

export const findOne = async (req, res, next) => {
    try {
        const user = await userRepository.findById(req.params.id);

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    const { name, age } = req.body;

    try {
        if (!name && !age) {
            throw new HttpException('Name or age is required', 400);
        }

        const updatedData = {};

        if (name) {
            updatedData.name = name;
        }

        if (age) {
            const parsedAge = parseInt(age);

            if (isNaN(parsedAge)) {
                throw new HttpException('Please enter correct age', 400);
            }

            updatedData.age = parsedAge;
        }

        const updatedUser = await userRepository.update(req.params.id, updatedData);

        if (!updatedUser) {
            throw new HttpException('User not found', 404);
        }

        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const success = await userRepository.remove(req.params.id);

        if (!success) {
            throw new HttpException('User not found', 404);
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
