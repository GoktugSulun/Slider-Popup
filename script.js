async function fetchData(){
   let response = await fetch('data.json');
   let result = await response.json();
   return result;
}

fetchData()
   .then(result => displayCard(result.datas))

window.addEventListener('load', () => {
   const leftArrow = document.querySelector('.left-arrow');
   const rightArrow = document.querySelector('.right-arrow');
   const cards = document.querySelectorAll('.card');
   
   // right click for slider
   rightArrow.addEventListener('click', () => {
      const style = getComputedStyle(cards[0]);
      const transformValues = style.transform.split(', ');
      const lastValue = Number(transformValues[4]);

      cards.forEach(card => {
         if(lastValue != -2250){
            card.style.transform = `translateX(${lastValue - 375}px)`;
         }
      });

      manageEasySlider(lastValue - 375);
   });

   // left click for slider
   leftArrow.addEventListener('click', () => {  
      const style = getComputedStyle(cards[0]);
      const transformValues = style.transform.split(', ');
      const lastValue = Number(transformValues[4]);

      cards.forEach(card => {
         if(lastValue != 0){
            card.style.transform = `translateX(${lastValue + 375}px)`;
         }    
      });
      manageEasySlider(lastValue + 375);
   });

   // manage easy-slider
   const spanEls = document.querySelectorAll('.easy-slider > span');
   spanEls.forEach((spanEl, index) => {
      spanEl.addEventListener('click', () => {
         let value = 0;

         if(index == 0){
            cards.forEach(card => {
               card.style.transform = `translateX(0)`;
               value = 0;
            });
         }else if(index == 1){
            cards.forEach(card => {
               card.style.transform = `translateX(-1125px)`;
               value = -1125;
            });
         }else if(index == 2){
            cards.forEach(card => {
               card.style.transform = `translateX(-2250px)`;
               value = -2250;
            });
         }

         manageEasySlider(value);
      });
   });

   // popup 
   const aboutMeEls = document.querySelectorAll('.about-me');

   aboutMeEls.forEach((aboutMeEL, index) => {
      aboutMeEL.addEventListener('click', () => {
         fetchData()
            .then(result => updatePopup(result.datas, index))
      });
   });

});

const updatePopup = (datas, i) => {
   const popupContainerEl = document.createElement('div');
   popupContainerEl.classList.add('popup-container');
   popupContainerEl.innerHTML = `
      <div class="close">X</div>
      <header>
         <div class="who">
            <img src="Images/profile (${i+1}).jpg" alt="">
         </div>
         <div class="employee">
            <span class="employee-name"> ${datas[i].name}  ${datas[i].surname} </span>
            <span class="employee-department"> ${datas[i].department} </span>
         </div>
      </header>
      <div class="summary">
         <h2> ABOUT ME </h2>
         <p>
            &nbsp; &nbsp; Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus dolorem praesentium eos in beatae sint placeat, voluptatum quia illum amet vel dolore tempore, eveniet velit fugit debitis officiis unde assumenda maxime quibusdam laboriosam minus voluptatibus?
         </p>
      </div>
      <footer>
         <abbr title="github"> <i class="fab fa-github"></i> </abbr>
         <abbr title="twitter"> <i class="fab fa-twitter"></i> </abbr>
         <abbr title="instagram"> <i class="fab fa-instagram"></i> </abbr>
      </footer>
   `;

   const popupEl = document.querySelector('.popup');
   popupEl.classList.add('active');
   setTimeout(() => {
      popupContainerEl.classList.add('active');
   }, 50);
   popupEl.appendChild(popupContainerEl);

   closePopup(popupContainerEl);
}

const closePopup = (popupContainerEl) => {

   const closeEl = document.querySelector('.close');
   const popupEl = document.querySelector('.popup');

   closeEl.addEventListener('click', () => {

      popupContainerEl.classList.remove('active');
   
      setTimeout(() => {
         popupEl.classList.remove('active');
      }, 500);
      
      setTimeout(() => {
         const popupEl = document.querySelector('.popup');
         popupEl.removeChild(popupContainerEl);
      }, 550);
   });
}


const manageEasySlider = (value) => {
   let spanEls = document.querySelectorAll('.easy-slider > span');
   if(value > -1125){
      spanEls[0].classList.add('selected');
      spanEls[1].classList.remove('selected');
      spanEls[2].classList.remove('selected');
   }else if(value <= -1125 && value > -2250){
      spanEls[0].classList.remove('selected');
      spanEls[1].classList.add('selected');
      spanEls[2].classList.remove('selected');
   }else if(value <= -2250){
      spanEls[0].classList.remove('selected');
      spanEls[1].classList.remove('selected');
      spanEls[2].classList.add('selected');
   }
}

const displayCard = (datas) => {
   const contentEl = document.querySelector('.content');
   
   for(let i=0; i<datas.length; i++){
      const cardEl = document.createElement('div');
      cardEl.classList.add('card');
      cardEl.innerHTML = `
         <section class="profile">
            <img class="img" src="Images/profile (${i+1}).jpg" alt="">
            <div class="media-icons">
               <abbr title="github"> <i class="fab fa-github"></i> </abbr>
               <abbr title="twitter"> <i class="fab fa-twitter"></i> </abbr>
               <abbr title="instagram"> <i class="fab fa-instagram"></i> </abbr>
            </div>
         </section>
   
         <section class="information">
            <div class="personal-info">
               <span class="name"> ${datas[i].name} ${datas[i].surname} </span>
               <span class="department"> ${datas[i].department} </span>
            </div>
            <div class="stars">
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="fas fa-star"></i>
               <i class="far fa-star"></i>
               <i class="far fa-star"></i>
            </div>
            <div class="more">
               <button data-id="${i}" class="about-me"> About Me </button>
               <button class="hire-me"> Hire Me </button>
            </div>
         </section>
      `;
      contentEl.appendChild(cardEl);
   }
}



