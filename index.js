const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const upload = require('./multer');
const app = express();

const PORT = 5000;

app.use(cookieParser());
app.use(
  session({
    secret: 'U!RPR()JECT',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 24 * 6 * 60 * 10000,
      httpOnly: true,
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

app.use(morgan('dev'));

const userRouter = require('./routes/user-route');
const boardRouter = require('./routes/board-route');

app.use('/board', boardRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  req.session.userId = 'hi';
  res.send('success');
});

app.post('/write', upload.single('images'), (req, res) => {
  const { location } = req.file;

  res.send(location);
});

app.post('/thumbnail', upload.single('thumbnail'), (req, res) => {
  const { location } = req.file;

  res.send(location);
});

app.listen(PORT, () => {
  console.log(`Server Start on port ${PORT}`);
});
