window.onerror = function(msg, url, linenumber) {
   alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
   return true;
}

const startDate = "2024-12-25";

const pageContainer = document.querySelector(".page-container");

const jokeList = document.querySelector(".joke-list");

const pad = (x, n = 2) => x.toString().padStart(n, "0");

const daysSince = () => {
   today = new Date();
   start = new Date(startDate);

   return Math.floor((today - start) / (1000 * 3600 * 24));
};

function showPage(e) {
   id = e.currentTarget.id;
   e.currentTarget.querySelector("span:first-child").innerText = "check";
   // pageContainer.classList.remove("empty");

   let page = document.createElement("div");
   page.classList.add("page");

   const img = document.createElement("img");
   fetch('./data.json')
      .then((response) => response.json())
      .then((json) => {
         img.src = json[id].src;
      });

   page.appendChild(img);

   pageContainer.appendChild(page);

}
function hidePage(page) {
   pageContainer.querySelector(":first-child").classList.add("hide");
}
function hideAllPages() {
   // pageContainer.classList.add("empty");

   pageContainer.querySelectorAll(".page").forEach(elem => {
      elem.classList.add("hide");
      window.setTimeout(() => {
         elem.remove();
      }, 800);
   })
}

pageContainer.onclick = hideAllPages;

function loadJokes() {
   fetch('./data.json')
      .then((response) => response.json())
      .then((json) => {
         json = json.slice(0, daysSince() + 1)
         json.entries().forEach(item => {
            addJoke(item[0], item[1])
         })
      });
}

loadJokes();

function addJoke(index, data) {
   let li = document.createElement("li");
   li.id = index;
   let icon = document.createElement("span");
   icon.classList.add(`rating-${data.rating}`);
   icon.classList.add("material-symbols-outlined")
   let count = document.createElement("span");
   count.classList.add("counter");
   let name = document.createElement("span");
   name.classList.add("name");
   name.innerText = data.name;
   let hr = document.createElement("div");
   hr.classList.add("hr");
   hr.innerText = "..................................................................................................................";
   let date = document.createElement("span");
   date.classList.add("date");

   li.appendChild(icon);
   li.appendChild(count);
   li.appendChild(name);
   li.appendChild(hr);
   li.appendChild(date);

   // fetch name

   count.innerText = index.toString().padStart(3, "0");

   let tempDate = new Date(startDate);
   tempDate.setDate(tempDate.getDate() + index);

   date.innerText = `${pad(tempDate.getDate())}-${pad(tempDate.getMonth() + 1)}-${tempDate.getFullYear()}`

   jokeList.prepend(li);

   li.onclick = showPage;
}