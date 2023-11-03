const createError = require("http-errors");
const bcrypt = require("bcryptjs");
<<<<<<< HEAD
=======
const validation = require("../../utils/validation.json");
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

const User = require("../../models/userModel");

exports.getProfile = (req, res, next) => {
  const user = req.user._doc;

  // Hide fields
  delete user.password;
  delete user.blocked;
  delete user.__v;
  delete user.favourites;

  res.json({ success: true, user });
};

exports.editProfile = async (req, res, next) => {
  try {
    // Not allowed to change
    delete req.body.email;
    delete req.body.password;

    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v -favourites");

    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword)
<<<<<<< HEAD
      return next(createError.BadRequest("changePass.oldPassword"));
    if (!newPassword)
      return next(createError.BadRequest("changePass.newPassword"));

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return next(createError.BadRequest("changePass.wrongPassword"));
=======
      return next(createError.BadRequest(validation.oldPassword));
    if (!newPassword)
      return next(createError.BadRequest(validation.newPassword));

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return next(createError.BadRequest(validation.wrongPassword));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
<<<<<<< HEAD
      message: "changePass.updated",
=======
      message: validation.pwSuccess,
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
    });
  } catch (error) {
    next(error);
  }
};
<<<<<<< HEAD
=======

>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
