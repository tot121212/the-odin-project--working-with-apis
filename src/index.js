import "./template.css";
import {apiKey} from './apiKey.js';

const fetchImgURL = async (searchTerm)=>{
    const response = fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchTerm}`, {mode: "cors"})
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        console.log("JSON:", response);
        switch (response.meta.status) {
            case 200:
            case 429:
                throw new Error(response.meta.msg);
            default:
                break;
        }
        img.hidden = false;
        return response.data.images.original.url;
    })
    .catch((error)=>{
        const img = document.querySelector("img");
        img.hidden = true;
        console.log(error);
    });
    console.log("Response:", await response);
    return response;
}


document.addEventListener("DOMContentLoaded", async ()=>{
    const img = document.querySelector("img");
    img.src = await fetchImgURL("");
    const fetchBtn = document.querySelector("button");
    fetchBtn.addEventListener("click", async ()=>{
        let searchTerm = document.querySelector("input").value;
        const url = await fetchImgURL(searchTerm);
        if (!url) {
            return;
        }
        img.src = url;
    });
});