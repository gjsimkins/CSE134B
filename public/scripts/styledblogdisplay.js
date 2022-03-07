import {
    createPost, deletePost, getPosts,
} from './blogstorage.js';

const blogCont = document.getElementById('list-container');

const edDiag = document.getElementById('edit-dialog');

function editPost(index) {
    window.currIndex = index;
    edDiag.showModal();
}

function removePost(index) {
    deletePost(index);
    displayPosts();
}

function displayPosts() {
    const posts = getPosts();
    blogCont.innerHTML = '';
    const list = document.createElement('ul');
    for (let i = posts.length - 1; i >= 0; i--) {
        if (posts[i].valid) {
            const entry = document.createElement('li');
            const wrapper = document.createElement('div');
            wrapper.className = 'post-wrapper';
            entry.setAttribute('id', i);

            const title = document.createElement('h2');
            title.setAttribute('class', 'blog-title');
            title.innerText = posts[i].title;

            const date = document.createElement('p');
            date.setAttribute('class', 'blog-date');
            date.innerText = posts[i].date;

            const sum = document.createElement('p');
            sum.setAttribute('class', 'blog-sum');
            sum.innerText = posts[i].summary;

            const delBtn = document.createElement('input');
            const edBtn = document.createElement('input');
            delBtn.innerText = 'Delete';
            edBtn.innerText = 'Edit';
            delBtn.setAttribute('class', 'change-btn');
            edBtn.setAttribute('class', 'change-btn');

            delBtn.setAttribute('type', 'image');
            edBtn.setAttribute('type', 'image');

            delBtn.setAttribute('src', './media/delete.png');
            edBtn.setAttribute('src', './media/edit.png');
            edBtn.onclick = () => {
                editPost(i);
            };
            delBtn.onclick = () => {
                removePost(i);
            };
            wrapper.append(title);
            wrapper.append(date);
            wrapper.append(sum);
            wrapper.append(edBtn);
            wrapper.append(delBtn);
            entry.append(wrapper);
            list.appendChild(entry);
        }
    }
    blogCont.appendChild(list);
}

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
