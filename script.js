const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const bodyEl= document.querySelector('#message');
const form = document.querySelector('#emailContact');

const checkName = () => {

    let valid = false;

    const min = 5,
        max = 50;

    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name is required.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email is required.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;
 
    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}



const checkBody = () => {
    let valid = false;
    const bodd = bodyEl.value.trim();
    if (!isRequired(bodd)) {
        showError(bodyEl, 'Body cannot be blank.');
    } else {
        showSuccess(bodyEl);
        valid = true;
    }
    return valid;
};

const  submiTT=()=>{
    // prevent the form from submitting
    //e.preventDefault();
 
    // validate fields
    let bol=false;
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isBodyValid = checkBody()

    let isFormValid = isNameValid &&
        isEmailValid && isBodyValid

    // submit to the server if the form is valid
    if (isFormValid) {
         bol=true;
        
    }else{
        bol=false;
    }
    return bol;
}

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        
    }
}));
form.addEventListener('textarea', debounce(function (e) {
    switch (e.target.id) {
        case 'message':
            checkBody();
            break;
    }
}));