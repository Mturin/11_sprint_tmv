const initialCards = [];
 /* {
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
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
   }  */ 
//];


//8-1 класс Card (создание карточек)

class Card {
  constructor (name, link) {
    this.name = name;
    this.link = link;
    this.cardElement = this.create(this.name, this.link);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.bigImagePopup);
  }
  create (name, link) {

    const placeCardContainer = document.createElement('div'); 
    placeCardContainer.classList.add('place-card'); 
                
    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    placeCardContainer.appendChild(cardImage);
    cardImage.style.backgroundImage = `url(${link})`;
  
    const deleteButton=document.createElement('button');
    deleteButton.classList.add('place-card__delete-icon');

    placeCardContainer.appendChild(cardImage); 
    cardImage.appendChild(deleteButton);

    const cardDescription=document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName=document.createElement('h3');
    cardName.classList.add('place-card__name');
    cardName.textContent = name;

    const likeButton=document.createElement('button');
    likeButton.classList.add('place-card__like-icon');

    placeCardContainer.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeButton);
         
    return placeCardContainer;
  }  

  like (event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    
    event.target.closest('.place-card').remove();
    event.stopPropagation();
   //api.deleteCard(event);
  }

  bigImagePopup (event) {
          
      const imageLink = event.target.getAttribute('style');
      let imageLinkBig = imageLink.slice(23, -3); // Проверка 2 лучше const - нет перезаписи данных
      bigImage.style.backgroundImage = `url(${imageLinkBig})`;
      imagePopup.classList.add('popup_is-opened');
      imagePopup.classList.add('popup__content_image');
      
    };
};

//8-2 класс CardList (хранение карточек)
const placesList = document.querySelector('.places-list');
const addName = document.querySelector('.popup__input_type_name');
const addLink = document.querySelector('.popup__input_type_link-url');

class CardList {
  constructor (container, cards) {
    
    this.placesList = container;
    this.initialCards = cards;
    this.render ();
    
  }
  addCard (card) {
         
    const newCard = new Card (card.name, card.link);  
    this.placesList.appendChild(newCard.cardElement);
    
  };
   render () {
     
    for (let i = 0; i < this.initialCards.length; i++) {
      this.addCard(this.initialCards[i]);
      
    }
}};

const cardList = new CardList(placesList, initialCards); 

//8-3 класс Popup (всплывающие(модальные) окна)

const placePopup = document.querySelector('.popup__addPlace');
const userPopup = document.querySelector('.popup__user');
const imagePopup = document.querySelector('.popup__image');


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
 

//Обработчики открытия
const addFormButton = document.querySelector('.user-info__button');
const editUserButton = document.querySelector('.edit-info__button');
const bigImage = document.querySelector('.popup__content_image');
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
const userAddButton = document.querySelector('.popup__button_user');
const placeAddButton = document.querySelector('.popup__button');
userAddButton.addEventListener('submit', function(){
  popup.close();
});
placeAddButton.addEventListener('submit', function(){
  popup.close();
});

/*-------------------------------*/
const imageForm = document.querySelector('.popup__form');
const editUserForm = document.querySelector('.popup__form_user');
const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');
const userForm = document.querySelector('.popup__user');
const newUserName = document.querySelector('.popup__input_user_name');
const newUserJob = document.querySelector('.popup__input_user_job');

const avatarForm = document.querySelector('.popup__form_userAvatar');
const userAvatar = document.querySelector('.user-info__name');

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
  //event.preventDefault();
  popup.close();
  document.forms.new.reset();
 };
imageForm.addEventListener('submit', submitCardHandler);

//-----------//

//Валидация форм

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

/*----------------------------------*/
const serverUrl =  'http://95.216.175.5/cohort4/';
const tokenId = 'ed04d379-667a-425d-8832-1fd2e4bf52d4';
//let cardID = _id.value;

class Api {
  constructor (serverUrl, tokenId) {
    this.serverUrl = serverUrl;
    this.tokenId = tokenId;
    this.getUser ();
    this.getInitialCards ();
    //this.patchProfile ();
    //this.postCard ();
  }
  getUser(){
    fetch(this.serverUrl + 'users/me', {
      method: 'GET',
      headers: {
        authorization: this.tokenId
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      else return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
        userName.textContent = result.name;
        userJob.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  patchProfile() {
    
    fetch(this.serverUrl + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: this.tokenId,
        'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: newUserName.value,
        about: newUserJob.value,
        //avatar: 'https://bugaga.ru/uploads/posts/1190025059_x_c97031ef7d.jpg'
      })
  })
      .then(res => res.json())
      .then((result) => {
        newUserInfo (result.name, result.about)
        
        //userPhoto.style.backgroundImage = `url(${result.avatar})`;
      })
      .catch((err)=>{
        console.log(`Ошибка: ${err.status}`);
      })
}
  getInitialCards() {
    fetch(this.serverUrl + 'cards', {
      method: 'GET',
        headers: {
            authorization: this.tokenId,
        }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }else {
        return Promis.reject(`Ошибка: ${res.status}`)
      }})
    .then((result) => {
      new CardList(placesList, result); 
    })
    .catch((err)=>{
          console.log('ОШИБКА: '+err);
    })
  }
  postCard(addName, addLink) {
    
    fetch(this.serverUrl + 'cards', {
      method: 'POST',
      headers: {
          authorization: this.tokenId,
          'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: addName,
        link: addLink
      })
    })
  }
//   deleteCard (id){
   
//     fetch(this.serverUrl + 'cards/' + id, {
//       method: 'DELETE',
//       headers: {
//           authorization: this.tokenId,
//           //'Content-Type': 'application/json'
//     }
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }
//     })
//     })
// }
}
const api = new Api(serverUrl, tokenId);  


