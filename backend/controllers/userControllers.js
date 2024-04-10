const User = require('../models/userModel');


exports.getAllUsers = async (req, res, next) => {
    const user = await User.find();
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
};
exports.getUser = async (req, res, next) => {
        const user = await User.findById(req.params.id);
        if (!user) {
            // const error = new Error('No user found with that ID');
            // error.statusCode = 404;
            // error.status = 'fail';
            // return next(error);
        }
        res.status(200).json({
          status: 'success',
          data: {
              user
          }
        });
      }; 