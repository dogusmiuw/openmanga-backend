exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({message: "Access denied: Admins only"});
    }
    next();
};

exports.isModerator = (req, res, next) => {
    if (req.user.role === "moderator" || req.user.role === "admin") {
        return next();
    }
    return res
        .status(403)
        .json({message: "Access denied: Moderators or Admins only"});
};
