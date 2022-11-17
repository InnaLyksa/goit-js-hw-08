import throttle from 'lodash.throttle';
const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};
const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

refs.form.addEventListener('input', throttle(onFormDataInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFormData();

function onFormDataInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  if (formData.email && formData.message) {
    evt.preventDefault();
    evt.currentTarget.reset();
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    formData = {};
  } else {
    alert('Email and message must not be empty');
  }
}

function populateFormData() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (data) {
    refs.email.value = data.email || '';
    refs.message.value = data.message || '';
  }
}
