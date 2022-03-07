import { customAlert, customConfirm, customPrompt } from './customdialog.js';

window.addEventListener('DOMContentLoaded', () => {
    const alert = document.getElementById('alert');
    const confirm = document.getElementById('confirm');
    const prompt = document.getElementById('prompt');
    alert.addEventListener('click', () => {
        customAlert('Boo!');
    });
    confirm.addEventListener('click', () => {
        customConfirm('Do you confirm this?');
    });
    prompt.addEventListener('click', () => {
        customPrompt('What is your name?');
    });
});
