'use strict';
const modalAdd = document.querySelector('.modal__add'), 
  addAd = document.querySelector('.add__ad'), 
  modalBtnSubmit = document.querySelector('.modal__btn-submit'), 
  modalSubmit = document.querySelector('.modal__submit'), 
  catalog = document.querySelector('.catalog'), 
  modalItem = document.querySelector('.modal__item');

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide'); //открывается модальное окно с заказом
  modalBtnSubmit.disabled = true; //кнопка Отправить блокируется при открытии модалки
  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') modalAdd.classList.add('hide');
  }); //закрывается модальное окно при нажатии esc
});

modalAdd.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('modal__close') || target === modalAdd) {
    modalAdd.classList.add('hide'); //закрывается модальное окно при нажатии на крестик
    modalSubmit.reset();        //очистка формы после закрытия
  }
});

catalog.addEventListener('click', () => {
  modalItem.classList.remove('hide'); // открывается модальное окно Купить при нажатии на карточку товара
  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') modalItem.classList.add('hide');
  }); //закрывается модальное окно Купить при нажатии esc

});
 
modalItem.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('modal__close') || target === modalItem) {
    modalItem.classList.add('hide'); //закрывается модальное окно Купить при нажатии на крестик
  }
});





