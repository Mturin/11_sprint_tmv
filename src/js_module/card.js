import {bigImage} from "./variables.js"
import {imagePopup} from "./variables.js"
export class Card {
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
    
    }
  
    bigImagePopup (event) {
            
        const imageLink = event.target.getAttribute('style');
        const imageLinkBig = imageLink.slice(23, -3);
        bigImage.style.backgroundImage = `url(${imageLinkBig})`;
        imagePopup.classList.add('popup_is-opened');
        imagePopup.classList.add('popup__content_image');
        
      };
  };