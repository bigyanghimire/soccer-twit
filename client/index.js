const form = document.querySelector("form");
const loading = document.querySelector("#loading");
const twitDiv = document.querySelector(".twit");
const API_URL = "http://localhost:5000/post";
const GET_URL = "http://localhost:5000/twit";
loading.style.display = "none";
listAllTwits();
form.addEventListener("submit", e => {
  e.preventDefault();
  const formdata = new FormData(form);
  const name = formdata.get("name");
  const tweet = formdata.get("tweet");

  const data = {
    name,
    tweet
  };

  form.style.display = "none";
  loading.style.display = "";
  console.log(data);

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    }
  })
    .then(response => response.json())
    .then(results => {
      results;
    });
});
function listAllTwits() {
  fetch(GET_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(datum => {
        const div = document.createElement("div");
        const header = document.createElement("h3");
        header.textContent = data.age;
        const contents = document.createElement("p");
        content.textContent = data.address;
        div.appendChild(header);
        div.appendChild(contents);
        twitDiv.appendChild(div);
      });
    });
}
