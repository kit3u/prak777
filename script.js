
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const errorMessage = document.getElementById('errorMessage');
const subscriptionForm = document.getElementById('subscriptionForm');
const successDialog = document.getElementById('successDialog');
const userEmailSpan = document.getElementById('userEmail');
const closeDialogBtn = document.getElementById('closeDialog');


function validateEmail(email) {
    return emailRegex.test(email);
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    emailInput.classList.add('error');
}


function hideError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
    emailInput.classList.remove('error');
}


emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    
    if (email === '') {
        showError('Please enter an email address');
        return;
    }
    

    if (!validateEmail(email)) {
        showError('Please enter the valid email');
        return;
    }
    
   
    hideError();
    showSuccessDialog(email);
});


emailInput.addEventListener('input', function() {
    if (errorMessage.classList.contains('show')) {
        hideError();
    }
});


function showSuccessDialog(email) {
    
    subscriptionForm.classList.add('hidden');
    
   
    userEmailSpan.textContent = `<${email}>`;
    
    
    successDialog.showModal();
}


closeDialogBtn.addEventListener('click', function() {
    successDialog.close();
    
    
    emailForm.reset();
    
   
    subscriptionForm.classList.remove('hidden');
});


successDialog.addEventListener('click', function(e) {
    const dialogDimensions = successDialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        successDialog.close();
        emailForm.reset();
        subscriptionForm.classList.remove('hidden');
    }
});