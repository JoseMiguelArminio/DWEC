const userReq = fetch("https://jsonplaceholder.typicode.com/users/1");
const postsReq = fetch("https://jsonplaceholder.typicode.com/posts?userId=1");

Promise.all([userReq, postsReq])
  .then(async ([u, p]) => {
    document.getElementById("loading-spinner").style.display = "none";

    const user = await u.json();
    const posts = await p.json();

    document.getElementById("user-widget").innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.company.name}</p>
    `;

    document.getElementById("posts-widget").innerHTML =
      posts.slice(0, 3).map(post => `
        <div class="border p-2 mb-2">
          <strong>${post.title}</strong>
          <p>${post.body}</p>
        </div>
      `).join("");
  })
  .catch(() => {
    document.body.innerHTML = "<p>Error cargando datos.</p>";
  });
