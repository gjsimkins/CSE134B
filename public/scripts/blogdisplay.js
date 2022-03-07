import {
    createPost, deletePost, getPosts,
} from './blogstorage.js';

// This module handles the display portion of the blogs

const blogCont = document.getElementById('list-container');

const edDiag = document.getElementById('edit-dialog');

// Called by edit button
function editPost(index) {
    window.currIndex = index;
    edDiag.showModal();
}

// Called by remove button
function removePost(index) {
    deletePost(index);
    displayPosts();
}

// removes currently displayed posts and displays all posts
function displayPosts() {
    const posts = getPosts();
    blogCont.innerHTML = '';
    const list = document.createElement('ul');
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].valid) {
            const entry = document.createElement('li');
            const delBtn = document.createElement('button');
            const edBtn = document.createElement('button');
            entry.setAttribute('id', i);
            entry.innerText = `${posts[i].title} - ${posts[i].date} - ${posts[i].summary}`;
            delBtn.innerText = 'Delete';
            edBtn.innerText = 'Edit';
            edBtn.onclick = () => {
                editPost(i);
            };
            delBtn.onclick = () => {
                removePost(i);
            };
            entry.append(edBtn);
            entry.append(delBtn);
            list.appendChild(entry);
        }
    }
    blogCont.appendChild(list);
}

// Adds post
function addPost(title, summary) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    const date = `${mm}/${dd}/${yyyy}`;
    createPost(title, date, summary);
    displayPosts();
}
export { displayPosts, addPost };