/*ТМ: Добрый вечер, направляю на проверку ДЗ по 9-му спринту. К огромному сожалению, я не сделал доп. задания, жутко отстаю по врмени =((((
      Заранее благодарю за уделенное время 
      UPD-1: У меня получилась загрузка собственных карточек!!!
      Я искренне понимаю весь "монструозный" ужас моего кода, особенно в части валидации, когда-нибудь я обязательно это перепишу =))
      Последние  темы (Классы и API) оказались самыми сложными, работа давалась очень тяжело,
      последняя вообще поставила в ступор, вроде все понятно, сделай запрос, получи данные, выполни действия,
      но вот как это все начать прямо растерялся. Сейчас, радует что данный скил мне не требуется прямо срочно для поиска работы,
       и будет время для чтения и закрытия пробелов, тем более, посмотрев на вебинары по собеседованиям, я прекрасно понимаю,
       что мне предстоит еще ооочень много работы в данном направлении.
        Надеюсь, что данная работа заслуживает оценки "удл", и еще раз благодарю Вас за уделенное время.
        
        P.S. Я честно, не специально закинул на сервервер дубли 9 тыс. карточек, зато, удалось реализовать добавление собственных карточек =)))))))*/



/**
 * Здравствуйте. 
 * За свой код никогда не переживайте, кто-то и такое не напишет ;)
 * 
 * Не смог поменять имя в профиле. Очень удивило что имя вшито в классе API чего делять нельзя. 
 * 
 * Ни каких вызовов методов в классе API yне должно быть. Сейчас у Вас 
 *     this.getUser ();
    this.getInitialCards ();
    this.patchProfile ();
    Вызывать надо из класса к которому относится метод
 * 
 * 
 * Логичнее, если бы методы класса API возвращали управление на место вызова. В текущей ситуации у вас это не происходит (надо поправить)
 * 
 * Не очень хорошо так делать 
 * function cardLinkValidate() {
  addLink.addEventListener('input', function () {
 * Из функции могу понять что вы её вызываете для того чтобы повесить слушатель. 
 * 
 * Слушатели надо разделить с логикой. Логику перенести в отдельный метод класса (с возможностью переиспользовать)
 * 
 * то что внутри 
 * imageForm.addEventListener('input', function() {
 * Я бы разбил на 3 метода класса и вызывал бы по необходимости
 * 
 * Очень много дублирования кода. Вы с ним сможете быстро разобраться если перенесёте в методы класса.
 * 
 * Плохая практика добавлять карточку в конструкторе класса
 *     this.cardElement = this.create(this.name, this.link);
 * Такие классы не тестируемые. Конструктор нужен для инициализации. и какую либо логику или действия добавлять туда нельзя
 * 
 * метод  render в классе CardList в качестве параметра должен принимать массив объектов для отрисовки карточек. Нельзя вызывать отрисовку из 
 * конструктора. Самое правильное решение сделать ещё метод для записи в переменную this.initialCards;
 * 
 * В классе Popup метод close сплошное дублирование 
 *   this.**********.classList.remove('popup_is-opened');
 * 
 *  Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
 * выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
 * Для примера : const lang = { validationLenght: 'Должно быть от 2 до 30 символов' } 
 * 
 * вот такой момент 
 *     this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.cardElement.querySelector('.place-card__image').addEventListener('click', this.bigImagePopup);
    лучше повесить на родителя слушатель и в методе класса уже решать к чему относится событие

 * https://learn.javascript.ru/event-delegation
 * https://developer.mozilla.org/ru/docs/Learn/JavaScript/Building_blocks/%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F
 * http://code.mu/books/javascript/dom/prodvinutaya-rabota-s-objektom-event-na-javascript.html
 * 
 * Вот такие условия 
 *   }else if (newUserName.value.length < 2 || newUserName.value.length >30 || newUserJob.value.length < 2 ||  newUserJob.value.length > 30) {
 * надо упрощать 
 * 
 * Жду Ваши исправления )
 * 
 */

 //Доброй ночи! =)))
 // Направляю вторую версию своего "шедевра"....
 // Касаемо замечаний текущего спринта исправил загрузку информации о пользователе, если честно, не верно понял задание
 // Касаемо вызовов методов в API, с этим справился частично..... упорно не хочет работать вызов this.getInitialCards () ((((

// Касаемо дублрования кода и разделения на классы валидации, тут прошу меня простить, 
//я честно постараюсь сделать и в целом переписать работу, чисто для самого себя.
// Сами Классы дались мне ужасно тяжело, прошлый спринт выполнял четко по шагам в тренажере, 
//при сдаче работы, ревьювер мне объяснил что это и для чего.

// Для примера, 7-й спринт (до классов), оказался самым понятным для меня,я впервые четко понимал что делаю и для чего =))) 
//но потом пришли классы =))
//Сам процесс мне очень нравится, нравится видеть результат, нравится учиться новому, хоть и ужасно тяжело все дается и в будущем,
//я очень хочу изучить его плотнее

//Если У вас нет критических замечаний по текущему спринту, прошу пропустить работу, исправить свои "косяки" прошлых спринтов, 
//я уже не успею, дед лайн через 14 часов =(((
  
// Еще раз благодарю за уделенное время!

/**
 * В конструкторе класса API не допустимы действия вызовов реализации
 *  this.getUser ();
    this.getInitialCards ();
 * 
  У вас эта проблема везде и при создании карточки
      this.cardElement = this.create(this.name, this.link);
      Это критично, но я не буду Вас тормозить, надеясь на то что вы исправите в будущем
      
    Главное правило: конструктор класса только для инициализации переменных, объектов, но не действий или вызовов
 * 
 */