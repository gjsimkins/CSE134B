window.addEventListener('DOMContentLoaded', () => {
    const alert = document.getElementById('alert');
    const confirm = document.getElementById('confirm');
    const prompt = document.getElementById('prompt');
    const sPrompt = document.getElementById('safer-prompt');
    const output = document.getElementById('output');
    alert.addEventListener('click', () => {
        window.alert('Boo!');
    });
    confirm.addEventListener('click', () => {
        if (window.confirm('Do you confirm this?')) {
            output.innerHTML = 'User Confirmed';
        } else {
            output.innerHTML = 'User Cancelled';
        }
    });
    prompt.addEventListener('click', () => {
        const input = window.prompt('What is your name?');
        if (input != null) {
            output.innerHTML = input;
        } else {
            output.innerHTML = 'User Cancelled';
        }
    });
    sPrompt.addEventListener('click', () => {
        const input = window.prompt('What is your name?');
        const clean = DOMPurify.sanitize(input);
        if (input != null) {
            output.innerHTML = clean;
        } else {
            output.innerHTML = 'User Cancelled';
        }
    });
});
