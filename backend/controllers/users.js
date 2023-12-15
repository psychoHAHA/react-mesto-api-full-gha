const bcrypt = require('bcrypt');
const user = require('../models/user');
const generateToken = require('../utils/jwt');

const ErrorNotFound = require('../errors/errorNotFound');
const ErrorValidation = require('../errors/errorValidation');
const ErrorConflict = require('../errors/errorConflict');
const ErrorAuth = require('../errors/errorAuth');

const MONGO_DUPLICATE_ERROR_CODE = 11000;

const getUsers = async (req, res, next) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const userName = await user.findById(req.params.id);

    if (!userName) {
      throw new ErrorNotFound('Пользователь по ID не найден');
    }
    res.status(200).send(userName);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ErrorValidation('Ошибка валидации полей'));

      return;
    }

    next(error);
  }
};

const getUsersInfo = async (req, res, next) => {
  try {
    const userName = await user.findById(req.user._id);

    if (!userName) {
      throw new ErrorNotFound('Пользователь по ID не найден');
    }
    res.send(userName);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const userName = await user.create({
      name,
      about,
      avatar,
      email,
      password: passwordHash,
    });

    res.status(200).send({
      user: {
        name: userName.name,
        about: userName.about,
        avatar: userName.avatar,
        email: userName.email,
      },
    });
  } catch (error) {
    if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
      next(new ErrorConflict('Такой пользователь уже существует'));
    } else if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    } else {
      next(error);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const updatingUser = await user.findByIdAndUpdate(
      req.user._id,
      {
        name,
        about,
      },
      { new: true, runValidators: true }
    );

    if (!updatingUser) {
      throw new ErrorNotFound('Пользователь по ID не найден');
    }

    res.send(updatingUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    }

    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const updatingAvatar = await user.findByIdAndUpdate(
      req.user._id,
      {
        avatar,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new ErrorNotFound('Пользователь по ID не найден');
    }

    res.send(updatingAvatar);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    }

    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userName = await user
      .findOne({ email })
      .select('+password')
      .orFail(() => new ErrorAuth('Неправильные email или password'));

    const matched = await bcrypt.compare(String(password), userName.password);

    if (!matched) {
      throw new ErrorAuth('Неправильные email или password');
    }

    const token = generateToken({
      _id: userName._id,
      email: userName.email
    });

    res.status(200).send({ jwt: token });
  } catch (error) {
    next(error);
  }
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   return user
//     .findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user.id }, JWT_SECRET);

//       res.status(200).send({ token });
//     })
//     .catch(next);
// };

// const createUser = (req, res, next) => {
//   const { name, about, avatar, password, email } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) => user.create({ name, about, avatar, email, password: hash }))
//     .then((data) => res.status(201).send(data))
//     .catch((error) => {
//       if (error.code === MONGO_DUPLICATE_ERROR_CODE) {
//         next(new ErrorConflict('Такой пользователь уже существует'));
//       } else if (error.name === 'ValidationError') {
//         next(new ErrorValidation('Ошибка валидации полей'));
//       } else {
//         next(error);
//       }
//     });
// };

// const getUsers = (req, res, next) => {
//   user
//     .find({})
//     .then((users) => res.send(users))
//     .catch(next);
// };

// const getUserData = (id, res, next) => {
//   user
//     .findById(id)
//     .orFail(() => new ErrorNotFound('Пользователь по заданному id не найден'))
//     .then((users) => res.send(users))
//     .catch(next);
// };

// const getUsersById = (req, res, next) => {
//   getUserData(req.params.id, res, next);
// };

// const getUsersInfo = (req, res, next) => {
//   getUserData(req.user.id, res, next);
// };

// const updateUserData = (req, res, next) => {
//   const {
//     user: { _id },
//     body,
//   } = req;
//   user
//     .findByIdAndUpdate(_id, body, { new: true, runValidators: true })
//     .orFail(() => new ErrorNotFound('Пользователь по заданному id не найден'))
//     .then((user) => res.send(user))
//     .catch(next);
// };

// const updateUser = (req, res, next) => updateUserData(res, req, next);

// const updateAvatar = (req, res, next) => updateUserData(res, req, next);

module.exports = {
  getUsers,
  getUsersById,
  getUsersInfo,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
