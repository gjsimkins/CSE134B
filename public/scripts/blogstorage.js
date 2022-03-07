// Handles all storage of the posts
const posts = JSON.parse(localStorage.getItem('posts')) ? JSON.parse(localStorage.getItem('posts')) : [{
    valid: true, title: 'DefaultPost1', date: '01/01/2001', summary: 'This is the default summary.',
}, {
    valid: true, title: 'DefaultPost2', date: '02/02/2002', summary: 'This is the default summary.',
}, {
    valid: true, title: 'DefaultPost3', date: '03/03/2003', summary: 'This is the default summary.',
}];
function createPost(title, date, summary) {
    posts.push({
        valid: true,
        title,
        date,
        summary,
    });
    localStorage.setItem('posts', JSON.stringify(posts));
    return posts.length - 1;
}

function readPost(index) {
    if (index >= 0 && index < posts.length && posts[index].valid) {
        return posts[index];
    }
    return null;
}

function updatePost(index, title, summary) {
    const temp = posts[index].date;
    posts[index] = {
        valid: true,
        title,
        date: temp,
        summary,
    };

    localStorage.setItem('posts', JSON.stringify(posts));
}

function deletePost(index) {
    posts[index].valid = false;
    localStorage.setItem('posts', JSON.stringify(posts));
}

function getPosts() {
    return posts;
}

export {
    createPost, readPost, updatePost, deletePost, getPosts,
};
