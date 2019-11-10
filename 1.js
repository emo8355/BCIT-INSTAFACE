const postsContainer = document.querySelector("#posts-container");
function createPostElement(e) {
  const t = document.createElement("div"),
    n = document.createElement("article");
  n.classList.add("post"), t.appendChild(n);
  const o = document.createElement("header");
  o.classList.add("post__header", "post__inset"), n.appendChild(o);
  const s = document.createElement("p");
  s.classList.add("post__heading"),
    (s.innerText = e.username),
    o.appendChild(s);
  const c = document.createElement("div");
  c.classList.add("post__links"), o.appendChild(c);
  const a = document.createElement("i");
  a.classList.add("material-icons", "favorite-icon", "button"),
    (a.innerText = "favorite"),
    c.appendChild(a),
    a.addEventListener("click", () => {
      likePost(e.id);
    });
  const i = document.createElement("i");
  i.classList.add("material-icons", "comment-icon", "button"),
    (i.innerText = "comment"),
    c.appendChild(i),
    i.addEventListener("click", () => {
      postComments(e.id);
    });
  const m = document.createElement("i");
  m.classList.add("material-icons", "share-icon", "button"),
    (m.innerText = "share"),
    c.appendChild(m),
    m.addEventListener("click", () => {
      sharePost(e.id);
    });
  const d = document.createElement("figure");
  d.classList.add("post__figure"), n.appendChild(d);
  const l = document.createElement("img");
  l.classList.add("post__image"),
    l.setAttribute("src", e.image_url),
    d.appendChild(l);
  const r = document.createElement("figcaption");
  r.classList.add("post__caption", "post__inset"),
    (r.innerText = e.message),
    d.appendChild(r);
  const p = document.createElement("section");
  p.classList.add("comments-container", "post__inset"), n.appendChild(p);
  const u = document.createElement("ul");
  u.classList.add("comments"), p.appendChild(u);
  for (const t of e.comments) {
    const e = document.createElement("li"),
      n = document.createElement("i");
    n.classList.add("material-icons", "comment-icon"),
      (n.innerText = "account_box"),
      e.appendChild(n),
      (e.innerText = t.message),
      u.appendChild(e);
  }
  const h = document.createElement("form");
  return (
    h.classList.add("comment-form"),
    (h.innerHTML =
      '<input id="comment-message" class="comment-form__comment" type="text" name="comment" placeholder="Add a comment...">\n    <button class="comment-form__button">Post</button>'),
    h.addEventListener("submit", function(t) {
      t.preventDefault();
      const n = h.querySelector("#comment-message").value;
      createNewComment(e.id, n);
    }),
    n.appendChild(h),
    t
  );
}
function createNewPost(e, t, n) {
  const o = { username: e, message: n, image_url: t, comments: [] };
  fetch("api/insta_posts", {
    method: "POST",
    body: JSON.stringify({ post: o }),
    headers: { "Content-Type": "application/json" }
  })
    .then(e => (e.ok ? e.json() : new Promise((t, n) => e.json().then(n))))
    .then(e => (console.log(e), fetchAllPosts()))
    .then(() => {
      console.log("ok");
    })
    .catch(e => {
      console.log("error", e);
    });
}
function createNewComment(e, t) {
  fetch(`api/insta_posts/${e}/comments`, {
    method: "POST",
    body: JSON.stringify({ message: t, postId: e }),
    headers: { "Content-Type": "application/json" }
  })
    .then(fetchAllPosts())
    .then(() => {
      console.log("ok");
    })
    .catch(e => {
      console.log(e);
    });
}
function loadPosts(e) {
  postsContainer.innerHTML = "";
  for (const t of e.reverse()) {
    const e = createPostElement(t);
    postsContainer.appendChild(e);
  }
}
function likePost(e) {
  console.log("likePost", e);
}
function postComments(e) {
  console.log("postComments", e);
}
function sharePost(e) {
  console.log("share post", e);
}
function fetchAllPosts() {
  fetch("api/insta_posts")
    .then(e => e.json())
    .then(e => {
      loadPosts(e);
    })
    .catch(e => {
      console.log(e);
    });
}
document.querySelector("#new-post").addEventListener("submit", function(e) {
  e.preventDefault(),
    createNewPost(
      document.querySelector("#post-form-username").value,
      document.querySelector("#post-form-image_url").value,
      document.querySelector("#post-form-comment").value
    );
}),
  fetchAllPosts();
