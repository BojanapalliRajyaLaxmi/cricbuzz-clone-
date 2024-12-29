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

  // Add indicator to navigation
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
  let arr = [
    "Browse Series", "Browse Team", "Browse Players", "Schedule", "Archives", "Photos", 
    "Quotes", "ICC Rankings - Men", "ICC Rankings - Women", "Records", "ICC World Test Championship", 
    "ICC World Cup Super League", "Rate the App", "Feedback", "About Cricbuzz"
  ];

  let emoji = [
    "fa-solid fa-trophy", "fa-sharp fa-solid fa-user-group", "fa-solid fa-user", "fa-solid fa-calendar", 
    "fa-solid fa-arrows-rotate", "fa-solid fa-photo-film", "fa-solid fa-quote-right", "fa-solid fa-chart-line", 
    "fa-solid fa-chart-line", "fa-solid fa-chart-gantt", "fa-solid fa-door-open", "fa-solid fa-door-open", 
    "fa-regular fa-star", "fa-regular fa-message", "fa-solid fa-gear", "fa-solid fa-eject"
  ];

  arr.forEach((item, index) => {
    let newElement = document.createElement('div');
    newElement.id = item.replace(/\s+/g, '_'); 
    newElement.className = "menu-item"; 
    
    let icon = document.createElement('i');
    icon.className = emoji[index]; 
    
    let text = document.createElement('span');
    text.innerText = item;
    
    newElement.appendChild(icon);
    newElement.appendChild(text);
    subContainer.appendChild(newElement);
    if (item === "Browse Series") {
      newElement.addEventListener("click", function () {
        seriesAll(); 
      });
    }
    if (item === "Browse Team") {
      newElement.addEventListener("click", function () {
        displayTeams(); 
      });
    }
    if(item=="Browse Players"){
      newElement.addEventListener("click",function(){
        renderBowlingStats();
      });
    }
    if(item=="Schedule"){
      newElement.addEventListener("click",function(){
        renderMatchSchedule();
      })
    }
    if(item=="ICC Rankings - Men"){
      newElement.addEventListener("click",function(){
        menRank();
      })
    }
    if(item=="Records"){
      newElement.addEventListener("click",function(){
        renderRecords("Batting");
      })
    }
  });
  const urlSeries = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/international';
  const optionsSeries = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  async function moreSeries() {
    
    try {
      const response = await fetch(urlSeries, optionsSeries);
      const result = await response.text();
      localStorage.setItem("moreSeries",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
moreSeries()
  
  function formatISTDate(timestamp) {
    if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp, 10));
    const options = {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "short",
      hour12: false,
    };
    return date.toLocaleString("en-IN", options);
  }
  
  function seriesAll() {
    logo.innerHTML = "";
    let navname=document.createElement("p");
    navname.innerHTML="Browse Series";
    navname.id="navname"
    upperbg.appendChild(navname)
    subContainer.innerHTML = "";
    let navele = document.createElement("div");
    navele.id = "navele";
    upperbg.appendChild(navele);
    let series = JSON.parse(localStorage.getItem("moreSeries"));
    let input = document.createElement("input");
    input.id = "inp";
    subContainer.appendChild(input);
    series["seriesMapProto"].forEach((seriesData) => {
      let date = seriesData["date"];
      let count = seriesData["series"];
      let date1 = document.createElement("p");
      date1.innerHTML = date;
      date1.id = "date";
      subContainer.appendChild(date1);
      count.forEach((series) => {
        let name = series["name"];
        let sDate = series["startDt"];
        let eDate = series["endDt"];
        let wrap = document.createElement("div");
        wrap.classList.add("wrap");
        subContainer.appendChild(wrap);
        let wrapele = document.createElement("p");
        wrapele.classList.add("wrapele");
        wrapele.innerHTML = name;
        wrap.appendChild(wrapele);
        let wrapele2 = document.createElement("p");
        wrapele2.classList.add("wrapele2");
        wrapele2.innerHTML = `${formatISTDate(sDate)} - ${formatISTDate(eDate)}`;
        wrap.appendChild(wrapele2);
        wrap.addEventListener("click", () => {
          navname.href="./more.html"
          navname.innerHTML = `<a href="./more.html" class="nav"><i class="fa-solid fa-arrow-left"></i> ${name}</a>`;
          navele.innerHTML = `
          <a href="#" id="matches">Matches</a>
          <a href="#" id="table">Table</a>
          <a href="#" id="squads">Squads</a>
          <a href="#" id="stats">Stats</a>
          <a href="#" id="venues">Venues</a>
          <a href="#" id="news">News</a>
          `;
          renderSeriesMatches();
          document.getElementById("matches").addEventListener("click", renderSeriesMatches);
          document.getElementById("squads").addEventListener("click", renderMatchSquads);
          document.getElementById("stats").addEventListener("click", renderMatchStats);
          document.getElementById("news").addEventListener("click", renderMatchNews);
          document.getElementById("venues").addEventListener("click", renderMatchVenue);
          document.getElementById("table").addEventListener("click", renderMatchTable);
        });
      });
    });
  }

  const urlseriesMatch = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/3641';
  const optionsSeriesMatch = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  async function moreSeriesMatch() {
    
    try {
      const response = await fetch(urlseriesMatch, optionsSeriesMatch);
      const result = await response.text();
      localStorage.setItem("seriesMatch",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
moreSeriesMatch()
  function renderSeriesMatches() {
    subContainer.innerHTML = ""; 
    // logo.innerHTML=""; 
    let seriesMatchData = JSON.parse(localStorage.getItem("seriesMatch"));
    let matchSeries=document.createElement("div");
    matchSeries.id="matchSeries"
    subContainer.appendChild(matchSeries);
    seriesMatchData["matchDetails"].forEach((ele) => {
      if (ele["matchDetailsMap"]) {
        const matchDetailsMap = ele["matchDetailsMap"];
        const match = matchDetailsMap["match"][0];
        const matchInfo = match["matchInfo"];
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match-container");
        matchDiv.id="matchDiv"
        matchDiv.innerHTML = `
        <h3>${matchDetailsMap["key"]}</h3>
        <p><strong>Match:</strong> ${matchInfo["matchDesc"]} @ ${matchInfo["venueInfo"]["city"]}</p>
          <div class="team-container">
          <img src="https://example.com/images/${matchInfo["team1"]["imageId"]}.png" alt="${matchInfo["team1"]["teamSName"]} Logo" class="team-logo">
          <span class="team-name">${matchInfo["team1"]["teamSName"]}</span>
          </div>
          <div class="team-container">
          <img src="https://example.com/images/${matchInfo["team2"]["imageId"]}.png" alt="${matchInfo["team2"]["teamSName"]} Logo" class="team-logo">
          <span class="team-name">${matchInfo["team2"]["teamSName"]}</span>
          </div>
          <p class="status">${matchInfo["status"]}</p>
          `;
          matchSeries.appendChild(matchDiv);
        }
    });
  } 

  function renderMatchTable() {
    subContainer.innerHTML = "";
    let box = document.createElement("p");
    box.id = "loading-message";
    box.innerHTML = "Hooo sorry, data is loading.....!!!!!!";
    subContainer.appendChild(box);
  }
  
  const urlSeriesSquads = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/3718/squads';
  const optionsSeriesSquads = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
      'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  async function newsSeriesSquads() {
    
    try {
      const response = await fetch(urlSeriesSquads, optionsSeriesSquads);
      const result = await response.text();
      localStorage.setItem("seriesSquads",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  newsSeriesSquads()

function renderMatchSquads() {
  // Clear the previous content in subContainer
  subContainer.innerHTML = "";
  logo.innerHTML=""; 
  
  // Fetch match squads data from localStorage
  let matchSquadsData = JSON.parse(localStorage.getItem("seriesSquads"));
  
  // Iterate through squads and render them
  matchSquadsData["squads"].forEach((ele, index) => {
    if (index === 0) {
      // Render the first element as a heading
      const heading = document.createElement("h2");
      heading.id="heading"
      heading.innerText = ele["squadType"];
      subContainer.appendChild(heading);
    } else {
      // Render other squad types as regular content
      const squadType = document.createElement("p");
      squadType.id="squadType"
      squadType.innerText = ele["squadType"];
      subContainer.appendChild(squadType);
    }
  });
}

const urlSeriesStats = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/3718';
const optionsSeriesStats = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsSeriesStats() {
  
  try {
    const response = await fetch(urlSeriesStats, optionsSeriesStats);
    const result = await response.text();
    localStorage.setItem("seriesStats",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
newsSeriesStats()


function renderMatchStats() {
  subContainer.innerHTML = "";
  let matchStatsData = JSON.parse(localStorage.getItem("seriesStats"));
  console.log(matchStatsData);
  matchStatsData["types"].forEach((ele, index) => {
    const heading = document.createElement("h2");
    heading.innerText = ele["header"];
    heading.id = "stats-heading";
    subContainer.appendChild(heading);
  });
}


const urlSeriesNews = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/series/3636';
const optionsSeriesNews = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsSeriesNews() {
  
  try {
    const response = await fetch(urlSeriesNews, optionsSeriesNews);
    const result = await response.text();
    localStorage.setItem("seriesNews",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
newsSeriesNews()



function renderMatchNews() {
  subContainer.innerHTML = "";
  let matchnewsData = JSON.parse(localStorage.getItem("seriesNews"));
  console.log(matchnewsData);
  matchnewsData["storyList"].forEach((ele, index) => {
    if (ele["story"]) {
      const { imageId, hline, intro } = ele["story"];
      const newsContainer = document.createElement("div");
      newsContainer.id = `news-container-${index}`;
      newsContainer.classList.add("news-container");
      const newsImage = document.createElement("img");
      newsImage.src = `https://example.com/images/${imageId}.png`; 
      newsImage.classList.add("news-image");
      const newsDetails = document.createElement("div");
      newsDetails.classList.add("news-details");
      const newsHeadline = document.createElement("h3");
      newsHeadline.id = `news-headline-${index}`;
      newsHeadline.innerText = hline;
      newsDetails.appendChild(newsHeadline);
      const newsIntro = document.createElement("p");
      newsIntro.id = `news-intro-${index}`;
      newsIntro.innerText = intro;
      newsDetails.appendChild(newsIntro);

      newsContainer.appendChild(newsImage);
      newsContainer.appendChild(newsDetails);
      subContainer.appendChild(newsContainer);
    }
  });
}
const urlSeriesVenue = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/3718/venues';
const optionsSeriesVenue = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function newsSeriesVenue() {
  
  try {
    const response = await fetch(urlSeriesVenue, optionsSeriesVenue);
    const result = await response.text();
    localStorage.setItem("seriesVenue",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
newsSeriesVenue()
function renderMatchVenue() {
  subContainer.innerHTML = "";
  let matchVenueData = JSON.parse(localStorage.getItem("seriesVenue"));
  console.log(matchVenueData);
  matchVenueData["seriesVenue"].forEach((ele, index) => {
    const venueContainer = document.createElement("div");
    venueContainer.id = `venue-container-${index}`;
    venueContainer.classList.add("venue-container");
    const venueImage = document.createElement("img");
    venueImage.src = `https://example.com/images/${ele["imageId"]}.png`; 
    venueImage.classList.add("venue-image");
    const venueDetails = document.createElement("div");
    venueDetails.classList.add("venue-details");
    const venueName = document.createElement("h3");
    venueName.id = `venue-name-${index}`;
    venueName.innerText = `${ele["ground"]}, ${ele["city"]}`;
    venueDetails.appendChild(venueName);
    const venueCountry = document.createElement("p");
    venueCountry.id = `venue-country-${index}`;
    venueCountry.innerText = `${ele["country"]}`;
    venueDetails.appendChild(venueCountry);
    venueContainer.appendChild(venueImage);
    venueContainer.appendChild(venueDetails);
    subContainer.appendChild(venueContainer);
  });
}
const urlTeams = 'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international';
const optionsTeams = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function teams() {
  
  try {
    const response = await fetch(urlTeams, optionsTeams);
    const result = await response.text();
    localStorage.setItem("team",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
teams()


function displayTeams() {
  let navele = document.createElement("a");
  navele.href = "./more.html";
  navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> Browse Teams`;
  navele.id = "navele";
  upperbg.innerHTML = "";
  upperbg.appendChild(navele);
  subContainer.innerHTML = "";

  let storedTeams = JSON.parse(localStorage.getItem("team"));
  if (!storedTeams || !storedTeams["list"]) {
    let errorMsg = document.createElement("p");
    errorMsg.textContent = "No teams available.";
    subContainer.appendChild(errorMsg);
    return;
  }

  let categories = {
    International: [],
    Domestic: [],
    League: [],
    Women: [],
  };

  // Categorize teams based on logic
  storedTeams["list"].forEach((teamData) => {
    let category = "International"; // Example categorization logic
    categories[category].push(teamData);
  });

  for (let category in categories) {
    let categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    categoryTitle.className = "categoryTitle";
    subContainer.appendChild(categoryTitle);

    let teamGrid = document.createElement("div");
    teamGrid.className = "teamGrid";
    subContainer.appendChild(teamGrid);

    categories[category].forEach((teamData) => {
      let teamContainer = document.createElement("div");

      // Different classes based on presence of imageId
      if (teamData["imageId"]) {
        teamContainer.className = "teamContainerWithImage"; // Class for teams with imageId
        let teamImage = document.createElement("img");
        teamImage.className = "teamImage";
        teamImage.src = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${teamData["imageId"]}/i.jpg`;
        teamContainer.appendChild(teamImage);
      } else {
        teamContainer.className = "teamContainerWithoutImage"; 
      }

      let teamNameElement = document.createElement("p");
      teamNameElement.className = "teamName";
      teamNameElement.innerHTML = teamData["teamName"];

      teamContainer.appendChild(teamNameElement);

      teamGrid.appendChild(teamContainer);
    });
  }
}


const urlPlayers = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending';
const optionsPlayers = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function players() {
  
  try {
    const response = await fetch(urlPlayers, optionsPlayers);
    const result = await response.text();
    localStorage.setItem("players",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
players()



function renderBowlingStats() {
  let navele = document.createElement("a");
  navele.href = "./more.html";
  navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;Browse Players`;
  navele.id = "navele";
  upperbg.innerHTML = "";
  upperbg.appendChild(navele);
  subContainer.innerHTML = "";

  const storedBowlingStats = JSON.parse(localStorage.getItem("players"));
  console.log("Retrieved Data:", storedBowlingStats);

  if (
    !storedBowlingStats ||
    !storedBowlingStats.category ||
    !Array.isArray(storedBowlingStats.player)
  ) {
    console.error("Invalid data structure:", storedBowlingStats);
    return;
  }

  let bowlingTableContainer = document.createElement("div");
  bowlingTableContainer.className = "bowlingTable";

  // Search input
  let inputElement = document.createElement("input");
  inputElement.type = "text";
  inputElement.placeholder = "Search Players";
  inputElement.className = "searchInput";
  bowlingTableContainer.appendChild(inputElement);

  // Category title
  let category = document.createElement("p");
  category.id = "category";
  category.innerHTML = ` ${storedBowlingStats["category"]}`;
  bowlingTableContainer.appendChild(category);

  // Loop through each player and create a row
  storedBowlingStats["player"].forEach(player => {
    let playerRow = document.createElement("div");
    playerRow.className = "playerRow";

    let image = document.createElement("img");
    image.className = "playerImage";
    image.src = `https://example.com/images/${player["faceImageId"]}`;
    playerRow.appendChild(image);

    let playerInfo = document.createElement("div");
    playerInfo.className = "playerInfo";

    let name = document.createElement("p");
    name.className = "playerName";
    name.innerHTML = `${player["name"]}`;
    playerInfo.appendChild(name);

    let team = document.createElement("p");
    team.className = "playerTeam";
    team.innerHTML = `${player["teamName"]}`;
    playerInfo.appendChild(team);

    playerRow.appendChild(playerInfo);

    // Add click event to the player row
    playerRow.addEventListener("click", () => {
      renderPlayerNavigation(player);
      renderPlayerInfo(player); // Render the player info initially when clicked
    });

    bowlingTableContainer.appendChild(playerRow);
  });

  subContainer.appendChild(bowlingTableContainer);
}

function renderPlayerNavigation(player) {
  // Clear existing navigation (if any)
  upperbg.innerHTML = "";
  
  // Create navigation for player info
  let navigationContainer = document.createElement("div");
  navigationContainer.className = "playerNavigation";

  const sections = ["info", "batting", "bowling", "career", "news"];

  sections.forEach(section => {
    let navButton = document.createElement("button");
    navButton.className = "navButton";
    navButton.innerHTML = section.charAt(0).toUpperCase() + section.slice(1);
    navButton.addEventListener("click", () => {
      switch (section) {
        case "info":
          renderPlayerInfo(player);
          break;
        case "batting":
          BattingInfo(player);
          break;
        case "bowling":
          bowlingAll(player);
          break;
        case "career":
          careerAll(player);
          break;
        case "news":
          newsAll(player);
          break;
        default:
          break;
      }
    });

    navigationContainer.appendChild(navButton);
  });

  upperbg.appendChild(navigationContainer);
}


const urlPlayerInfo = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/6635';
const optionsPlayerInfo = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function playerInfo() {
  try {
    const response = await fetch(urlPlayerInfo, optionsPlayerInfo);
    const result = await response.text();
    localStorage.setItem("playerInfo",result);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
playerInfo()

function renderPlayerInfo() {
  subContainer.innerHTML = "";
  let playerInfoData = JSON.parse(localStorage.getItem("playerInfo"));
  if (!playerInfoData) {
    subContainer.innerHTML = "<h1>Player information not available.</h1>";
    return;
  }
  const infocontainer = document.createElement('div');
  infocontainer.id = 'player-info';
  const faceImage = document.createElement('img');
  faceImage.id = 'player-face-image';
  faceImage.src = playerInfoData["faceImageId"];
  faceImage.alt = "Player Face";
  container.appendChild(faceImage);
  const name = document.createElement('h2');
  name.id = 'player-name';
  name.innerText = playerInfoData["name"];
  infocontainer.appendChild(name);
  const team = document.createElement('p');
  team.id = 'player-team';
  team.innerText = playerInfoData["intlTeam"];
  infocontainer.appendChild(team);
  const personalInfoSection = createSection("Personal Information", [
    { label: "Date of Birth", value: playerInfoData["DoB"] },
    { label: "Birthplace", value: playerInfoData["birthPlace"] },
    { label: "Nickname", value: playerInfoData["nickName"] },
    { label: "Role", value: playerInfoData["role"] },
    { label: "Batting Style", value: playerInfoData["bat"] }
  ]);
  infocontainer.appendChild(personalInfoSection);
  const rankingsSection = createSection("ICC Rankings", [
    { label: "Batting Rank", value: playerInfoData["rankings"]["bat"] ? playerInfoData["rankings"]["bat"].testRank : "N/A" },
    { label: "Batting Best Rank", value: playerInfoData["rankings"]["bat"] ? playerInfoData["rankings"]["bat"].testBestRank : "N/A" },
    { label: "Bowling Rank", value: playerInfoData["rankings"]["bowl"] ? playerInfoData["rankings"]["bowl"].testBestRank : "N/A" },
  ]);
  infocontainer.appendChild(rankingsSection);
  const teamsSection = createSection("Teams", [
    { label: "Teams", value: playerInfoData["teams"] }
  ]);
  infocontainer.appendChild(teamsSection);
  const bioSection = createSection("Bio", [
    { label: "Bio", value: playerInfoData["bio"] }
  ]);
  infocontainer.appendChild(bioSection);
  subContainer.innerHTML = "";
  subContainer.appendChild(infocontainer);
}
function createSection(title, data) {
  const section = document.createElement('section');
  section.innerHTML = `<h3>${title}</h3>`;

  data.forEach(item => {
    const paragraph = document.createElement('p');
    paragraph.id = `player-${item.label.toLowerCase().replace(" ", "-")}`;
    paragraph.innerText = `${item.label}: ${item.value}`;
    section.appendChild(paragraph);
  });

  return section;
}
   

const urlPlayerBowlling = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/8733/bowling';
const optionsPlayerBowlling = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function playerBowlling() {
  
  try {
    const response = await fetch(urlPlayerBowlling, optionsPlayerBowlling);
    const result = await response.text();
    localStorage.setItem("playerBowl",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
playerBowlling()
function bowlingAll() {
  subContainer.innerHTML = ""; 
  let res = JSON.parse(localStorage.getItem("playerBowl"));
  let bowlingTable = document.createElement("div");
  bowlingTable.className = "bowlingTable";
  let headerRow = document.createElement("div");
  headerRow.className = "headerRow";
  res["headers"].forEach(header => {
    let headerCell = document.createElement("div");
    headerCell.className = "headerCell";
    headerCell.innerHTML = header;
    headerRow.appendChild(headerCell);
  });
  bowlingTable.appendChild(headerRow);
  res["values"].forEach(record => {
    let valueRow = document.createElement("div");
    valueRow.className = "valueRow";
    record["values"].forEach((value, index) => {
      let valueCell = document.createElement("div");
      valueCell.className = "valueCell";
      valueCell.innerHTML = value;
      valueRow.appendChild(valueCell);
    });
    bowlingTable.appendChild(valueRow);
  });
  subContainer.appendChild(bowlingTable);
}
// bowlingAll()


const urlPlayerBatting = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/8733/batting';
const optionsPlayerBatting = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function playerBatting() {
  
  try {
    const response = await fetch(urlPlayerBatting, optionsPlayerBatting);
    const result = await response.text();
    localStorage.setItem("playerBatting",result)
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
}
playerBatting()

function BattingInfo() {
  subContainer.innerHTML = ""; 
  let battingData = JSON.parse(localStorage.getItem("playerBatting"));
  console.log(battingData);

  // Create the main table container
  let battingTable = document.createElement("div");
  battingTable.className = "battingTable";

  // Create header row
  let headerRow = document.createElement("div");
  headerRow.className = "headerRow";

  // Add headers to the header row
  battingData["headers"].forEach(header => {
    let headerCell = document.createElement("div");
    headerCell.className = "headerCell";
    headerCell.innerHTML = header;
    headerRow.appendChild(headerCell);
  });

  // Append the header row to the table
  battingTable.appendChild(headerRow);

  // Add values (data rows) to the table
  battingData["values"].forEach(record => {
    let valueRow = document.createElement("div");
    valueRow.className = "valueRow";

    // Add each value in the record to the row
    record["values"].forEach((value, index) => {
      let valueCell = document.createElement("div");
      valueCell.className = "valueCell";
      valueCell.innerHTML = value;
      valueRow.appendChild(valueCell);
    });

    // Append the value row to the table
    battingTable.appendChild(valueRow);
  });

  // Append the whole batting table to the subContainer (main container)
  subContainer.appendChild(battingTable);
}
// renderBattingInfo()



const urlPlayerCareer = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/8733/career';
const optionsPlayerCareer = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function playerCareer() {
  
  try {
    const response = await fetch(urlPlayerCareer, optionsPlayerCareer);
    const result = await response.text();
    localStorage.setItem("playerCareer",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
playerCareer()
function careerAll() {
  subContainer.innerHTML = "";  
  let res = JSON.parse(localStorage.getItem("playerCareer"));
  res["values"].forEach(value => {
    let careerItem = document.createElement("div");
    careerItem.className = "careerItem";

    let formatName = document.createElement("p");
    formatName.id = "formatName";
    formatName.innerHTML = `${value["name"]}`;
    subContainer.appendChild(formatName);

    let debutInfo = document.createElement("p");
    debutInfo.id = "debutInfo";
    debutInfo.innerHTML = `Debut: ${value["debut"]}`;
    careerItem.appendChild(debutInfo);

    let lastPlayedInfo = document.createElement("p");
    lastPlayedInfo.id = "lastPlayedInfo";
    lastPlayedInfo.innerHTML = `Last Played: ${value["lastPlayed"]}`;
    careerItem.appendChild(lastPlayedInfo);

    subContainer.appendChild(careerItem);
  });
}
// careerAll()
const urlPlayerNews = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/player/8733';
const optionsPlayerNews = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function playerNews() {
  
  try {
    const response = await fetch(urlPlayerNews, optionsPlayerNews);
    const result = await response.text();
    localStorage.setItem("playerNews",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
playerNews()

function newsAll() {
    subContainer.innerHTML = ""; // Clear subCOntainer for fresh data display
  
    let res = JSON.parse(localStorage.getItem("playerNews"));
    
    // Create a container for the news stories
    let newsContainer = document.createElement("div");
    newsContainer.className = "newsContainer";
    
    // Loop through each story in the storyList
    for (let i = 0; i < res["storyList"].length; i++) {
      let story = res["storyList"][i]["story"];
      
      if (story) {
        // Create a new div for each story
        let storyItem = document.createElement("div");
        storyItem.className = "storyItem";
  
        // Create a headline element
        let headline = document.createElement("h6");
        headline.className = "storyHeadline";
        headline.innerHTML = story["hline"];
        storyItem.appendChild(headline);
  
        // Create a publication date element
        let pubDate = document.createElement("p");
        pubDate.className = "storyPubDate";
        pubDate.innerHTML = formatISTDate(story["pubTime"]);
        storyItem.appendChild(pubDate);
  
        // Create an introductory text element
        let introText = document.createElement("p");
        introText.className = "storyIntro";
        introText.innerHTML = story["intro"];
        storyItem.appendChild(introText);
  
        // Append the story item to the news container
        newsContainer.appendChild(storyItem);
      }
    }
  
    // Append the news container to subCOntainer
    subContainer.appendChild(newsContainer);
  }
  // newsAll()




const urlSchedule = 'https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international';
const optionsSchedule = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function schedule() {
  
  try {
    const response = await fetch(urlSchedule, optionsSchedule);
    const result = await response.text();
    localStorage.setItem("schedule",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
schedule()


function renderMatchSchedule() {
  let navele = document.createElement("a");
  navele.href = "./more.html";
  navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;Schedules`;
  navele.id = "navele";
  upperbg.innerHTML = "";
  upperbg.appendChild(navele);
  subContainer.innerHTML = "";
  const storedSchedule = JSON.parse(localStorage.getItem("schedule"));
  console.log("Stored Schedule Data:", storedSchedule);
  if (!storedSchedule || !storedSchedule.matchScheduleMap) {
    console.error("Invalid or missing schedule data.");
    return;
  }
  storedSchedule.matchScheduleMap.forEach(entry => {
    if (!entry.scheduleAdWrapper || !entry.scheduleAdWrapper.matchScheduleList) {
      console.warn("Skipping non-schedule entry:", entry);
      return;
    }
    let scheduleAdWrapper = entry.scheduleAdWrapper;
    let date = scheduleAdWrapper.date || "Unknown Date";
    let dateElement = document.createElement("h3");
    dateElement.textContent = date;
    subContainer.appendChild(dateElement);
    scheduleAdWrapper.matchScheduleList.forEach(match => {
      if (!match || !match.matchInfo || !Array.isArray(match.matchInfo)) {
        console.warn("Skipping invalid match entry:", match);
        return;
      }
      let seriesName = match.seriesName || "Unknown Series";
      let seriesElement = document.createElement("h4");
      seriesElement.textContent = seriesName;
      subContainer.appendChild(seriesElement);
      match.matchInfo.forEach(matchDetails => {
        if (!matchDetails.team1 || !matchDetails.team2 || !matchDetails.venueInfo) {
          console.warn("Skipping incomplete matchDetails:", matchDetails);
          return;
        }
        let matchContainer = document.createElement("div");
        matchContainer.className = "match-container";
        let matchInfoElement = document.createElement("p");
        matchInfoElement.textContent = `${matchDetails.matchDesc}. ${matchDetails.venueInfo.city}`;
        matchInfoElement.className = "match-info";
        matchContainer.appendChild(matchInfoElement);
        let team1Container = document.createElement("div");
        team1Container.className = "team-container";
        let team1Img = document.createElement("img");
        team1Img.src = `https://example.com/team-images/${matchDetails.team1.imageId}.png`;
        team1Img.className = "team-logo";
        let team1Name = document.createElement("p");
        team1Name.textContent = matchDetails.team1.teamName;
        team1Name.className = "team-name";
        team1Container.appendChild(team1Img);
        team1Container.appendChild(team1Name);
        let startTime = formatISTDate(matchDetails.startDate);
        let startTimeElement = document.createElement("p");
        startTimeElement.textContent = startTime;
        startTimeElement.className = "match-time";
        let team2Container = document.createElement("div");
        team2Container.className = "team-container";
        let team2Img = document.createElement("img");
        team2Img.src = `https://example.com/team-images/${matchDetails.team2.imageId}.png`;
        team2Img.className = "team-logo";
        let team2Name = document.createElement("p");
        team2Name.textContent = matchDetails.team2.teamName;
        team2Name.className = "team-name";
        team2Container.appendChild(team2Img);
        team2Container.appendChild(team2Name);
        matchContainer.appendChild(team1Container);
        matchContainer.appendChild(startTimeElement);
        matchContainer.appendChild(team2Container);
        subContainer.appendChild(matchContainer);
      });
    });
  });
}



const urlRanking = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen?formatType=test';
const optionsRanking = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function rankings() {
  
  try {
    const response = await fetch(urlRanking, optionsRanking);
    const result = await response.text();
    localStorage.setItem("ranking",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
rankings()

function menRank() {
  let navele = document.createElement("a");
  navele.href = "./more.html";
  navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;ICC Rankings - Men`;
  navele.id = "navele";
  upperbg.innerHTML = "";
  upperbg.appendChild(navele);
  subContainer.innerHTML = "";

  let headerRow = document.createElement("div");
  headerRow.id = "headerRow";
  subContainer.appendChild(headerRow);
  let rankHeader = document.createElement("p");
  rankHeader.textContent = "Rank";
  rankHeader.id = "rankHeader";
  headerRow.appendChild(rankHeader);

  let imageHeader = document.createElement("p");
  imageHeader.textContent = "Image";
  imageHeader.id = "imageHeader";
  headerRow.appendChild(imageHeader);

  let playerHeader = document.createElement("p");
  playerHeader.textContent = "Player";
  playerHeader.id = "playerHeader";
  headerRow.appendChild(playerHeader);

  let pointsHeader = document.createElement("p");
  pointsHeader.textContent = "Points";
  pointsHeader.id = "pointsHeader";
  headerRow.appendChild(pointsHeader);
  let rankingData = JSON.parse(localStorage.getItem("ranking"));
  console.log(rankingData);
  for (let i = 0; i < rankingData["rank"].length; i++) {
    let rankElement = document.createElement("div");
    subContainer.appendChild(rankElement);
    rankElement.id = "rankElement";
    let rank = document.createElement("p");
    rank.textContent = i + 1;
    rank.id = "rank";
    rankElement.appendChild(rank);
    let rankImage = document.createElement("img");
    rankImage.id = "rankImage";
    let id = rankingData["rank"][i]["faceImageId"];
    rankImage.src = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${id}/i.jpg`;
    rankElement.appendChild(rankImage);
    let con = document.createElement("div");
    con.id = "con";
    rankElement.appendChild(con);
    let name = document.createElement("p");
    name.innerHTML = rankingData["rank"][i]["name"];
    name.id = "name";
    con.appendChild(name);

    let country = document.createElement("p");
    country.id = "country";
    country.innerHTML = rankingData["rank"][i]["country"];
    con.appendChild(country);

    // Player Points
    let points = document.createElement("p");
    points.id = "points";
    points.innerHTML = rankingData["rank"][i]["points"];
    rankElement.appendChild(points);
  }
}


const urlRecords = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/topstats';
const optionsRecords = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '143ef6267emshf9ecc93fa7637adp16b501jsn45b56730886f',
		'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};
async function records() {
  
  try {
    const response = await fetch(urlRecords, optionsRecords);
    const result = await response.text();
    localStorage.setItem("records",result)
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
records()

function renderRecords(category = "Batting") {
  let navele = document.createElement("a");
  navele.href = "./more.html";
  navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;ICC Rankings - Men`;
  navele.id = "navele";
  upperbg.innerHTML = "";
  upperbg.appendChild(navele);
  let box=document.createElement("div");
  upperbg.appendChild(box);
  let btn1 = document.createElement("button");
  btn1.innerHTML = "Batting";
  btn1.id="recs";
  let btn2 = document.createElement("button");
  btn2.innerHTML = "Bowling";
  btn2.id="recs"
  box.append(btn1, btn2);
  btn1.addEventListener("click", () => renderRecords("Batting"));
  btn2.addEventListener("click", () => renderRecords("Bowling"));
  subContainer.innerHTML = "";
  const statsData = JSON.parse(localStorage.getItem("records"));
  console.log(statsData["statsTypesList"]);
  statsData["statsTypesList"].forEach((ele) => {
    ele["types"].forEach((item) => {
      if (item["category"] === category) {
        const recordElement = document.createElement("div");
        recordElement.classList.add("record-element");
        const statValue = document.createElement("p");
        statValue.textContent = item["value"];
        statValue.classList.add("stat-value");
        recordElement.appendChild(statValue);
        subContainer.appendChild(recordElement);
      }
    });
  });
}
});
