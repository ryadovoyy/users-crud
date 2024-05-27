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
            return res.status(400).json({ message: 'Name and age are required' });
        }

        const parsedAge = parseInt(age);

        if (isNaN(parsedAge)) {
            return res.status(400).json({ message: 'Please enter correct age' });
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
            return res.status(404).json({ message: 'User not found' });
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
            return res.status(400).json({ message: 'Name or age is required' });
        }

        const updatedData = {};

        if (name) {
            updatedData.name = name;
        }

        if (age) {
            const parsedAge = parseInt(age);

            if (isNaN(parsedAge)) {
                return res.status(400).json({ message: 'Please enter correct age' });
            }

            updatedData.age = parsedAge;
        }

        const updatedUser = await userRepository.update(req.params.id, updatedData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
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
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).end();
    } catch (err) {
        next(err);
    }
};
