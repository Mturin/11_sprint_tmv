import {CardList} from "./cardlist.js"
import {placesList, serverUrl, tokenId, userName, userJob, newUserName, newUserJob, addName, addLink, cardList} from "./variables.js"

class Api {
    constructor (serverUrl, tokenId) {
      this.serverUrl = serverUrl;
      this.tokenId = tokenId;
      this.getUser ();
      this.getInitialCards ();
      
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
          about: newUserJob.value
        })
    })
        .then(res => res.json())
        .then((result) => {
          newUserInfo (result.name, result.about)
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
  
  }
  const api = new Api(serverUrl, tokenId);

  export {api}