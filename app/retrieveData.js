//const viewData = require('./SystemViewController.json');
const axios = require('axios');
const url = 'https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json';


const retrieveData = () => {
    let data = {};

    return axios.get(url)
        .then(res => data = res.data) 
}


module.exports = retrieveData;
