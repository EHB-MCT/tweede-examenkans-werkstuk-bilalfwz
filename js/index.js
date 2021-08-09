"use strict";


let baseUrl = "https://thecrew.cc/news/read.php";

let articles;


let key = document.getElementById("searchBar");


let likesBtn = document.getElementsByClassName("likeDiv");




window.onload = onLoad;


const showContent = document.getElementsByClassName("showContent");


key.onkeyup = search;






function search() {
    createHTML();
}


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




    let value = key.value.toLowerCase();


    document.getElementById("content").innerHTML = '';

    for (let article of articles) {


        let title = article.title.toLowerCase();

        if (title.includes(value)) {


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

    for (const content of showContent) {
        content.addEventListener("click", function () {
            console.log("onderTitle" + this.id);
            let articleOndertitle = "onderTitle" + this.id;
            document.getElementById(articleOndertitle).hidden = false;
        });
    }


    for (const likeBtn of likesBtn) {
        likeBtn.addEventListener("click", function () {
            console.log("ID " + this.id);
            let id = this.id;
            postRequest(id);
        });
    }
}


function updateLike() {
    async function onLoad() {
        let result = await sendRequest();
        articles = result.news;

    }
}


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