module.exports = (req, res, next) => {
    if (req.user.is_admin !== 2) {
        res.redirect('/dashboard');
        return null;
    }
    next();
}
