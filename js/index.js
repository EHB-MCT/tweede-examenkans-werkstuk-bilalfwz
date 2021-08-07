"use strict";

let baseUrl = "https://thecrew.cc/news/read.php";

let articles;

window.onload = onLoad;


async function onLoad() {

    let result = await sendRequest();
    articles = result.news;
    console.log(articles);
}

async function sendRequest() {
    let result = await fetch(baseUrl);
    return result.json();
}