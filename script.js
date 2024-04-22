const blogForm = document.getElementById('blog-form');
const usernameInput = document.getElementById('username');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const formError = document.getElementById('form-error');
const postsPage = document.getElementById('posts-page');
const landingPage = document.getElementById('landing-page');
const modeToggle = document.getElementById('mode-toggle');
const blogPosts = document.getElementById('blog-posts');
const backBtn = document.getElementById('back-btn');

// Event listener for form submission
blogForm.addEventListener('submit', function(e) {
    console.log(123)
    e.preventDefault();
    const username = usernameInput.value.trim();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (username === '' || title === '' || content === '') {
        formError.classList.remove('hidden');
    } else {
        console.log(456)
        formError.classList.add('hidden');
        const postData = {
            id: Date.now(), // Generate unique ID for each post
            username: username,
            title: title,
            content: content,
            timestamp: new Date().toLocaleString() // Add timestamp
        };
        savePostData(postData);
        window.location.href = '#posts-page';
        displayBlogPosts();
    }
});

// Save post data to localStorage
function savePostData(postData) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(postData);
    console.log(posts)
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Display blog posts from localStorage with pagination
function displayBlogPosts(pageNumber = 1, postsPerPage = 5) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const startIndex = (pageNumber - 1) * postsPerPage;
    const endIndex = pageNumber * postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);
    blogPosts.innerHTML = '';
    paginatedPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('blog-post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>By: ${post.username}</p>
            <p>Posted on: ${post.timestamp}</p>
            <button class="edit-btn" data-id="${post.id}">Edit</button>
            <button class="delete-btn" data-id="${post.id}">Delete</button>
        `;
        console.log(postElement)
        blogPosts.appendChild(postElement);
    });
    console.log(blogPosts)
}

// Event listener for mode toggle
modeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Event listener for back button
backBtn.addEventListener('click', function() {
    window.location.href = '#landing-page';
});

// Event delegation for edit and delete buttons
blogPosts.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit-btn')) {
        const postId = e.target.dataset.id;
        editPost(postId);
    } else if (e.target.classList.contains('delete-btn')) {
        const postId = e.target.dataset.id;
        deletePost(postId);
    }
});

// Edit post function (to be implemented)
function editPost(postId) {
    // Implementation for editing a post
    console.log(`Editing post with ID ${postId}`);
}

// Delete post function (to be implemented)
function deletePost(postId) {
    // Implementation for deleting a post
    console.log(`Deleting post with ID ${postId}`);
}

// Display blog posts when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayBlogPosts();
});
