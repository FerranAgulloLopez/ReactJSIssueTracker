import React from 'react';

export const ApiRequest = function(url, method, data, onFinish) {
    const baseUrl = 'https://blooming-forest-68248.herokuapp.com/'
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiRmVycmFuQSIsImV4cCI6MTU4NTM2MTUxNX0.Hbc6Eo1wslkgt0qWgqPBbT8bFt887g3E7gONy5tl6fk' //TODO change this in the future
    console.log('-----------------' + baseUrl+url + '-------------------')
    fetch(baseUrl + url, {
        method: method,
        body: data,
        headers: new Headers({
             'Authorization': 'Bearer ' + token,
             'Accept': 'application/json'
        }),
    }).then(response => response.json())
        .then((jsonData) => {
          // jsonData is parsed json object received from url
          onFinish(jsonData,url)
          console.log(jsonData)
        })
        .catch((error) => {
          // handle your errors here
          console.error(error)
        })
}