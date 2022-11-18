/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const requestIp = require('request-ip');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./utils/Token');
const { authLimiter } = require('./middlewares/AuthLimiter');
const errorHandler = require('./middlewares/ErrorMiddleware');
const imagesRoute = require('./routes/imagesRoute');
const authRoute = require('./routes/authRoute');
const multer = require('multer');

const app = express();

// Initialize environment config
dotenv.config();

app.use(morgan('dev'));

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestIp.mw());

const whitelist = [process.env.WHITE_LISTED_DOMAIN];
// enable cors
const corsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
};

app.use(cors(corsOptions));
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/auth/login', authLimiter);

// Application routes
app.use('/images', imagesRoute);
app.use('/auth', authRoute);

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, new Date.now() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  dest: 'public/uploads/',
});

app.post('/image-upload', upload.single('profileImg'), (req, res, next) => {
  try {
    console.log(req.file);
    console.log('/images/' + req.file.filename);
    res.json({ imageUrl: url + '/images/' + req.file.filename });
  } catch (error) {
    console.log(error);
  }
});
// send back a 404 error for any unknown api request
app.all('*', (req, res, next) => {
  next(ApiError(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND)));
});

app.use(errorHandler);
app.use(express.static('public'));

const port = process.env.PORT;

// Run the application
try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (e) {
  console.log('Error in running the service:', e);
}
