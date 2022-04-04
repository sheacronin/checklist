const User = require('../models/user');

exports.getUser = (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
        .populate('tasks')
        .exec((err, user) => {
            if (err) return next(err);

            res.json(user);
        });
};
