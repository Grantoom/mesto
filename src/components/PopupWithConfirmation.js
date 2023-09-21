import Popup from './Popup.js';

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupConfirmButton = this._popupItem.querySelector('.popup__confirm');
        this._submitHandler = null;
    }
    
    addSubmitHandler(handler) {
      this._submitHandler = handler;
      this._popupConfirmButton.addEventListener("click", () => {
        this._submitHandler();
        this._popupConfirmButton.removeEventListener("click", this._submitHandler);
      });
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._popupConfirmButton.addEventListener('click', () => {
          this._submitHandler();
        });
    }
}
