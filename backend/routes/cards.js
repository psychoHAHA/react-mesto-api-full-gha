const router = require('express').Router();
const {
  validatePutLikeCard,
  validateDeleteLikeCard,
  validateCreateCard,
  validateDeleteCardById,
} = require('../middlewares/cardValidation');

const {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateDeleteCardById, deleteCard);
router.put('/cards/:cardId/likes', validatePutLikeCard, likeCard);
router.delete('/cards/:cardId/likes', validateDeleteLikeCard, dislikeCard);

module.exports = router;
