'use strict'

const apiKey = 'RqLAP4BhyWCE9MG0Ugl2RFlHUH39uk5n4NoAhDIy';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    
    // clear old results out and previous error messages
    $('#results-list').empty();
    $('#js-error-message').empty();

    for (let i = 0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
            <a href=${responseJson[i].html_url} target="blank">${responseJson[i].html_url}</a>
            </li>`            
    )};
    $('#results').removeClass('hidden')
}

function getNews(query, maxResults) {
    const params = {
        stateCode: query,
        limit: maxResults,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
        "X-Api-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
        if (response.ok) {
            return response.json();
        }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
  }

function watchForm() {
    $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getNews(searchTerm, maxResults);
    });
}

$(watchForm);