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

    console.log(responseJson.data[0].fullName);

    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href=${responseJson.data[i].url} target="blank">${responseJson.data[i].url}</a>
            </li>`            
    )};
    $('#results').removeClass('hidden')
}

function getParks(query, maxResults) {
    const params = {
        stateCode: query,
        limit: maxResults,
        api_key: apiKey
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    // const options = {
        // Why can't I send the API key this way???
        // headers: new Headers({
        // "X-Api-Key": apiKey})
    // };

    fetch(url)
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
    getParks(searchTerm, maxResults);
    });
}

$(watchForm);