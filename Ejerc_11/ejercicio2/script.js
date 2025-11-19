const ul = document.getElementById("comments-list");

const xhr = new XMLHttpRequest();
xhr.open("GET", "comments_initial.json");
xhr.onload = function() {
  const comments = JSON.parse(xhr.responseText);
  comments.forEach(addCommentToList);
};
xhr.send();

document.getElementById("comment-form").onsubmit = function(e) {
  e.preventDefault();

  const comment = {
    author: document.getElementById("author").value,
    text: document.getElementById("commentText").value,
    time: new Date().toISOString()
  };

  const xhrPost = new XMLHttpRequest();
  xhrPost.open("POST", "https://cors-anywhere.herokuapp.com/https://webhook.site/");
  xhrPost.setRequestHeader("Content-Type", "application/json");

  xhrPost.onload = function() {
    addCommentToList(comment);
  };

  xhrPost.send(JSON.stringify(comment));
};

function addCommentToList(c) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `<strong>${c.author}</strong>: ${c.text} <br><small>${c.time}</small>`;
  ul.appendChild(li);
}
