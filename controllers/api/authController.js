const jwt = require("jsonwebtoken");
const createError = require("http-errors");
<<<<<<< HEAD
=======
const validation = require("../../utils/validation.json");
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
const { sendWelcome, sendLink } = require("../../utils/sendMail");

const User = require("../../models/userModel");

// To ensure that a valid user is logged in.
exports.checkUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

<<<<<<< HEAD
    if (!token) return next(createError.Unauthorized("auth.provideToken"));
=======
    if (!token) return next(createError.Unauthorized(validation.provideToken));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("+blocked +password");

<<<<<<< HEAD
    if (!user) return next(createError.Unauthorized("auth.login"));
    if (user.blocked) return next(createError.Unauthorized("auth.blocked"));
=======
    if (!user) return next(createError.Unauthorized(validation.login));
    if (user.blocked) return next(createError.Unauthorized(validation.blocked));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// Just check if valid user is logged, doesn't throw error if not
exports.isUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) return next();

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("+blocked +password");

    if (user) req.user = user;

    next();
  } catch (error) {
    next();
  }
};

exports.register = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
<<<<<<< HEAD
    if (userExist) return next(createError.Conflict("auth.alreadyRegistered"));
=======
    if (userExist)
      return next(createError.Conflict(validation.alreadyRegistered));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

    const user = await User.create({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
<<<<<<< HEAD
      companyName: req.body.companyName,
=======
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
      location: req.body.location,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postalCode: req.body.postalCode,
      lastLogin: Date.now(),
    });

    // Hide fields
    user.password = undefined;
    user.__v = undefined;

    // Send welcome mail
    sendWelcome(user.email, user.fname);

    const token = user.generateAuthToken();
    res.status(201).json({ success: true, token, user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
<<<<<<< HEAD
      return next(createError.BadRequest("Provide email and password!"));

    const user = await User.findOne({ email }).select("+password -__v");

    if (!user) return next(createError.BadRequest("auth.invalidEmail"));

    if (!user.password)
      return next(createError.BadRequest("auth.resetRequired"));

    if (!(await user.correctPassword(password, user.password)))
      return next(createError.BadRequest("auth.invalidPassword"));
=======
      return next(createError.BadRequest(validation.incorrectCredentials));

    const user = await User.findOne({ email }).select("+password -__v");

    if (!user) return next(createError.BadRequest(validation.invalidEmail));

    if (!user.password)
      return next(createError.BadRequest(validation.resetRequired));

    if (!(await user.correctPassword(password, user.password)))
      return next(createError.BadRequest(validation.invalidPassword));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    // Hide fields
    user.password = undefined;

    const token = user.generateAuthToken();
    res.json({ success: true, token, user });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
<<<<<<< HEAD
    if (!user) return next(createError.NotFound("resetPassword.notRegistered"));
=======
    if (!user) return next(createError.NotFound(validation.notRegistered));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b

    // Generate a reset token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const link = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    // Send an email to the user with the reset link
    sendLink(user.email, link);

    res.json({
      success: true,
<<<<<<< HEAD
      message: "resetPassword.linkSent",
=======
      message: validation.linkSent,
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    // Verify the token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Update the user's password
    const user = await User.findById(userId);
<<<<<<< HEAD
    if (!user)
      return next(createError.BadRequest("resetPassword.tokenInvalid"));
=======
    if (!user) return next(createError.BadRequest(validation.tokenInvalid));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
    user.password = password;
    await user.save();

    const authToken = user.generateAuthToken();
    res.json({
      success: true,
<<<<<<< HEAD
      message: "resetPassword.success",
=======
      message: validation.pwSuccess,
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
      token: authToken,
      user,
    });
  } catch (error) {
    if (error.message == "jwt expired" || error.message == "invalid signature")
<<<<<<< HEAD
      return next(createError.BadRequest("resetPassword.tokenInvalid"));
=======
      return next(createError.BadRequest(validation.tokenInvalid));
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
    next(error);
  }
};
