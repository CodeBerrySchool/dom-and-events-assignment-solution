const navForm = document.querySelector('.nav__name-form');
const nameInput = document.querySelector('.name-form__input');
const chatForm = document.querySelector('.chatbox__inputarea');
const chatInput = document.querySelector('.inputarea__text');
const chatBoxMessages = document.querySelector('.chatbox__messages');
let userName;

function disableChatForm(disable) {
  let sendButton = chatForm.querySelector('button');
  
  chatInput.disabled = disable;
  sendButton.disabled = disable;

  if (disable === true) {
    sendButton.classList.remove('inputarea__send-button');
    sendButton.classList.add('inputarea__send-button-disabled');
  } else {
    sendButton.classList.remove('inputarea__send-button-disabled');
    sendButton.classList.add('inputarea__send-button');
  }
}

function getName(event) {
  event.preventDefault();

  const name = nameInput.value;
  if(!name) return;

  userName = name;

  nameInput.value = '';

  disableChatForm(false);

  const messageDiv = createMessage('left', 'Hello, ' + userName + '! What do you like to talk about?', 'Author');

  chatBoxMessages.appendChild(messageDiv);
}

function sendText(event) {
  event.preventDefault();
  
  const message = chatInput.value;

  if (!message) return;

  const messageDiv = createMessage('right', message, userName);

  chatBoxMessages.appendChild(messageDiv);

  chatBoxMessages.scrollTop += 100;

  chatInput.value = '';
}

function createElementWithClass(type, cssClass) {
  const element = document.createElement(type);
  element.classList.add(cssClass);
  return element;
}

function currentTime() {
  const currentDate = new Date();
  return ((currentDate.getHours() < 10) ? '0' : '') + currentDate.getHours() + ':' + ((currentDate.getMinutes() < 10) ? '0' : '') + currentDate.getMinutes();
}

function createMessage(side, textToSend, name) {
  let messageDiv = createElementWithClass('div', 'message');

  if (side === 'right') {
    messageDiv.classList.add('right-message');
  } else {
    messageDiv.classList.add('left-message');
  }

  let messageImage = createElementWithClass('div', 'message__image');
  
  let messageArea = createElementWithClass('div', 'message__area');

  let messageInfo = createElementWithClass('div', 'message__info');

  let nameDiv = createElementWithClass('div', 'info__name');
  nameDiv.textContent = name;
  let timeDiv = createElementWithClass('div', 'info__time');
  timeDiv.textContent = currentTime();

  let messageText = createElementWithClass('div', 'message__text');
  messageText.textContent = textToSend;

  messageDiv.appendChild(messageImage);
  messageInfo.appendChild(nameDiv);
  messageInfo.appendChild(timeDiv);
  messageArea.appendChild(messageInfo);
  messageArea.appendChild(messageText);
  messageDiv.appendChild(messageArea);
  
  return messageDiv;
}

window.addEventListener('load', function () {
  disableChatForm(true);
});

navForm.addEventListener('submit', getName);
chatForm.addEventListener('submit', sendText);
