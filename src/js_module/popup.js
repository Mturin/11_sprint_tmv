import {placePopup, userPopup, imagePopup} from "./variables.js"
import {imageForm, editUserForm, userName, userJob, newUserName, newUserJob, userAddButton, placeAddButton, editUserButton, bigImage, addName, addLink} from "./variables.js"
import {api} from "./api.js"
import {cardList} from "./cardlist.js"


class Popup {
    constructor (placePopup, userPopup, imagePopup) {
      this.placePopup = placePopup;
      this.userPopup = userPopup;
      this.imagePopup = imagePopup;
    }
    open (event) {
      if (event.target.contains(addFormButton)) {
        this.placePopup.classList.add('popup_is-opened');
      }
      else if (event.target.contains(editUserButton)) {
        this.userPopup.classList.add('popup_is-opened');
      }
     
    };
       
    close () {
      if (event.target.contains(closeButton)) {
        this.placePopup.classList.remove('popup_is-opened');
      }else if (event.target.contains(userCloseButton)) {
        this.userPopup.classList.remove('popup_is-opened');
      }else if (event.target.contains(closeImageButton)) {
        this.imagePopup.classList.remove('popup_is-opened');
      }   
      else if (event.target.contains(userAddButton)) {
        this.userPopup.classList.remove('popup_is-opened');
        event.preventDefault();
      } else if (event.target.contains(placeAddButton)) {
        this.placePopup.classList.remove('popup_is-opened');
        event.preventDefault();
      }
    }
  };
  const popup = new Popup(placePopup, userPopup, imagePopup);

  export {Popup, popup}

  //Обработчики открытия
const addFormButton = document.querySelector('.user-info__button');
addFormButton.addEventListener('click', function () {
  popup.open(event);
});
editUserButton.addEventListener('click', function () {
  popup.open(event);
});
bigImage.addEventListener('click', function () {
  popup.open(event);
});

//Обработчики закрытия на крестики
const closeButton = document.querySelector('.popup__close');
const userCloseButton = document.querySelector('.popup__close_user');
const closeImageButton = document.querySelector('.popup__close_image');
closeButton.addEventListener('click', function () {
  popup.close();
});
userCloseButton.addEventListener('click', function () {
  popup.close();
});
closeImageButton.addEventListener('click', function () {
  popup.close();
});

//Обработчики закрытия на кнопку
userAddButton.addEventListener('submit', function(){
  popup.close();
});
placeAddButton.addEventListener('submit', function(){
  popup.close();
});

function newUserInfo (name, about) {
    userName.textContent = name;
    userJob.textContent = about;
    
  };
  
  function changeUser (){
     
    newUserInfo(newUserName.value, newUserJob.value);
    api.patchProfile();
    popup.close();
    
  };
  editUserForm.addEventListener('submit', changeUser);
  
  function submitCardHandler () {
    cardList.addCard ({name: addName.value, link: addLink.value});
    api.postCard(addName.value, addLink.value);
    popup.close();
    document.forms.new.reset();
   };
  imageForm.addEventListener('submit', submitCardHandler);

  