export class Card {
    constructor(
      cardData,
      templateElementSelector,
      userId,
      handleCardClick,
      handleLikesCard,
      handleCardDeleteLike,
      handleDelete
    ) {
      this._card = cardData;
      this._name = this._card.name;
      this._link = this._card.link;
      this._likes = this._card.likes;
  
      this._templateElementSelector = templateElementSelector;
  
      this._userId = userId;
      this._cardId = this._card._id;
      this._ownerId = this._card.owner._id;
  
      this._handleCardClick = handleCardClick;
      this._handleDelete = handleDelete;
      this._handleLikesCard = handleLikesCard;
      this._handleCardDeleteLike = handleCardDeleteLike;
    }
  
    _getTemplate() {
      const cardElement = document
        .querySelector(this._templateElementSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
    }
  
    updateCardLike(response) {
      this._likes = response.likes;
    }
  
    renderCardLike() {
      this.likesCount.textContent = this._likes.length;
      if (this._likes.find((userLike) => userLike._id === this._userId)) {
        this._elementLikeBtn.classList.add('element__vector_active');
      } else {
        this._elementLikeBtn.classList.remove('element__vector_active');
      }
    }
  
    _interactLike() {
      if (this._likes.find((userLike) => userLike._id === this._userId)) {
        this._handleCardDeleteLike(this._cardId);
      } else {
        this._handleLikesCard(this._cardId);
      }
    }
  
    _remove() {
      this._element.remove();
      this._element = null;
    }
  
    _setEventListeners() {
      this._elementLikeBtn.addEventListener('click', () => {
        this._interactLike();
      });
  
      this._elementDeleteBtn.addEventListener('click', () => {
        this._handleDelete();
      });
  
      this._elementImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__img');
      this._elementName = this._element.querySelector('.element__text');
      this._elementLikeBtn = this._element.querySelector('.element__vector');
      this._elementDeleteBtn = this._element.querySelector('.element__trash');
      this.likesCount = this._element.querySelector('.element__like-count');
  
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._elementName.textContent = this._name;
      this.renderCardLike(this._card);
  
      this._element.querySelector('.element__like-count').textContent = this._likes.length;
  
      if (!(this._ownerId === this._userId)) {
        this._element.querySelector('.element__trash').style.display = 'none';
      }
  
      this._setEventListeners();
  
      return this._element;
    }
  }
  