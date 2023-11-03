const multer = require("multer");

module.exports = (error, req, res, next) => {
  // console.log(error);

  if (error instanceof multer.MulterError) {
    // handle MulterError
    req.flash("red", error.message);
    if (req.route.path.startsWith("/image/:id/"))
      url = `/product/image/${req.originalUrl.split("/")[3]}`;
    else url = req.originalUrl;

    return res.redirect(url);
  }

  if (error.code == 11000) {
    return res.status(403).json({
<<<<<<< HEAD
      success: false,
=======
      success : false,
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
      message: `${Object.keys(error.keyPattern)[0]} is already registered.`,
    });
  }

  if (error.name === "ValidationError") {
    let errors = {};
    Object.keys(error.errors).forEach(
      (key) => (errors[key] = error.errors[key].message)
    );
    return res.status(400).json({
<<<<<<< HEAD
      success: false,
=======
      success : false,
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
      errors,
    });
  }

  if (error.name == "BadRequestError" && error.message.errors) {
    let errors = {};
    Object.keys(error.message.errors).forEach((key) => {
      let myKey = key;
      if (myKey.includes(".")) myKey = myKey.split(".").pop();
      errors[myKey] = error.message.errors[key].message;
    });
<<<<<<< HEAD
    return res.status(400).json({ success: false, errors });
=======
    return res.status(400).json({ success : false, errors });
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
  }

  if (error.name == "MulterError") error.status = 413;

  if (
    error.message.toString().includes(": ") &&
    error.name == "BadRequestError"
  ) {
    error.message = error.message.toString().split(": ").pop();
  }
  res.status(error.status || 500).json({
<<<<<<< HEAD
    success: false,
=======
    success : false,
>>>>>>> 431f3f6c1603b243346ddac0284bd6378eec011b
    message: error.message,
    errorCode: res.errorCode,
  });
};
