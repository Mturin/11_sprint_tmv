import {Card} from "./card.js"
import {initialCards, placesList} from "./variables.js"


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

  export {CardList, cardList}