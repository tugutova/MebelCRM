exports.checkAuthForAssembler = (req, res, next) => {
  if (req.session.user.role === '1') next();
  else res.redirect('/auth/assembler');
};

exports.checkAuthForAdministrator = (req, res, next) => {
  if (req.session.user.role === '0') next();
  else res.redirect('/auth/admin');
};
