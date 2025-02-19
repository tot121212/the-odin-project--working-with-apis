import "./template.css";
import {apiKey} from './apiKey.js';

const fetchImgURL = async (searchTerm) => {
    console.log("Search Term:", searchTerm);
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchTerm}`, { mode: "cors" });
        const json = await response.json();
        
        console.log("JSON:", json);
        
        switch (json.meta.status) {
            case 200:
                if (!json.data || !json.data.images || !json.data.images.original) {
                    throw new Error("No image found for search term.");
                }
                document.querySelector("img").hidden = false;
                const url = json.data.images.original.url;
                console.log("Image URL:", url);
                return url;
            case 429:
                throw new Error("Too many requests.");
            
            default:
                throw new Error(json.meta.msg || "Error");
        }

        return url;
    } catch (error) {
        console.error("Error:", error.message);
        document.querySelector("img").hidden = true;
        return null;
    }
};


document.addEventListener("DOMContentLoaded", async ()=>{
    const img = document.querySelector("img");
    let url = await fetchImgURL("");
    img.src = url;
    const fetchBtn = document.querySelector("button");
    fetchBtn.addEventListener("click", async ()=>{
        let searchTerm = document.querySelector("input").value;
        url = await fetchImgURL(searchTerm);
        console.log("Image URL:", url);
        img.src = url;
    });
});