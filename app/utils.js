const printArr = arr => {
    arr.forEach(el => console.log(el));
    console.log('Arr Length:', arr.length);
}


const checkClassName = (name, currentData, attrArr) => {
    const { classNames } = currentData;
    if(!classNames) return;

    for(let i = 0; i < classNames.length; i++) {
        if(classNames[i] === name) {
            attrArr.push(currentData);
        }
    }
}

const checkIdentifier = (name, currentData, attrArr) => {
    const { identifier, control } = currentData;

    if(identifier === name) attrArr.push(currentData);
    // Included first arg to prevent error of reading an identifier prop when 
    // control doesn't exist to prevent:
    // TypeError: Cannot read property 'identifier' of undefined
    else if(control && control.identifier === name) {
        attrArr.push(currentData);
    }
}


const checkChildren = (subviews, contentView) => {
    if(contentView) return contentView.subviews;
    else if(subviews) return subviews;
    // Reached end of children
    else return; 
}


module.exports = { 
    printArr, 
    checkClassName, 
    checkIdentifier,
    checkChildren
};