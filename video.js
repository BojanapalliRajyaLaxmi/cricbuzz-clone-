document.addEventListener("DOMContentLoaded", function () {
  let container = document.createElement("div");
  container.id = "container";
  document.body.appendChild(container);
  
  let upperbg = document.createElement("div");
  upperbg.id = "upperbg";
  container.appendChild(upperbg);
  let logo = document.createElement("p");
  logo.id = "navimg";
  logo.innerHTML = " Videos ";
  upperbg.appendChild(logo);
  let nav=document.createElement("div");
  nav.id="nav"
  upperbg.appendChild(nav)
  
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
  const arr = [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/5tkqKvU1-D0?si=WGK9XiUQo-UXDd0V" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/_CFS5uZCcTw?si=sVNkNNNLr3nJIGtN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/4gulVzzh82g?si=2uQf7vw_2nBihLe-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/aVJNHjJVC-o?si=StR1y9JfWg-KIN2c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/WQdqgrWvy6g?si=prw0n80zV0GwAfjI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/vdNrPdeEuYQ?si=XRnyzToFbX8g0oVQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZT2ilX9MC1w?si=-8mY67Pzlw3ABt5Z" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/gL_LIAm22Mc?si=P-8m9KzCr0oyX96W" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/LHg0IhDh82s?si=8OvyFgLeMuIxqaT9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/AFEZzf9_EHk?si=suDQUzdlsoOOx6ER" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/Lz5098-SeFY?si=3TDHAywAUCRe_m0P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/Lz5098-SeFY?si=3TDHAywAUCRe_m0P" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/nHFWwCsskwk?si=VsxXKeDpWUvNNkbM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>','<iframe width="560" height="315" src="https://www.youtube.com/embed/MaIGWBDaHow?si=EUnLi8oS-o1WFr8K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
  ];
  function insertIframeFromArray() {
    for(var a of arr){
      subContainer.innerHTML+=a;
    }
  }
insertIframeFromArray();
});