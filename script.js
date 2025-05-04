// Simulated user database and post storage
const users = [
    { username: 'user1', password: 'password123' },
    { username: 'user2', password: 'password456' }
  ];
  
  let currentUser = null;
  let posts = [];
  
  // Check if user is logged in
  function checkLoginStatus() {
    if (currentUser) {
      document.getElementById('authForm').style.display = 'none';
      document.getElementById('feedSection').style.display = 'block';
      document.getElementById('authStatus').innerText = `Logged in as: ${currentUser.username}`;
      renderPosts();
    } else {
      document.getElementById('authForm').style.display = 'block';
      document.getElementById('feedSection').style.display = 'none';
      document.getElementById('authStatus').innerText = 'Log In';
    }
  }
  
  // Log in function
  function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      currentUser = user;
      checkLoginStatus();
    } else {
      alert('Invalid credentials');
    }
  }
  
  // Sign up function
  function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (users.some(u => u.username === username)) {
      alert('Username already taken');
    } else {
      users.push({ username, password });
      alert('User created successfully');
      login(); // Automatically log in after signing up
    }
  }
  
  // Create a post
  function createPost() {
    const imageFile = document.getElementById('imageUpload').files[0];
    const caption = document.getElementById('caption').value;
  
    if (!imageFile || !caption) {
      alert('Please upload an image and write a caption');
      return;
    }
  
    const postId = Date.now(); // Use current time as unique post ID
    const newPost = {
      id: postId,
      username: currentUser.username,
      image: URL.createObjectURL(imageFile),
      caption: caption,
      likes: 0,
      comments: []
    };
  
    posts.push(newPost);
    renderPosts();
    document.getElementById('imageUpload').value = '';
    document.getElementById('caption').value = '';
  }
  
  // Render posts in the feed
  function renderPosts() {
    const feed = document.getElementById('imageFeed');
    feed.innerHTML = '';
  
    posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.innerHTML = `
        <h3>${post.username}</h3>
        <img src="${post.image}" alt="Post Image">
        <p>${post.caption}</p>
        <div class="post-actions">
          <button onclick="likePost(${post.id})">Like (${post.likes})</button>
          <div class="comment-box">
            <input type="text" id="comment-${post.id}" placeholder="Add a comment">
            <button onclick="addComment(${post.id})">Comment</button>
          </div>
          <div class="comments">
            ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
          </div>
        </div>
      `;
  
      feed.appendChild(postDiv);
    });
  }
  
  // Like a post
  function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.likes++;
      renderPosts(); // Re-render to update like count
    }
  }
  
  // Add a comment to a post
  function addComment(postId) {
    const commentInput = document.getElementById(`comment-${postId}`);
    const comment = commentInput.value.trim();
  
    if (comment) {
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
        commentInput.value = ''; // Clear input after adding comment
        renderPosts(); // Re-render to update comments
      }
    }
  }
  
  // Initialize login status on page load
  checkLoginStatus();
  