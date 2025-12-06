export const authHandler = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized: Please log in to access this resource");
  }
};
