(function(){
    const email = document.getElementById('email');
    const check = document.getElementById('check');
    const submitBtn = document.getElementById('submit');
    const errMsg = document.getElementById('errTxt');
    const modal = document.getElementById('modal');
    const close = document.getElementById('exit');
    console.log('Screen width', screen.width);

    // If cookie is not set, display the modal
    if (!checkForCookie()) {
        if (screen.width < 480) {
            setTimeout(() => {
                modal.classList.remove('modal-hidden');
            }, 5000);
        } else {
            modal.classList.remove('modal-hidden');
        }
    }
    // Handle the submit button click
    submitBtn.addEventListener('click', submitHandler);
    // Handle the close button click
    close.addEventListener('click', setCookieAndClose.bind(this, 'close'));

    // Handler for submit button
    function submitHandler(event) {
        event.preventDefault();
        // If email is present and checkbox is checked, then set cookie and close
        if (email.value === '' || !check.checked) {
            errMsg.innerHTML = 'There are errors. Please correct before proceeding';
        } else {
            errMsg.innerHTML = '';
            setCookieAndClose();
        }
    }

    // Set cookie and close modal
    function setCookieAndClose(val) {
        if (val === 'close') {
            document.cookie = 'close = true';
        } else {
            document.cookie = 'submit = true';
        }
        modal.classList.add('modal-hidden');
    }

    function checkForCookie() {
        const cookie = decodeURIComponent(document.cookie);
        const ck = cookie.split(';');
        console.log('Cookies::', ck);

        for (let i = 0; i < ck.length; i++) {
            if ((ck[i].includes('submit') || ck[i].includes('close')) && ck[i].includes('true')) {
                return true;
            } 
        }
    }
})();