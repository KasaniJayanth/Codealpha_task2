// document.addEventListener('DOMContentLoaded', () => {
//     fetchPosts();
// });

// async function createPost() {
//     const content = document.getElementById('post-content').value;

//     if (!content) {
//         alert('Post content cannot be empty.');
//         return;
//     }

//     const response = await fetch('/api/posts', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content, createdBy: 'user1' }), // assuming 'user1' is the logged-in user
//     });

//     if (response.ok) {
//         document.getElementById('post-content').value = '';
//         fetchPosts();
//     } else {
//         alert('Failed to create post.');
//     }
// }

// async function fetchPosts() {
//     const response = await fetch('/api/posts');
//     const posts = await response.json();

//     const postsList = document.getElementById('posts-list');
//     postsList.innerHTML = '<h2>Posts</h2>';

//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.className = 'post';
//         postElement.innerHTML = `
//             <p>${post.content}</p>
//             <button onclick="likePost('${post._id}')">Like (${post.likes})</button>
//             <button onclick="showCommentSection('${post._id}')">Comment</button>
//             <div id="comments-${post._id}">
//                 ${post.comments.map(comment => `<div class="comment">${comment.text}</div>`).join('')}
//                 <textarea id="comment-content-${post._id}" placeholder="Add a comment..."></textarea>
//                 <button onclick="addComment('${post._id}')">Add Comment</button>
//             </div>
//         `;
//         postsList.appendChild(postElement);
//     });
// }

// async function addComment(postId) {
//     const commentContent = document.getElementById(`comment-content-${postId}`).value;

//     if (!commentContent) {
//         alert('Comment content cannot be empty.');
//         return;
//     }

//     const response = await fetch(`/api/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ text: commentContent }),
//     });

//     if (response.ok) {
//         fetchPosts();
//     } else {
//         alert('Failed to add comment.');
//     }
// }

// async function likePost(postId) {
//     const response = await fetch(`/api/posts/${postId}/like`, {
//         method: 'POST',
//     });

//     if (response.ok) {
//         fetchPosts();
//     } else {
//         alert('Failed to like post.');
//     }
// }



// function showCommentSection(postId) {
//     const commentsSection = document.getElementById(`comments-${postId}`);
//     commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
// }
// async function createUser() {
//     const username = document.getElementById('username').value;

//     if (!username) {
//         alert('Username cannot be empty.');
//         return;
//     }

//     const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username }),
//     });

//     if (response.ok) {
//         fetchProfile();
//     } else {
//         alert('Failed to create user.');
//     }
// }

// async function fetchProfile() {
//     // Fetch user details, followers, and following
//     // Note: You need to add proper user fetching and display logic
// }















let currentUser = null;
let followers = 0;

// Load posts and user profile from local storage on page load
window.onload = function() {
    loadPosts();
    loadUserProfile();
};

// Function to create a user profile
function createUser() {
    const username = document.getElementById('username').value.trim();
    if (username) {
        currentUser = username;
        localStorage.setItem('username', username);
        document.getElementById('profileUsername').innerText = username;
        document.getElementById('userProfile').style.display = 'block';
        document.getElementById('username').value = '';
    } else {
        alert('Please enter a valid username!');
    }
}

// Load user profile
function loadUserProfile() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        currentUser = storedUsername;
        document.getElementById('profileUsername').innerText = storedUsername;
        document.getElementById('userProfile').style.display = 'block';
    }
}

// Function to follow user
function followUser() {
    followers++;
    document.getElementById('followerCount').innerText = followers;
}

// Function to create a post
function createPost() {
    const content = document.getElementById('postContent').value.trim();
    if (content) {
        const posts = getPosts();
        posts.push({ content, likes: 0 });
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('postContent').value = '';
        loadPosts();
    } else {
        alert('Please enter some content for your post!');
    }
}

// Function to load posts
function loadPosts() {
    const posts = getPosts();
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <p>${post.content}</p>
            <p>Likes: ${post.likes}</p>
            <button onclick="likePost(${index})">Like</button>
            <button onclick="deletePost(${index})">Delete</button> <!-- Add Delete button -->
        `;
        postsDiv.appendChild(postDiv);
    });
}

// Function to like a post
function likePost(index) {
    const posts = getPosts();
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

// Function to delete a post
function deletePost(index) {
    const posts = getPosts();
    posts.splice(index, 1); // Remove the post at the given index
    localStorage.setItem('posts', JSON.stringify(posts)); // Update local storage
    loadPosts(); // Reload posts
}

// Helper function to get posts from local storage
function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}
