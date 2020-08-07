'use strict';

const database = JSON.parse(localStorage.getItem('avito')) || [];

let counter = database.length; 

const modalAdd = document.querySelector('.modal__add'), 
  addAd = document.querySelector('.add__ad'), 
  modalBtnSubmit = document.querySelector('.modal__btn-submit'), 
  modalSubmit = document.querySelector('.modal__submit'), 
  catalog = document.querySelector('.catalog'), 
  modalItem = document.querySelector('.modal__item'), 
  modalBtnWarning = document.querySelector('.modal__btn-warning'), 
  modalFileInput = document.querySelector('.modal__file-input'), 
  modalFileBtn = document.querySelector('.modal__file-btn'), 
  modalImageAdd = document.querySelector('.modal__image-add'), 
  modalImageItem = document.querySelector('.modal__image-item'),
  modalHeaderItem = document.querySelector('.modal__header-item'),
  modalStatusItem = document.querySelector('.modal__status-item'),
  modalDescriptionItem = document.querySelector('.modal__description-item'),
  modalCostItem = document.querySelector('.modal__cost-item'),
  searchInput = document.querySelector('.search__input'),
  menuContainer = document.querySelector('.menu__container');

const textFileBtn = modalFileBtn.textContent;  
const srcModalImage = modalImageAdd.src;    

const elementsModalSubmit = [...modalSubmit.elements]
  .filter(elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

const infoPhoto = {};
  
const saveDB = () => localStorage.setItem('avito', JSON.stringify(database));
  
    // если все поля заполнены, то true 
const checkForm = () => {
  const validForm = elementsModalSubmit.every(elem => elem.value);
// разблокировать кнопку Отправить
  modalBtnSubmit.disabled = !validForm;
// скрыть строку Заполните все поля
  modalBtnWarning.style.display = validForm ? 'none' : ''; 
}; 
    
  // закрываются оба модальных окна крестиком и на esc
const closeModal = event => {
  const target = event.target;  
  if (target.closest('.modal__close') || 
  target.classList.contains('modal') || 
  event.code === 'Escape') {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');      
    document.removeEventListener('keydown', closeModal);
    modalSubmit.reset();
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();  
  }
};

const renderCard = (DB = database) => {
  catalog.textContent = '';

  DB.forEach((item) => {
    catalog.insertAdjacentHTML('beforeend', `
      <li class="card" data-id="${item.id}">
        <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
        <div class="card__description">
          <h3 class="card__header">"${item.nameItem}"</h3>
          <div class="card__price">"${item.costItem}" ₽</div>
        </div>
      </li>
    `)
  });
};

searchInput.addEventListener('input', () => {
  const valueSearch = searchInput.value.trim().toLowerCase();
  if (valueSearch.length > 2) {
    const result = database.filter(item => item.nameItem.toLowerCase().includes(valueSearch) || item.descriptionItem.toLowerCase().includes(valueSearch));
    renderCard(result);
  }

});

modalFileInput.addEventListener('change', event => {
  const target = event.target;
  const reader = new FileReader();
  const file = target.files[0];

  infoPhoto.filename  = file.name;
  infoPhoto.size  = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', event => {
    if (infoPhoto.size < 200000) {
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64, ${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = 'Не более 200 Кб, пжлст)';
      modalFileInput.value = '';
      checkForm();
    }
    
  })
});

  // вызываем ф-ию заполнения формы
modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
  event.preventDefault();
  const itemObj = {};  
  // забираем данные из заполненной формы
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;        
  }
  itemObj.id = counter++;

  itemObj.image = infoPhoto.base64;
  database.push(itemObj);
  closeModal({target: modalAdd});
  saveDB();
  renderCard();
});

addAd.addEventListener('click', () => {
  // открывается модальное окно с заказом
  modalAdd.classList.remove('hide'); 
  // кнопка Отправить блокируется при открытии модалки
  modalBtnSubmit.disabled = true; 
  // закрывается модальное окно при нажатии esc
  document.addEventListener('keydown', closeModal);
});

// используем делегирование с помощью closests
catalog.addEventListener('click', event => {
  const target = event.target;
  const card = target.closest('.card');
  // открывается модальное окно Купить при нажатии на карточку товара
  if (card) {
    const item = database.find(obj => obj.id === +card.dataset.id); 

    modalImageItem.src = `data:image/jpeg;base64,${item.image}`
    modalHeaderItem.textContent = item.nameItem;
    modalStatusItem.textContent = item.status === 'new' ? 'Новый' : 'Б/у';
    modalDescriptionItem.textContent = item.descriptionItem;
    modalCostItem.textContent = item.costItem;
    modalItem.classList.remove('hide'); 
    document.addEventListener('keydown', closeModal);
  }   
});

menuContainer.addEventListener('click', event => {
  const target = event.target;

  if (target.tagName === 'A') {
    const result = database.filter(item => item.category === target.dataset.category);

    renderCard(result);
  }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
 
renderCard();




