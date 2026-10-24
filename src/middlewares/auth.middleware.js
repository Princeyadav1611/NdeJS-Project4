const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: "Please Login to create Music",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res.status(403).json({
        message: "Only Artists can create Music",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unable to Create music",
      error: err.message,
    });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: "Please Login to Listen Music",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist" && decoded.role!=="user") {
      return res.status(403).json({
        message: "Only LoogedIn one can listen or create Music",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Unable to Create music",
      error: err.message,
    });
  }
}

module.exports = { authArtist, authUser };
