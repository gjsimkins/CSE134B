const output = document.getElementById('output');
const alertDialog = document.getElementById('alert-dialog');
const alertText = document.getElementById('alert-text');
const confirmDialog = document.getElementById('confirm-dialog');
const confirmText = document.getElementById('confirm-text');
const promptText = document.getElementById('prompt-text');
const promptDialog = document.getElementById('prompt-dialog');
const promptInput = document.getElementById('prompt-input');
// Variable to store what is going to be displayed
let display = '';

// On close set the output
confirmDialog.addEventListener('close', () => {
    if (confirmDialog.returnValue === 'cancel') {
        output.innerText = 'User Cancelled';
    } else {
        output.innerText = 'User Confirmed';
    }
});

// Updates display value
promptInput.addEventListener('change', () => {
    display = `${promptInput.value}`;
});

// On close sanitize input and set output
promptDialog.addEventListener('close', () => {
    if (promptDialog.returnValue === 'cancel') {
        output.innerText = 'User Cancelled';
    } else {
        output.innerHTML = DOMPurify.sanitize(display);
    }
    promptInput.value = '';
    display = '';
});

function customAlert(txt) {
    alertText.innerText = txt;
    alertDialog.showModal();
}

function customConfirm(txt) {
    confirmText.innerText = txt;
    confirmDialog.showModal();
}

function customPrompt(txt) {
    promptText.innerText = txt;
    promptDialog.showModal();
}

export { customAlert, customConfirm, customPrompt };
