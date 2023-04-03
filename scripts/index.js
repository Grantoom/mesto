let editProfileBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let editor = document.editor;
let myname = editor.name;
let about = editor.about;
let description = document.querySelector('.profile__section-subtitle');
let nickName = document.querySelector('.profile__section-title');
let closeBtn = document.querySelector('.popup__exit');

editProfileBtn.addEventListener('click', function () {
    popup.classList.add('popup_opened');
    myname.value = nickName.textContent;
    about.value = description.textContent;
})

function handleFormSubmit(evt) {
    evt.preventDefault();
    if (myname.value.length > 0 && about.value.length > 0) {
        nickName.textContent = myname.value;
        description.textContent = about.value;
        popup.classList.remove('popup_opened');
    } else {
        myname.setAttribute("placeholder", 'Введите имя');
        about.setAttribute("placeholder", 'Введите информацию о себе');
    }
}

editor.addEventListener('submit', handleFormSubmit);

closeBtn.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
})