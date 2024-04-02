document.getElementById("blogPostForm").addEventListener("submit", function(event){
    event.preventDefault();

    const username = document.getElementById("username").value;
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!username || !title || !content) {
        alert("Please complete all fields.");
        return;
    }

    var post = {
        username: username,
        title: title,
        content: content
    };

    localStorage.setItem('blogPostForm', JSON.stringify(post));
    window.location.href = "blog.html";

    const blogPostData = localStorage.getItem('blogPostForm')
    if(blogPostData){
        console.log("Blog post data is stored in localStorage.");
    } else {
        console.log('No blog post data is found in localStorage');
    }
})
