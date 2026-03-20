// Check if user is logged in
export const checkLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "You must be logged in to access that page");
    return res.redirect("/auth/login");
  }
  next();
};

// Check if user is an admin
export const checkAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    req.flash("error", "You do not have permission to access that page");
    return res.redirect("/");
  }
  next();
};

// Check if user is a seller
export const checkSeller = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "seller") {
    req.flash("error", "You must be a seller to access that page");
    return res.redirect("/");
  }
  next();
};

// Check if user is a buyer
export const checkBuyer = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "buyer") {
    req.flash("error", "You must be a buyer to access that page");
    return res.redirect("/");
  }
  next();
};