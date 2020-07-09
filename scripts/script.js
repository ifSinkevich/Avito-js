'use strict';

const modalAdd = document.querySelector('.modal__add'), 
  addAd = document.querySelector('.add__ad'), 
  modalBtnSubmit = document.querySelector('.modal__btn-submit'), 
  modalSubmit = document.querySelector('.modal__submit'), 
  catalog = document.querySelector('.catalog'), 
  modalItem = document.querySelector('.modal__item');

  // закрываются оба модальных окна крестиком
const closeModal = event => {
  const target = event.target;

  if (target.closest('.modal__close') ||
  target === modalAdd || 
  target === modalItem) {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    // очистка формы после закрытия 
    modalSubmit.reset();     
  }
}

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);


addAd.addEventListener('click', () => {
  // открывается модальное окно с заказом
  modalAdd.classList.remove('hide'); 
  // кнопка Отправить блокируется при открытии модалки
  modalBtnSubmit.disabled = true; 
  // закрывается модальное окно при нажатии esc
  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') {
      modalAdd.classList.add('hide');
    }
  }); 
});

catalog.addEventListener('click', () => {
  const target = event.target;
  // открывается модальное окно Купить при нажатии на карточку товара
  if ( target.closest('.card')) {
    modalItem.classList.remove('hide'); 
  } 
   // закрывается модальное окно Купить при нажатии esc
  document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape') modalItem.classList.add('hide');
  });

});





