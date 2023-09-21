export default class Popup {
  // Принимает в конструктор селектор popup
  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Метод открытия popup
  open() {
    this._popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Метод закрытия popup
  close() {
    this._popupItem.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Метод для закрытия popup по нажатию на клавишу Escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        this.close(); 
    }
  }

   // Метод закрытия popup по клику за область формы, в том числе и на кнопку крестик
   setEventListeners() {
      this._popupItem.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || 
            evt.target.classList.contains('popup__exit')) {
            this.close();
        }
      });
   }
}