const bcrypt = require('bcrypt');
const { Administrator, Assembler } = require('../db/models');

/**
 * Завершает запрос с ошибкой аутентификации
 * @param {object} res Ответ express
 */
function failAuth(res) {
  res.redirect('/auth/admin');
}
function failAuthAssembler(res) {
  res.redirect('/auth/assembler');
}

/**
 * Подготавливает пользователя для записи в сессию
 * Мы не хотим хранить пароль в сессии, поэтому извлекаем только нужные данные
 * @param {object} user Объект пользователя из БД
 */
function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
  };
}

function serializeAssembler(user) {
  return {
    id: user.id,
    name: user.name,
    brigade_id: user.brigade_id,
    role: user.role,
  };
}

exports.isValid = (req, res, next) => {
  next();
};

exports.authRender = (req, res) => {
  res.render('auth');
};

exports.adminRender = (req, res) => {
  res.render('auth-admin');
};

exports.assemblerRender = (req, res) => {
  res.render('auth-assembler');
};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Пытаемся сначала найти пользователя в БД
    const user = await Administrator.findOne({ where: { email }, raw: true });
    if (!user) return failAuth(res);

    // Сравниваем хэш в БД с хэшем введённого пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    // const isValidPassword = user.password === password;

    if (!isValidPassword) return failAuth(res);

    // записываем в req.session.user данные (id & name) (создаем сессию)
    req.session.user = serializeUser(user);
    res.redirect('/admin');
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
    return failAuth(res);
  }
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.checkAssemblerAndCreateSession = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Пытаемся сначала найти пользователя в БД
    const user = await Assembler.findOne({ where: { email }, raw: true });
    if (!user) return failAuthAssembler(res);

    // Сравниваем хэш в БД с хэшем введённого пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return failAuthAssembler(res);

    // записываем в req.session.user данные (id & name & brigade_id) (создаем сессию)
    req.session.user = serializeAssembler(user);
    res.redirect('/assembler');
  } catch (err) {
    console.error('Err message:', err.message);
    console.error('Err code', err.code);
    return failAuthAssembler(res);
  }
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.destroySession = (req, res, next) => {
  // console.log('DESTROY');
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie('sid');
    res.redirect('/');
  });
};
