const API_KEY = "912acf43f7a54e34a6d5c5e0bfd6999b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    document.getElementById('loading').style.display = 'inline-block';
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    document.getElementById('loading').style.display = 'none';
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImage = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=> {
        window.open(article.url, "_blank")
    })
}

let currSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
}

const searchBtn = document.getElementById('search-btn');
const searchText = document.getElementById('search-text');

searchBtn.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = null;
})


const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

navLinks.style.right = "-250px";

menuBtn.addEventListener('click',()=>{
    if(navLinks.style.right = "-250px"){
        navLinks.style.right = "0"
    }
    else{
        navLinks.style.right = "-250px"
    }
})
