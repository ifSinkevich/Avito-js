'use strict';

const database = JSON.parse(localStorage.getItem('avito')) || [];

const modalAdd = document.querySelector('.modal__add'), 
  addAd = document.querySelector('.add__ad'), 
  modalBtnSubmit = document.querySelector('.modal__btn-submit'), 
  modalSubmit = document.querySelector('.modal__submit'), 
  catalog = document.querySelector('.catalog'), 
  modalItem = document.querySelector('.modal__item'), 
  modalBtnWarning = document.querySelector('.modal__btn-warning'), 
  modalFileInput = document.querySelector('.modal__file-input'), 
  modalFileBtn = document.querySelector('.modal__file-btn'), 
  modalImageAdd = document.querySelector('.modal__image-add');

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

  const renderCard = () => {
    catalog.textContent = '';

    database.forEach((item, i) => {
      catalog.insertAdjacentHTML('beforeend', `
        <li class="card" data-id="${i}">
          <img class="card__image" src="data:image/gpeg;base64,${item.image}" alt="test">
          <div class="card__description">
            <h3 class="card__header">"${item.nameItem}"</h3>
            <div class="card__price">"${item.costItem}" ₽</div>
          </div>
        </li>
      `)
    });
  };

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
        modalImageAdd.src = `data:image/gpeg;base64, ${infoPhoto.base64}`;
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
catalog.addEventListener('click', (event) => {
  const target = event.target;
  // открывается модальное окно Купить при нажатии на карточку товара
  if (target.closest('.card')) {
    modalItem.classList.remove('hide'); 
    document.addEventListener('keydown', closeModal);
  }   
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
 
renderCard();




