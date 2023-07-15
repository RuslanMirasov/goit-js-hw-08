import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputEmail = form.querySelector('input');
const inputMessage = form.querySelector('textarea');

let storageData = {};

window.addEventListener('load', formFillingOnLoad);
form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput(e) {
  storageData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(storageData));
}

function onSubmit(e) {
  e.preventDefault();
  if (e.target.email.value === '' || e.target.message.value === '') {
    return alert('Заповніть всі поля!');
  }
  form.reset();
  console.log(storageData);
  localStorage.removeItem('feedback-form-state');
  storageData = {};
}

function formFillingOnLoad() {
  const savedInputs = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedInputs !== null) {
    if (savedInputs.email) {
      inputEmail.value = savedInputs.email;
      storageData.email = savedInputs.email;
    }
    if (savedInputs.message) {
      inputMessage.value = savedInputs.message;
      storageData.message = savedInputs.message;
    }
  }
}
