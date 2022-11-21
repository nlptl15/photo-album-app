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
const e = require('express');

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
app.use('/images-data', imagesRoute);
app.use('/auth', authRoute);

const fs = require('fs');
app.use('/images', express.static('images'));
app.get('/images/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const imageName = req.params.imageName;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/').reverse()[0]);
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
});

const uploadImg = multer({
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
});

const imagesModel = require('../src/models/imagesModel');
const auth = require('./middlewares/AuthMiddleware');

app.post('/image-upload', auth(), uploadImg.single('image'), async (req, res) => {
  const result = {
    error: false,
    data: {},
  };
  try {
    const imagePath = req.file.path;
    const { body } = req;
    console.log(req.body);
    const saveData = {
      title: body.title,
      imageSrc: 'http://localhost:3010/' + imagePath,
      userId: req.user.id,
      imageLabels: body.imageLabels || '',
    };
    if (body.imageId) {
      const qData = await imagesModel.updateById(body.imageId, saveData);
      if (qData) {
        result.data = qData;
      } else {
        result.error = true;
        result.status = StatusCodes.INTERNAL_SERVER_ERROR;
        result.message = 'Something went wrong while adding image.';
      }
    } else {
      const qData = await imagesModel.save(saveData);
      if (qData) {
        result.data = qData;
      } else {
        result.error = true;
        result.status = StatusCodes.INTERNAL_SERVER_ERROR;
        result.message = 'Something went wrong while creating image.';
      }
    }

    if (result.error) {
      next(ApiError(result.status, result.message));
    } else {
      res.json({ success: true, data: result.data });
    }
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
