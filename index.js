const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
    origin: 'https://urproject.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  })
);

const userRouter = require('./routes/user-route');
const boardRouter = require('./routes/board-route');

app.use('/board', boardRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server Start on port ${PORT}`);
});
