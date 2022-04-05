const User = require('../models/user');
const Task = require('../models/task');
const passport = require('passport');
const { body, validationResult } = require('express-validator');

exports.createTask = [
    body('text', 'Task text must be specified')
        .trim()
        .isLength({ min: 1 })
        .escape(),

    passport.authenticate('jwt', { session: false }),

    (req, res, next) => {
        const errors = validationResult(req);

        const task = new Task({
            text: req.body.text,
        });

        if (!errors.isEmpty()) {
            res.status(400).json({
                message: 'There was an issue',
                errors: errors.array(),
            });
            return;
        } else {
            task.save((err) => {
                if (err) return next(err);

                // Add task to current user
                User.findByIdAndUpdate(
                    req.body.userId,
                    { $push: { tasks: task._id } },
                    { new: true },
                    (err, theUser) => {
                        if (err) return next(err);
                    }
                );

                res.json({ task });
            });
        }
    },
];

exports.deleteTask = [
    passport.authenticate('jwt', { session: false }),

    (req, res, next) => {
        const { taskId } = req.params;

        // Remove task from User's array
        User.findByIdAndUpdate(
            req.cookies.currentUser.id,
            { $pull: { tasks: taskId } },
            { new: true },
            (err, theUser) => {
                if (err) return next(err);
            }
        );

        Task.findByIdAndRemove(taskId, (err, theTask) => {
            if (err) return next(err);

            res.json({
                message: `Task "${theTask.text}" has been successfully deleted`,
            });
        });
    },
];
