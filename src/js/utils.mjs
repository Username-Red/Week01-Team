
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  // console.log(product);
  return product;
}

export function renderListWithTemplate(
  templatFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlList = list.map(templatFn);
  parentElement.insertAdjacentHTML(position, htmlList.join(''));
}

//? New function for dynamic template for header and the footer.
export function renderWithTemplate(
  templateFn,
  parentElement,
  position = 'afterbegin',
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, templateFn);
  // if(callback){
  //   callback(data);
  // }
}

export function loadTemplate(path) {
  return fetch(path).then((response) => {
    if (response.ok) {
      return response.text();
    } else {
      console.log(`Failed to fetch template from ${path}`);
    }
  });
}

const headerTemplatePromise = loadTemplate('/partials/header.html');
const footerTemplatePromise = loadTemplate('/partials/footer.html');

export function loadHeaderFooter(header, footer) {
  Promise.all([headerTemplatePromise, footerTemplatePromise])
    .then(([headerTemplate, footerTemplate]) => {
      console.log(headerTemplate);
      renderWithTemplate(headerTemplate, header);
      renderWithTemplate(footerTemplate, footer);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach((alert) => document.querySelector('main').removeChild(alert));
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener('click', function (e) {
    if (e.target.tagName == 'SPAN') {
      main.removeChild(this);
    }
  });
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

 
}
