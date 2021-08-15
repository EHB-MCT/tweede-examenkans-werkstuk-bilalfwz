"use strict";

///////////Globale variabels///////////////

//Get url
let baseUrl = "https://thecrew.cc/news/read.php";

//All articles
let articles;

//Key button
let key = document.getElementById("searchBar");

//Likes buttons
let likesBtn = document.getElementsByClassName("likeDiv");

//radioButtons
let radioMostlike = document.getElementById("mostLike");
let radioMinlike = document.getElementById("minLike");



window.onload = onLoad;

//showDescription
const showContent = document.getElementsByClassName("showContent");

//searchBar action
key.onkeyup = createHTML;

//radioButtons action
radioMostlike.onclick = likeFilter;
radioMinlike.onclick = minFilter;

//FilterMostlike
function likeFilter() {


    articles.sort(
        function (a, b) {
            return b.likes - a.likes;
        }
    );

    createHTML();
}

//FilterMinlike
function minFilter() {


    articles.sort(
        function (a, b) {
            return a.likes - b.likes;
        }
    );

    createHTML();
}


//Toon alle artikelen wanneer de pagina wordt geladen
async function onLoad() {

    let result = await sendRequest();
    articles = result.news;
    console.log(articles);

    createHTML();
}

//Request doorsturen naar URL
async function sendRequest() {
    let result = await fetch(baseUrl);
    return result.json();
}


//Artikels in de HTML tonen en bewerken 
function createHTML() {



    //searchBar value to LowerCase
    let value = key.value.toLowerCase();

    //Get div#content
    document.getElementById("content").innerHTML = '';

    //Artikels loop 
    for (let article of articles) {

        //titel to lowerCase
        let title = article.title.toLowerCase();

        //searchBar filter
        if (title.includes(value)) {

            /////Artikels in HTML bewerken/////

            let div = document.createElement("div");
            div.className = "articleClass";

            let hTitle = document.createElement("h3");
            hTitle.innerText = article.title;

            let imageWrapper = document.createElement("div");
            imageWrapper.classList.add("image_wrapper");

            let img = document.createElement("img");
            img.src = article.imageURI;
            img.className = "showContent";
            img.id = article.publicationDate;

            let articleContentWrapper = document.createElement("div");
            articleContentWrapper.classList.add("article_content_wrapper");

            let hDiv = document.createElement("div");

            let introtekst = document.createElement("div");


            introtekst.id = "onderTitle" + article.publicationDate;
            introtekst.className = "ondertitle";
            introtekst.hidden = true;


            introtekst.innerHTML = article.content;

            let divPublishlikes = document.createElement("div");
            divPublishlikes.classList.add("likes");
            divPublishlikes.innerText = article.likes;
            divPublishlikes.className = "likeDiv";

            divPublishlikes.id = article.UUID;

            hDiv.appendChild(hTitle);
            hDiv.appendChild(imageWrapper);
            hDiv.appendChild(introtekst);
            imageWrapper.appendChild(img);
            articleContentWrapper.appendChild(hDiv);
            articleContentWrapper.appendChild(divPublishlikes);
            div.appendChild(articleContentWrapper);
            document.getElementById("content").appendChild(div);
        }
    }
    //Show Subtitels
    for (const content of showContent) {
        content.addEventListener("click", function () {
            console.log("onderTitle" + this.id);
            let articleOndertitle = "onderTitle" + this.id;
            document.getElementById(articleOndertitle).hidden = false;
        });
    }

    //Like toevoegen
    for (const likeBtn of likesBtn) {
        likeBtn.addEventListener("click", function () {
            console.log("ID " + this.id);
            let id = this.id;
            postRequest(id);
        });
    }
}

// likes herladen
function updateLike() {
    async function onLoad() {
        let result = await sendRequest();
        articles = result.news;

    }
}

//Send PostRequest to URL
async function postRequest(id) {
    fetch(`https://thecrew.cc/news/create.php`, {
            method: 'POST',
            body: JSON.stringify({
                UUID: id
            })
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            onLoad();
        });

}