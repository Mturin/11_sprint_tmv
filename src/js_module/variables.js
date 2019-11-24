const placesList = document.querySelector('.places-list');
const addName = document.querySelector('.popup__input_type_name');
const addLink = document.querySelector('.popup__input_type_link-url');
const initialCards = [];
const placePopup = document.querySelector('.popup__addPlace');
const userPopup = document.querySelector('.popup__user');
const imagePopup = document.querySelector('.popup__image');
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4/' : 'https://praktikum.tk/cohort4/';
const tokenId = 'ed04d379-667a-425d-8832-1fd2e4bf52d4';
const imageForm = document.querySelector('.popup__form');
const editUserForm = document.querySelector('.popup__form_user');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const newUserName = document.querySelector('.popup__input_user_name');
const newUserJob = document.querySelector('.popup__input_user_job');
const userAddButton = document.querySelector('.popup__button_user');
const placeAddButton = document.querySelector('.popup__button');
const editUserButton = document.querySelector('.edit-info__button');
const bigImage = document.querySelector('.popup__content_image');

export {initialCards, placesList, addName, addLink, placePopup, userPopup, imagePopup, serverUrl, tokenId, imageForm, editUserForm, userName, userJob, newUserName, newUserJob, userAddButton, placeAddButton, editUserButton, bigImage}