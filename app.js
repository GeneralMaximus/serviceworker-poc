'use strict';


let init = () => {
    let searchFormElt = document.querySelector('#searchForm');
    searchFormElt.addEventListener('submit', onSubmit);

    navigator.serviceWorker.register('/worker.js')
        .then((reg) => console.log('successfully registered ServiceWorker'))
        .catch((error) => console.log('failed to register ServiceWorker', error));
};


let onSubmit = (event) => {
    event.preventDefault();

    let usernameInputElt = document.querySelector('#username');
    let username = usernameInputElt.value;

    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                return response.json()
                    .then((error) => {
                        throw new Error(error.message);
                    });
            }
        })
        .then((repositories) => {
            populateRepositoriesList(username, repositories);
        })
        .catch((error) => {
            console.log(`failed to fetch repositories for user ${username}`, error);
            displayError(error);
        });
};


let clearPreviousElements = () => {
    for (let eltId of ['repositoriesList', 'error']) {
        let elt = document.querySelector(`#${eltId}`);

        if (elt) {
            elt.parentNode.removeChild(elt);
        }
    }
};


let populateRepositoriesList = (username, repositories) => {
    clearPreviousElements();

    let repositoriesListElt = document.createElement('div');
    repositoriesListElt.setAttribute('id', 'repositoriesList');

    let headingElt = document.createElement('h1');
    headingElt.innerText = `Showing search results for "${username}"`;
    repositoriesListElt.appendChild(headingElt);

    for (let repository of repositories) {
        let repositoryElt = document.createElement('div');
        repositoryElt.classList.add('repository');
        repositoryElt.innerHTML = `
            <h2>${repository.name}</h2>
            <p>${repository.description}</p>
            <p><a href="${repository.html_url}" target="_blank">visit repo</a></p>
        `;
        repositoriesListElt.appendChild(repositoryElt);
    }

    document.body.appendChild(repositoriesListElt);
};


let displayError = (error) => {
    clearPreviousElements();

    let errorContainerElt = document.createElement('div');
    errorContainerElt.setAttribute('id', 'error');

    let headingElt = document.createElement('h1');
    headingElt.innerText = 'Error loading repositories list';
    errorContainerElt.appendChild(headingElt);

    let errorTextElt = document.createElement('p');
    errorTextElt.innerText = error.toString();
    errorContainerElt.appendChild(errorTextElt);

    document.body.appendChild(errorContainerElt);
};


init();
