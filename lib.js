/**creando un oggetto posso accedere alle proprietà in qualsiasi funzione in questo modulo */
const _v = {
    hasError : false,
    isValidPassword :false,
    emailPattern : /^[^\s@]+@[^\s@]+\[^\s@]{2,4}$/
}

function formValidation(form, notifica) {
    _v.form = document.querySelector(`${form}`);
    _v.notificationItem = document.querySelector(`${notifica}`)
    _v.passwordStrenght = document.querySelectorAll('#password > span')
    //per recuperare tutti gli elementi input del nostro form
    _v.formItems = Array.from(_v.form.elements);
    submitForm();
    checkPasswordStrenght();
}

/**
 * 8 caratteri -> valida ma non sicura
 * 8 caratteri - 1 carattere speciale -> mediamente sicura
 * 10 caratteri - almeno 2 caratteri speciali -> molto sicura
 */

function checkPasswordStrenght() {
    //_v.form.password accede all'input cin name="password"
    _v.form.password.addEventListener('keyup', (e)=>{
        console.log(e.target.value);
        const isValid = {
            isLow : false,
            isHigh :true
        },
        pwd =e.target.value;
        _v.passwordStrenght.forEach(span => {
            span.classList.remove('active');
        })
        /**controlli in base ai caratteri inseriti */
        if (pwd.length >= 8) {
            _v.passwordStrenght[0].classList.add('active');
            if (regexCount(/[&%?!]/g, pwd ) === 1) {
                _v.passwordStrenght[1].classList.add('active')
            }
            isValid.isLow = true;
        }
        if (pwd.length >= 10 && regexCount(/[&%?!]/g, pwd) >= 2) {
            _v.passwordStrenght[0].classList.add('active');
            _v.passwordStrenght[1].classList.add('active');
            _v.passwordStrenght[2].classList.add('active');
            isValid.isHigh = true;
        }
        _v.isValidPassword = (isValid.isLow || isValid.isHigh) ? true : false;
    });
}

function submitForm() {
    _v.form.addEventListener('submit', (e) => {
        e.stopPropagation();
        e.preventDefault();
        checkValidation();
    }, true);
}

function checkValidation() {
    try {
        //controllo campi obbligatori
        requiredFields();

        //controllo validità email
        isValidEmail();

        //controllo validità password e corrispondenza con conferma
        checkPassword();

        //controlli superati
        _v.notificationItem.textContent = 'La regisrtazione è avvenuta correttamente';
    } catch (e) {
        _v.notificationItem.textContent = e.message;
    }
}

function regexCount(pattern, password) {
    //password.match()ritorna un array con le corrispondenze trovate
    //se non trova corrispondenze allora restituiamo un array vuoto altrimenti match torna null
    return (password.match(pattern) || []).length;
}

function requiredFields(){
    let error;
    _v.hasError = false;
    _v.formItems.forEach(item => {

        if (item !== 'checkbox' && item.required && item.value === '') {
            error = true;
        }

        if (item === 'checkbox' && item.required && !item.checked) {
            error = true;
        }
        if (error) {
            _v.hasError = true;
            item.classList.add('error');
        }
    });

    if (_v.hasError) {
        throw new Error('Compilare i campi obbligatori')
    }
}


function isValidEmail() {
    const pwd = _v.form.password.value;
    const re_pwd = _v.form.re_password.value;


    if (!_v.emailPattern.test(_v.form.email.value)) {
        throw new Error('Email indicata non valida')
    }
    if (pwd !== re_pwd) {
        throw new Error('Email indicata non valida')
    }

}

function checkPassword() {
    if (!_v.isValidPassword) {
        throw new Error('Password indicata non valida')
    }
}


export default formValidation;