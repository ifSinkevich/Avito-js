'use strict';

const database = [];

const modalAdd = document.querySelector('.modal__add'), 
  addAd = document.querySelector('.add__ad'), 
  modalBtnSubmit = document.querySelector('.modal__btn-submit'), 
  modalSubmit = document.querySelector('.modal__submit'), 
  catalog = document.querySelector('.catalog'), 
  modalItem = document.querySelector('.modal__item'), 
  modalBtnWarning = document.querySelector('.modal__btn-warning');

  const elementsModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');
    
  // закрываются оба модальных окна крестиком
// const closeModal = event => {
//   const target = event.target;

//   if (target.closest('.modal__close') ||
//   target === modalAdd || 
//   target === modalItem) {
//     modalAdd.classList.add('hide');
//     modalItem.classList.add('hide');
//     // очистка формы после закрытия 
//     modalSubmit.reset();     
//   }
// }


  // закрываются оба модальных окна крестиком с использованием this
  const closeModal = function (event) {
    const target = event.target;  
    if (target.closest('.modal__close') || target === this) {
      this.classList.add('hide');      
      // очистка формы после закрытия       
      if (this === modalAdd) {
        modalSubmit.reset();
      }     
    }
  };
// обработка события закрытия модалок по нажатию клавиши esc
  const closeModalEsc = event => {    
    if (event.code === 'Escape') {
      modalAdd.classList.add('hide');
      modalItem.classList.add('hide');
      modalSubmit.reset();
      document.removeEventListener('keydown', closeModalEsc);      
    };
  };
// валидация формы: если все поля заполнены, то true
modalSubmit.addEventListener('input', () => {
  const validForm = elementsModalSubmit.every(elem => elem.value);
  // разблокировать кнопку Отправить
  modalBtnSubmit.disabled = !validForm;
  // скрыть строку Заполните все поля
  modalBtnWarning.style.display = validForm ? 'none' : '';  
});

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};
  // забираем данные из заполненной формы
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;    
  }
    database.push(itemObj);
});

addAd.addEventListener('click', () => {
  // открывается модальное окно с заказом
  modalAdd.classList.remove('hide'); 
  // кнопка Отправить блокируется при открытии модалки
  modalBtnSubmit.disabled = true; 
  // закрывается модальное окно при нажатии esc
  document.addEventListener('keydown', closeModalEsc);
});

// используем делегирование с помощью closests
catalog.addEventListener('click', (event) => {
  const target = event.target;
  // открывается модальное окно Купить при нажатии на карточку товара
  if (target.closest('.card')) {
    modalItem.classList.remove('hide'); 
    document.addEventListener('keydown', closeModalEsc);
  }   
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
 





