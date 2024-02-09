

const checkAuth = (req, res, next) => {
    res.locals.loggedIn = req.session.loggedIn || false;
    next();
}

module.exports = checkAuth;