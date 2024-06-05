import { RequestHandler } from 'express';

import { HttpException } from '../../shared/utils/http-exception';
import { dataSource } from '../../shared/db/data-source';
import { User } from './user.model';

const userRepository = dataSource.getRepository(User);

export const findAll: RequestHandler = async (_, res, next) => {
    try {
        const users = await userRepository.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
};

export const create: RequestHandler = async (req, res, next) => {
    const { name, age } = req.body;

    try {
        if (!name || !age) {
            throw new HttpException('Name and age are required', 400);
        }

        const parsedAge = +age;

        if (isNaN(parsedAge)) {
            throw new HttpException('Please enter correct age', 400);
        }

        const createdUser = userRepository.create({ name, age: parsedAge });
        await userRepository.save(createdUser);

        res.status(201).json(createdUser);
    } catch (err) {
        next(err);
    }
};

export const findOne: RequestHandler = async (req, res, next) => {
    try {
        const user = await userRepository.findOneBy({ id: +req.params.id });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const update: RequestHandler = async (req, res, next) => {
    const { name, age } = req.body;

    try {
        if (!name && !age) {
            throw new HttpException('Name or age is required', 400);
        }

        const updatedData: Partial<User> = {};

        if (name) {
            updatedData.name = name;
        }

        if (age) {
            const parsedAge = +age;

            if (isNaN(parsedAge)) {
                throw new HttpException('Please enter correct age', 400);
            }

            updatedData.age = parsedAge;
        }

        const updateResult = await userRepository.update(req.params.id, updatedData);

        if (updateResult.affected === 0) {
            throw new HttpException('User not found', 404);
        }

        const updatedUser = {
            id: +req.params.id,
            ...updatedData
        };

        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
};

export const remove: RequestHandler = async (req, res, next) => {
    try {
        const deleteResult = await userRepository.delete(req.params.id);

        if (deleteResult.affected === 0) {
            throw new HttpException('User not found', 404);
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
