"use strict";

let baseUrl = "https://thecrew.cc/news/read.php";

let articles;


window.onload = onLoad;


async function onLoad() {

    let result = await sendRequest();
    articles = result.news;
    console.log(articles);

    createHTML();
}

async function sendRequest() {
    let result = await fetch(baseUrl);
    return result.json();
}


function createHTML() {



    document.getElementById("content").innerHTML = '';

    for (let article of articles) {



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




        introtekst.innerHTML = article.content;

        let divPublishlikes = document.createElement("div");
        divPublishlikes.classList.add("likes");
        divPublishlikes.innerText = article.likes;
        divPublishlikes.className = "likeDiv";


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