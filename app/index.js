const prompt = require('prompt');
const retrieveData = require('./retrieveData');
const { printArr, checkClassName, checkIdentifier, checkChildren } = require('./utils');


let data = {}; 
retrieveData()
    .then(_data => data = _data);


const attrArr = [];

const checkForMatch = (name, currentData, attr) => {
    if(attr === 'class' && currentData.class === name) {
        attrArr.push(currentData);
    }
    else if(attr === 'className') {
        checkClassName(name, currentData, attrArr);
    }
    else if(attr === 'identifier') {
        checkIdentifier(name, currentData, attrArr);
    }
}

const getView = (name, _data, attr) => {
    let { identifier, subviews, contentView } = _data;
    let current;   

    // Check root identifier
    if(attr === 'identifier' && name === identifier) {
        return [_data]; 
    }
    // Set children to current arr
    current = checkChildren(subviews, contentView);
    if(!current) return;


    // Check current array
    let beforeCheckLen = attrArr.length; 
    for(let i = 0; i < current.length; i++) {
        checkForMatch(name, current[i], attr);
    }

    // Check if any matches were found
    if(attrArr.length !== beforeCheckLen) return attrArr;

    // If not, check each subcomponent recursively
    for(let j = 0; j < current.length; j++) { 
        if(current[j]) getView(name, current[j], attr);
    }

    return attrArr;
}


const getAttr = () => {
    prompt.start();

    prompt.get(['nameOfClass', 'nameOfClassName', 'nameOfIdentifier'], (err, result) => {
        const { nameOfClass, nameOfClassName, nameOfIdentifier } = result;
        let matches = [];
        
        if(nameOfClass) matches = getView(nameOfClass, data, 'class');
        else if(nameOfClassName) matches = getView(nameOfClassName, data, 'className');
        else if(nameOfIdentifier) matches = getView(nameOfIdentifier, data, 'identifier');

        printArr(matches);

        prompt.stop();
    })
}

getAttr();