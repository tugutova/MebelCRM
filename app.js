const express = require('express');
const multer = require('multer');
// Для фото и док-ов
const upload = multer({ dest: 'uploads/' }); // Для фото и док-ов
const createError = require('http-errors');
const logger = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const pgSessionStore = require('connect-pg-simple')(session);
require('dotenv').config();

const port = process.env.PORT;
const app = express();

// Импортируем routers
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const assemblerRouter = require('./routes/assembler');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(
  session({
    name: 'sid', // название куки
    store: new pgSessionStore({
      conString: //  настройки для подключения к БД, которая хранит куки (в данном случае это та же самая БД, которую мы используем в проекте)
        process.env.DB_MEB === 'production'
          ? process.env.DB_MEB
          : process.env.DB_MEB,
    }),
    secret: process.env.STR, // ключ для шифрования cookies // require('crypto').randomBytes(10).toString('hex')
    resave: false, // Если true,  пересохраняет сессию, даже если она не поменялась
    saveUninitialized: false, // Если false, куки появляются только при установке req.session
    cookie: {
      secure: process.env.NODE_ENV === 'production', // В продакшне нужно "secure: true" для HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 10, // время жизни cookies, ms (10 дней)
    },
  }),
);

app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/assembler', assemblerRouter);
// app.use('/upload', uploadRouter);

// Отлавливаем ошибки:
app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});
app.use((err, req, res, next) => {
  const appMode = req.app.get('env');
  let error;
  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }
  res.locals.message = err.message;
  res.locals.error = error;
  res.status(err.status || 500);
  // Формируем HTML-текст из шаблона "error.hbs" и отправляем его на клиент в качестве ответа.
  res.render('error'); //! !! Создать error.hbs
});

app.listen(port, () => {
  console.log(`server started PORT: ${port}`);
});
