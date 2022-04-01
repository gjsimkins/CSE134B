// Handles all storage of the posts

let posts = JSON.parse(localStorage.getItem('posts')) ? JSON.parse(localStorage.getItem('posts')) : [];

function setPosts(newPosts) {
    posts = newPosts;
    localStorage.setItem('posts', JSON.stringify(posts));
}

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
    posts = JSON.parse(localStorage.getItem('posts')) ? JSON.parse(localStorage.getItem('posts')) : [];
    return posts;
}

export {
    createPost, readPost, updatePost, deletePost, getPosts, setPosts,
};
