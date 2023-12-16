const card = require('../models/card');
const ErrorForbiden = require('../errors/errorForbidden');
const ErrorValidation = require('../errors/errorValidation');
const ErrorNotFound = require('../errors/errorNotFound');

const getCards = async (req, res, next) => {
  try {
    const cards = await card.find({}); // ищем карточки

    return res.send(cards); // отправляем карточки
  } catch (error) {
    next(error);
  }
};

// const getCards = (req, res, next) => {
//   card
//     .find({})
//     .then((cards) =>  res.send(cards))
//     .catch(next);
// };

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const newCard = await card.create({ name, link, owner: ownerId }); // содаем новую карточку

    // res.send(newCard);
    return res.send(await newCard.save()); // сохраняем новую карточку и отправляем ее
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    } else {
      next(error);
    }
  }
};

// const createCard = (req, res, next) => {
//   const { name, link } = req.body;
//   const ownerId = req.user;
//   card
//     .create({ name, link, owner: ownerId })
//     .then((cards) => res.status(201).send(cards))
//     .catch((error) => {
//       if (error.name === 'ValidationError') {
//         next(new ErrorValidation('Ошибка валидации полей'));
//       } else {
//         next(error);
//       }
//     });
// };

const deleteCard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const newCardId = req.params.cardId;
    const findCard = await card
      .findById(newCardId)
      .orFail(() => new ErrorNotFound('Карточка для удаления не найдена')); // ищем карточку по id для удаления

    if (!findCard.owner.equals(userId)) {
      throw new ErrorForbiden('Вы не можете удалить чужую карточку'); // если владелец !== id юзера, то отправляем ошибку
    } else {
      const delCard = await card.deleteOne({ _id: newCardId });
      return res.send(delCard); // если нашли удаляем ее и отправляем ответ об этом
    }
  } catch (error) {
    next(error);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const userCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!userCard) {
      throw new ErrorNotFound('Карточка не найдена');
    }

    res.send(userCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ErrorValidation('Ошибка валидации полей'));
    }

    next(error);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const userCard = await card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    if (!userCard) {
      throw new ErrorNotFound('Карточка не найдена');
    }

    res.send(userCard);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new ErrorValidation('Ошибка валидации полей'));

      return;
    }

    next(error);
  }
};

// const getCards = (req, res, next) => {
//   card
//     .find({})
//     .then((cards) => res.send(cards))
//     .catch(next);
// };

// const createCard = (req, res, next) => {
//   const owner = req.user._id;
//   const { name, link } = req.body;
//   card
//     .create({ name, link, owner })
//     .then((cards) => res.status(201).send(cards))
//     .catch((error) => {
//       if (error.name === 'ValidationError') {
//         next(new ErrorValidation('Ошибка валидации полей'));
//       } else {
//         next(error);
//       }
//     });
// };

// const deleteCard = (req, res, next) => {
//   const { id } = req.params;
//   card
//     .findById(id)
//     .orFail(() => new ErrorNotFound('Нет карточки по заданному id'))
//     .then((cards) => {
//       if (cards.owner.equals(req.user._id)) {
//         next(new ErrorForbiden('Вы не можете удалить чужую карточку'));
//       } else {
//         return card.deleteOne(cards).then(() => res.send(cards));
//       }
//     })
//     .catch(next);
// };

// const updateLike = (req, res, next, method) => {
//   const {
//     params: { id },
//   } = req;
//   card
//     .findByIdAndUpdate(id, { [method]: { likes: req.user._id } }, { new: true })
//     .orFail(() => new ErrorNotFound('Нет карточки по заданному id'))
//     .then((cards) => res.send(cards))
//     .catch(next);
// };

// const likeCard = (req, res, next) => updateLike(req, res, next, '$addToSet');

// const dislikeCard = (req, res, next) => updateLike(req, res, next, '$pull');

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
