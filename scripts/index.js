const editProfileBtn = document.querySelector('.profile__edit-button');
const popup_editProfile = document.querySelector('.popup_edit-profile');
const popup_addPhoto = document.querySelector('.popup_add-photo');
const profileEditor = document.profileEditor;
const cardsEditor = document.cardsEditor;

const myname = profileEditor.nameEditProfile;
const about = profileEditor.aboutEditProfile;
const nickName = document.querySelector('.profile__section-title');
const description = document.querySelector('.profile__section-subtitle');
const closeBtnProfile = document.querySelector('.popup__exit_editProfile');
const closeBtnPhoto = document.querySelector('.popup__exit_add-photo');
const popup = document.querySelector('.popup');



const addCardsBtn = document.querySelector('.profile__add-button');

const cardsName = document.querySelector('.popup__input_NameCard');
const cardsDescription = document.querySelector('.popup__input_UrlCard');

addCardsBtn.addEventListener('click', function () {
  popup_addPhoto.classList.add('popup_opened');
});

editProfileBtn.addEventListener('click', function () {
  popup_editProfile.classList.add('popup_opened');
    myname.value = nickName.textContent;
    about.value = description.textContent;
});

function handleFormSubmit(evt) {
    evt.preventDefault();
    if (myname.value.length > 0 && about.value.length > 0) {
        nickName.textContent = myname.value;
        description.textContent = about.value;
        popup_editProfile.classList.remove('popup_opened');
    } else {
        myname.setAttribute("placeholder", 'Введите имя');
        about.setAttribute("placeholder", 'Введите информацию о себе');
    }
};

profileEditor.addEventListener('submit', handleFormSubmit);

closeBtnProfile.addEventListener('click', () => {
  popup_editProfile.classList.remove('popup_opened');
});


const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

//контейнер
  const cardContainer = document.querySelector('.cardsPlace');
  const cardTemplate = document.querySelector('#card-template').content;

  showCards ();

  function handleCardSubmit(evt) {
  const nameInput = document.querySelector('#name');
  const linkInput = document.querySelector('#link');
  
  evt.preventDefault();
  
  const item = {
  name: nameInput.value,
  link: linkInput.value
  }
  
  if (nameInput.value.length > 0 && linkInput.value.length > 0) {
  initialCards.unshift(item);
  showCards();
  nameInput.value = "";
  linkInput.value = "";
  popup_addPhoto.classList.remove('popup_opened'); // закрытие формы
  } else {
  nameInput.setAttribute("placeholder");
  linkInput.setAttribute("placeholder");
  }
  }
  
  cardsEditor.addEventListener('submit', handleCardSubmit);
  
  closeBtnPhoto.addEventListener('click', () => {
  popup_addPhoto.classList.remove('popup_opened');
  });
  
    

  function showCards () {

    
    let cards = initialCards.map ((item) => {
      // клонируем содержимое тега template
      const cardsElement = cardTemplate.querySelector('.element').cloneNode(true);
      
  
      // наполняем содержимым
      cardsElement.querySelector('.element__img').src = item.link;
      cardsElement.querySelector('.element__text').textContent = item.name;
  
      //Ставить лайки
      cardsElement.querySelector('.element__vector').addEventListener('click', (e) => {
        e.target.classList.toggle('element__vector_active')
    });
  
      // отображаем на странице
      return cardsElement;

      });

      cardContainer.replaceChildren(...cards);

  }