import { addPost, displayPosts } from './blogdisplay.js';
import { updatePost } from './blogstorage.js';

const addBtn = document.getElementById('add-button');
const addDiag = document.getElementById('add-dialog');
const titleIn = document.getElementById('title-input');
const sumIn = document.getElementById('summary-input');

const edDiag = document.getElementById('edit-dialog');
const edTitle = document.getElementById('edit-title-input');
const edSum = document.getElementById('edit-summary-input');

let title = '';
let summary = '';

// Add Post
addBtn.addEventListener('click', () => {
    addDiag.showModal();
});
// Set title variable on change
titleIn.addEventListener('change', () => {
    title = `${titleIn.value}`;
});
// Set summary variable on change
sumIn.addEventListener('change', () => {
    summary = `${sumIn.value}`;
});

// One close sanitze input and add Post
addDiag.addEventListener('close', () => {
    if (addDiag.returnValue !== 'cancel') {
        addPost(DOMPurify.sanitize(title), DOMPurify.sanitize(summary));
    }
    titleIn.value = '';
    title = '';
    sumIn.value = '';
    summary = '';
});

// Edit Post
// Set title varible on change
edTitle.addEventListener('change', () => {
    title = `${edTitle.value}`;
});
// Set summary variable on change
edSum.addEventListener('change', () => {
    summary = `${edSum.value}`;
});
// On close update post
edDiag.addEventListener('close', () => {
    if (edDiag.returnValue !== 'cancel') {
        updatePost(window.currIndex, title, summary);
        displayPosts();
    }
    edTitle.value = '';
    title = '';
    edSum.value = '';
    summary = '';
});

displayPosts();
