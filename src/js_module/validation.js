import {imageForm, editUserForm, newUserName, newUserJob, addName, addLink, userAddButton, placeAddButton} from "./variables.js"

function userNameValidate() {
    editUserForm.addEventListener('input', function () {
  
      const errorMessageUser=document.querySelector('.error_user');
  
      if (newUserName.value.length === 0){
        errorMessageUser.textContent='Это обязательное поле';
        userAddButton.setAttribute('disabled', true);
        userAddButton.classList.remove ('popup__button_active');
      }
      else if (newUserName.value.length < 2 || newUserName.value.length >30){
        errorMessageUser.textContent='Должно быть от 2 до 30 символов';
        userAddButton.setAttribute('disabled', true);
        userAddButton.classList.remove ('popup__button_active');
      
      }else {
        errorMessageUser.textContent='';
        userAddButton.removeAttribute('disabled');
        userAddButton.classList.add('popup__button_active');
      }  
    })};
  userNameValidate();
  
  function userJobValidate() {
    editUserForm.addEventListener('input', function () {
  
      const errorMessage=document.querySelector('.error_job');
  
      if (newUserJob.value.length === 0){
        errorMessage.textContent='Это обязательное поле';
        userAddButton.setAttribute('disabled', true);
        userAddButton.classList.remove ('popup__button_active');
      }
      else if (newUserJob.value.length < 2 || newUserJob.value.length >30) {
        errorMessage.textContent='Должно быть от 2 до 30 символов';
        userAddButton.setAttribute('disabled', true);
        userAddButton.classList.remove ('popup__button_active');
      
      }else {
            errorMessage.textContent='';
            userAddButton.removeAttribute('disabled');
            userAddButton.classList.add ('popup__button_active');
    }})};
  userJobValidate();
  
  editUserForm.addEventListener('input', function() {
    
    if (newUserName.value.length === 0 || newUserJob.value.length === 0) {
      userAddButton.setAttribute('disabled', true);
      userAddButton.classList.remove ('popup__button_active');
    }else if (newUserName.value.length < 2 || newUserName.value.length >30 || newUserJob.value.length < 2 ||  newUserJob.value.length > 30) {
      userAddButton.setAttribute('disabled', true);
      userAddButton.classList.remove ('popup__button_active');
    }else{
      userAddButton.removeAttribute('disabled');
      userAddButton.classList.add ('popup__button_active');
    }
  });
  
  function cardNameValidate() {
    addName.addEventListener('input', function () {
    
      const errorMessageCard=document.querySelector('.error_card');
        
      if (addName.value.length === 0){
        errorMessageCard.textContent='Это обязательное поле';
        placeAddButton.setAttribute('disabled', true);
        placeAddButton.classList.remove ('popup__button_active');
    
      } else if (addName.value.length < 2 || addName.value.length > 30){
        errorMessageCard.textContent='Должно быть от 2 до 30 символов';
        placeAddButton.setAttribute('disabled', true);
        placeAddButton.classList.remove ('popup__button_active');
            
      }else {
        errorMessageCard.textContent='';
        placeAddButton.removeAttribute('disabled');
        placeAddButton.classList.add ('popup__button_active');
  }})};
      cardNameValidate();
   
  function cardLinkValidate() {
    addLink.addEventListener('input', function () {
      
      const chekLink = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
      const errorMessage=document.querySelector('.error_link');
         
      if (addLink.value.length === 0){
        errorMessage.textContent='Это обязательное поле';
        placeAddButton.setAttribute('disabled', true);
        placeAddButton.classList.remove ('popup__button_active');
      
      }else if(!chekLink.test(addLink.value)) {
        errorMessage.textContent='Здесь должна быть ссылка';
        placeAddButton.setAttribute('disabled', true);
        placeAddButton.classList.remove ('popup__button_active');
                  
      }else {
        errorMessage.textContent='';
        placeAddButton.removeAttribute('disabled');
        placeAddButton.classList.add ('popup__button_active');
  }})};
  cardLinkValidate();
  
  imageForm.addEventListener('input', function() {
    
    if (addName.value.length === 0 || addLink.value.length === 0) {
      placeAddButton.setAttribute('disabled', true);
      placeAddButton.classList.remove ('popup__button_active');
    }else if (addName.value.length < 2 || addName.value.length >30 || addLink.value.length < 2) {
      placeAddButton.setAttribute('disabled', true);
      placeAddButton.classList.remove ('popup__button_active');
    }else{
      placeAddButton.removeAttribute('disabled');
      placeAddButton.classList.add ('popup__button_active');
    }
  });

  export {userNameValidate, userJobValidate, cardNameValidate, cardLinkValidate}