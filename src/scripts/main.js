'use strict';

// write your code here

const BASE_URL = 'https://mate-academy.github.io/phone-catalogue-static/api';

const request = (url) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          Promise.reject(new Error(
            `${response.status} - ${response.statusText}`
          ));
        }, 5000);
      };

      return response.json();
    })
    .then(result => {
      return result;
    });
};

const getPhones = () => request(`/phones.json`);

function showPhoneNames(phones) {
  const divBlock = document.createElement('div');

  divBlock.id = 'info';

  const phoneList = document.createElement('ol');

  divBlock.prepend(phoneList);

  phones.forEach(phone => {
    const phoneName = document.createElement('li');

    phoneName.innerHTML = phone.name;
    phoneList.append(phoneName);
  });

  document.body.append(divBlock);
}

getPhones()
  .then(result => {
    const phoneIds = result.map(el => el.id);

    return phoneIds;
  })
  .then(phoneIds => {
    const phoneDetailsArr = phoneIds.map(id =>
      request(`/phones/${id}.json`));

    return phoneDetailsArr;
  })
  .then(result => Promise.all(result))
  .then(values => {
    // console.log(values);
    showPhoneNames(values);
  })
  .catch(error => console.warn(`Phones error:`, error));
