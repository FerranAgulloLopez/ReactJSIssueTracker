import React from 'react';

export const ApiRequest = function(url, method, data, onFinish, token) {
    const baseUrl = 'https://blooming-forest-68248.herokuapp.com/'
    console.log('-----------------' + baseUrl+url + '-------------------')
    if (data != null) data = JSON.stringify(data)
    fetch(baseUrl + url, {
        method: method,
        body: data,
        headers: new Headers({
             'Authorization': 'Bearer ' + token,
             'Accept': 'application/json',
             'Content-Type': 'application/json'
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