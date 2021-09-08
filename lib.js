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

function submitForm() {
    
}
/**
 * 8 caratteri -> valida ma non sicura
 * 8 caratteri - 1 carattere speciale -> mediamente sicura
 * 10 caratteri - almeno 2 caratteri speciali -> molto sicura
 */

function checkPasswordStrenght(params) {
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
            if (regexCount(/[&%?!]/g, pwd === 1)) {
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

function regexCount(pattern, password) {
    return (password.match(pattern) || []).length;
}
export default formValidation;