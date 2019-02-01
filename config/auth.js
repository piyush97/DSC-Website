module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        //req.flash("Please login");
        res.redirect('/admin');
    }
};