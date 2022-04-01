const articleId = document.getElementById('article_id');
const articleName = document.getElementById('article_name');
const articleBody = document.getElementById('article_body');
const articleDate = document.getElementById('article_date');
const postBtn = document.getElementById('postBtn');
const getBtn = document.getElementById('getBtn');
const putBtn = document.getElementById('putBtn');
const deleteBtn = document.getElementById('deleteBtn');
const output = document.getElementById('response');

articleDate.valueAsDate = new Date();

postBtn.addEventListener('click', async () => {
    articleDate.valueAsDate = new Date();
    const data = {};
    data.article_name = articleName.value;
    data.article_body = articleBody.value;
    data.article_date = articleDate.value;
    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((newData) => {
            // console.log('Success:', newData);
            output.innerText = JSON.stringify(newData, null, ' ').replace(/\\/g, '');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

getBtn.addEventListener('click', () => {
    fetch(`https://httpbin.org/get?id=${articleId.value}`, {
        method: 'GET',
    })
        .then((response) => response.json())
        .then((newData) => {
            // console.log('Success:', newData);
            output.innerText = JSON.stringify(newData, null, ' ').replace(/\\/g, '');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

putBtn.addEventListener('click', () => {
    const data = {};
    data.article_name = articleName.value;
    data.article_body = articleBody.value;
    data.article_date = articleDate.value;
    fetch(`https://httpbin.org/put?id=${articleId.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((newData) => {
            // console.log('Success:', newData);
            output.innerText = JSON.stringify(newData, null, ' ').replace(/\\/g, '');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

deleteBtn.addEventListener('click', () => {
    fetch(`https://httpbin.org/delete?id=${articleId.value}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((newData) => {
            // console.log('Success:', newData);
            output.innerText = JSON.stringify(newData, null, ' ').replace(/\\/g, '');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
