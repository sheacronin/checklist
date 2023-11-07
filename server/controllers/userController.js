const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

exports.getUser = (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
        .populate('tasks')
        .exec((err, user) => {
            if (err) return next(err);

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    tasks: user.tasks,
                },
            });
        });
};

exports.getCurrentUser = [
    passport.authenticate('jwt', { session: false }),

    (req, res, next) => {
        res.json({ user: { id: req.user._id, username: req.user.username } });
    },
];

exports.createUser = [
    body(
        'username',
        'Username must be specified and be at least 3 and no more than 20 characters'
    )
        .trim()
        .isLength({ min: 3, max: 20 })
        .escape(),
    body('password', 'You must have a password').trim().isLength({ min: 1 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }
        // Indicates success of this synchronous custom validator
        return true;
    }),

    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            const errors = validationResult(req);

            const user = new User({
                username: req.body.username,
                password: hashedPassword,
            });

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Something is not right', errors });
            } else {
                User.findOne({ username: user.username }).exec(
                    (err, foundUser) => {
                        if (err) return next(err);

                        if (foundUser) {
                            return res.status(400).json({
                                message:
                                    'A user with this username already exists',
                            });
                        } else {
                            user.save((err) => {
                                if (err) return next(err);

                                res.json({
                                    username: user.username,
                                });
                            });
                        }
                    }
                );
            }
        });
    },
];

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
                info,
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            // generate a signed on web token with the contents
            // of user object and return it in the response

            const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
                expiresIn: '1h',
            });

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 3600000,
                sameSite: 'None',
                secure: true,
            });

            return res.json({
                user: { id: user._id, username: user.username },
                token,
            });
        });
    })(req, res);
};

exports.logoutUser = (req, res, next) => {
    // Remove the token cookie
    res.cookie('token', '', {
        httpOnly: true,
        maxAge: 1,
        sameSite: 'None',
        secure: true,
    });
    res.json({ message: 'Token cookie has been destroyed' });
};
