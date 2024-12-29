document.addEventListener("DOMContentLoaded", function () {
  let container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);
  
  let upperbg = document.createElement("div");
  upperbg.id = "upperbg";
  container.appendChild(upperbg);
  let logo = document.createElement("p");
  logo.id = "navimg";
  logo.innerHTML = " More ";
  upperbg.appendChild(logo);
  let nav=document.createElement("div");
  nav.id="nav"
  upperbg.appendChild(nav)
  let arr = ["All stories", "Premium Editorials", "Categories","Topics"];
  arr.forEach((sectionTitle) => {
    let section = document.createElement("div");
    section.className = "section";
    let title = document.createElement("h2");
    title.innerHTML = sectionTitle;
    section.appendChild(title);
    section.addEventListener("click", function () {
      switch (sectionTitle) {
        case "All stories":
          fetchAndRenderStories();
          break;
        case "Premium":
          displayPremiumEditorials();
          break;
        case "Categories":
          displayCategories();
          break;
        case "Topics":
          displayTopics();
          break;
        default:
          subContainer.innerHTML = "Content not available.";
      }
    });

    nav.appendChild(section);
  });
  
  let subContainer = document.createElement("div");
  subContainer.id = "subContainer";
  container.appendChild(subContainer);
  
  let footer = document.createElement("div");
  footer.id = "footer";
  container.appendChild(footer);
  
  let navigation = document.createElement("div");
  navigation.className = "navigation";
  footer.appendChild(navigation);
  
  let ul = document.createElement("ul");
  navigation.appendChild(ul);

  const navItems = [
    { name: "Home", icon: "fa-solid fa-house", link: "./index.html" },
    { name: "Matches", icon: "fa-solid fa-baseball-bat-ball", link: "./match.html" },
    { name: "Videos", icon: "fa-solid fa-circle-play", link: "./video.html" },
    { name: "News", icon: "fa-solid fa-newspaper", link: "./news.html" },
    { name: "More", icon: "fa-solid fa-ellipsis-vertical", link: "./more.html" },
  ];
  navItems.forEach((item) => {
    let li = document.createElement("li");
    li.className = "list";
    let a = document.createElement("a");
    a.href = item.link;
    let iconSpan = document.createElement("span");
    iconSpan.className = "icon";
    iconSpan.innerHTML = `<i class="${item.icon}"></i>`;
    let textSpan = document.createElement("span");
    textSpan.className = "text";
    textSpan.textContent = item.name;
    a.appendChild(iconSpan);
    a.appendChild(textSpan);
    li.appendChild(a);
    ul.appendChild(li);
  });

  let indicator = document.createElement("div");
  indicator.className = "indicator";
  ul.appendChild(indicator);

  const list = document.querySelectorAll(".list");
  const currentPath = window.location.pathname;
  list.forEach((item) => {
    const link = item.querySelector("a").getAttribute("href");
    if (currentPath.includes(link.split("./")[1])) {
      item.classList.add("active");
    }
    item.addEventListener("click", function () {
      list.forEach((navItem) => navItem.classList.remove("active"));
      this.classList.add("active");
    });
  });




  const urlAllStories = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index';
const optionsAllStories = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsSeries() {
  
  try {
    const response = await fetch(urlAllStories, optionsAllStories);
    const result = await response.text();
    localStorage.setItem("allStories",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
// newsSeries()

  function fetchAndRenderStories() {
    subContainer.innerHTML = ""; 
    let storiesData = JSON.parse(localStorage.getItem("allStories"));
    let storyList = storiesData["storyList"];
    storyList.forEach((story) => {
        if (story["story"] && story["story"]["hline"]) {
            let storyWrapper = document.createElement("div");
            storyWrapper.id = "storyWrapper";
            subContainer.appendChild(storyWrapper);

            let storyTitle = document.createElement("p");
            storyTitle.id = "storyTitle";
            storyTitle.innerHTML = story["story"]["hline"];
            let storyImage = document.createElement("img");
            storyImage.src=story["story"]["imageId"]
            storyImage.id="storyImage";
            storyWrapper.appendChild(storyImage)
            let storyDescription = document.createElement("p");
            storyDescription.id = "storyDescription";
            storyDescription.innerHTML = story["story"]["intro"];

            storyWrapper.appendChild(storyTitle);
            storyWrapper.appendChild(storyDescription);
        }
    });
}
fetchAndRenderStories();
  function displayPremiumEditorials() {
      subContainer.innerHTML = ""; 
      let premiumDiv = document.createElement("div");
      premiumDiv.innerText = "Premium Editorials will be available soon.";
      subContainer.appendChild(premiumDiv);
  }
displayPremiumEditorials()


const urlTopics = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/topics';
const optionsTopics = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsTopics() {
  
  try {
    const response = await fetch(urlTopics, optionsTopics);
    const result = await response.text();
    localStorage.setItem("newsTopics",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
// newsTopics()



function displayTopics() {
  subContainer.innerHTML="";
  let topicsData = JSON.parse(localStorage.getItem("newsTopics"));
  let topicsList = topicsData ? topicsData["topics"] : [];
  topicsList.forEach((topic) => {
      let topicWrapper = document.createElement("div");
      topicWrapper.className = "topicWrapper";
      subContainer.appendChild(topicWrapper);
      let topicTitle = document.createElement("p");
      topicTitle.className = "topicTitle";
      topicTitle.innerHTML = topic.headline;
      if (topic['headline'] === 'Inside Story') {
        topicTitle.addEventListener("click", inside);
      }
      let topicDescription = document.createElement("p");
      topicDescription.className = "topicDescription";
      topicDescription.innerHTML = topic.description;
      topicWrapper.appendChild(topicTitle);
      topicWrapper.appendChild(topicDescription);
      
  });
  
}
displayTopics()



const urlnewsInside = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/topics/349';
const optionsnewsInside = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsInsideStory() {
  
  try {
    const response = await fetch(urlnewsInside, optionsnewsInside);
    const result = await response.text();
    localStorage.setItem("newsStory",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
// newsInsideStory()



function inside() {
  subContainer.innerHTML = "";
  let res = JSON.parse(localStorage.getItem("newsStory"));
  if (res && res['storyList']) {
    res['storyList'].forEach((item) => {
      if (item["story"]) {
        let storyDiv = document.createElement("div");
        storyDiv.classList.add("story-item");
        if (item["story"]["hline"]) {
          let hlineElement = document.createElement("h3");
          hlineElement.textContent = item["story"]["hline"];
          storyDiv.appendChild(hlineElement);
        }
        if (item["story"]["intro"]) {
          let introElement = document.createElement("p");
          introElement.textContent = item["story"]["intro"];
          storyDiv.appendChild(introElement);
        }
        subContainer.appendChild(storyDiv);
      }
    });
  } else {
    let message = document.createElement("p");
    message.textContent = "No news stories available.";
    subContainer.appendChild(message);
  }
}





const urlCategory = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat';
const optionsCategory = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newscategory() {
  
  try {
    const response = await fetch(urlCategory, optionsCategory);
    const result = await response.text();
    localStorage.setItem("categories2",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// newscategory()


function displayCategories() {
  subContainer.innerHTML = "";
  let categoriesData = JSON.parse(localStorage.getItem("categories2"));
  if (categoriesData && categoriesData['storyType']) {
    categoriesData['storyType'].forEach((ele) => {
      let categoryDiv = document.createElement("div");
      categoryDiv.classList.add("category-item");
      let nameElement = document.createElement("h5");
      nameElement.textContent = ele['name'];
      categoryDiv.appendChild(nameElement);
      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = ele['description'];
      categoryDiv.appendChild(descriptionElement);
      if (ele['name'] === 'Specials') {
        categoryDiv.addEventListener("click", displaySpecialsData);
      }
      subContainer.appendChild(categoryDiv);
    });
  } else {
    let message = document.createElement("p");
    message.textContent = "No categories available.";
    subContainer.appendChild(message);
  }
}

displayCategories();




const urlSpecials = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat/5';
const optionsSpecials = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsSpecials() {
  
  try {
    const response = await fetch(urlSpecials, optionsSpecials);
    const result = await response.text();
    localStorage.setItem("specials",result)
  } catch (error) {
    console.error(error);
  }
}
// newsSpecials(



function displaySpecialsData() {
  subContainer.innerHTML = "";
  const specialsData = JSON.parse(localStorage.getItem("specials"));
  if (specialsData && specialsData['storyList']) {
    specialsData['storyList'].forEach((ele) => {
      if (ele['story']) {
        let storyDiv = document.createElement("div");
        storyDiv.classList.add("story-item");
        if (ele['story']['imageId']) {
          let imgElement = document.createElement("img");
          imgElement.src = ele['story']['imageId']; 
          storyDiv.appendChild(imgElement);
        }
        if (ele['story']['hline']) {
          let headlineElement = document.createElement("h5");
          headlineElement.textContent = ele['story']['hline'];
          storyDiv.appendChild(headlineElement);
        }
        if (ele['story']['intro']) {
          let introElement = document.createElement("p");
          introElement.textContent = ele['story']['intro'];
          storyDiv.appendChild(introElement);
        }
        subContainer.appendChild(storyDiv);
      }
    });
  } else {
    let message = document.createElement("p");
    message.textContent = "No specials available.";
    subContainer.appendChild(message);
  }
}
displaySpecialsData();


// fetchAndRenderStories();

});
