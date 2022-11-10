const Authentication = (req, res, next) => {
    if (!req.session.admin) {
        return res.redirect("/signIn");
    }
    next();
};

const noAuthentication = (req, res, next) => {
    if (req.cookies.CurrentRole == "Admin" && req.session.admin) {
        return res.redirect("/viewMovies");
    }
    else if (req.cookies.CurrentRole == "User" && req.session.user) {
        return res.redirect("/userView");
    }
    next();
};

module.exports = { Authentication, noAuthentication };