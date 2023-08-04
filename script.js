
// import our environment variables from config .js file
// require("dotenv").config();
const apiKey = process.env.API_KEY;

// dalle-api import images
const getImages = async (data)=>{
    let options={
        method:"POST",
        headers:{
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
    }
    try{
        const response=await fetch("https://api.openai.com/v1/images/generations", options)
        if(response.status != 200){
            throw new Error("inavlid post")
        }
        const data= await response.json()
        return data

    }catch(e){
        console.error(e)
    }
}


// access page elements
let form=document.querySelector("form")

// add event listener to submit prompt
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    let input=e.target.querySelector("input")
    console.log(input.value)
    let apiBody={
        prompt:`${input.value}`,
        n:3,
        size:"512x512"
    }
    // page element
    let searchResult=document.getElementById("search-result")
    // create loader element
    const loader=document.createElement("div");
    loader.classList.add('loader')
    // append our loader
    searchResult.appendChild(loader)
    // fetch our data from our api
    getImages(apiBody)
    .then(data=>{
        // on getting the data remove loader
        if (data){
            loader.classList.add("loader-hidden")
            
            // after 0.75s the loader is removed dynamically
            loader.addEventListener("transitionend", ()=>{
                document.body.removeChild("loader");
            })
        }
        // remove loader

        console.log(data)
        handlePrompt(data)
    }).catch(e=>{
            alert("invalid api key ");
          loader.classList.add("loader-hidden");
            
            // after 0.75s the loader is removed dynamically
            loader.addEventListener("transitionend", ()=>{
                document.body.removeChild("loader");
            })})

    // reset our form
    form.reset()

})



// function that creates the image from dalle api to the html page
function handlePrompt(data){
    // console.log(data)
    // our data is an array
    // get our search result div
    // console.log(data.data)
    let searchResult=document.getElementById("search-result")
    data.data.map(element => {   
        let img=document.createElement('img')
        img.src=element.url
        img.alt="result image"
        let downloadButton=document.createElement("button")
        downloadButton.innerHTML=`<i class="fa-solid fa-download"></i>`

        // add download event listener
        // contributions on how to implement this wll be helpful, since it does not download the file onclick
        // downloadButton.addEventListener("click", async ()=>{
        //     try{
        //         const response= await fetch(element.url);
        //         const file= await response.blob();
        //         let link =document.createElement("a")
        //         link.href =  window.URL.createObjectURL(file);
        //         link.download= new Date().getTime();
        //         link.click();
        //     }catch(e){
        //        alert("failed to download")
        //     }
        // })

        // Simpler download buttn event listener
        downloadButton.addEventListener("click", async () => {
            try {
                const link = document.createElement("a");
                link.href = element.url; // Use the original image URL directly
                link.download = ""; // Set an empty value for the 'download' attribute to maintain the original filename
                link.click();
            } catch (e) {
                alert("Failed to download");
            }
        });

        searchResult.appendChild(img)
        searchResult.appendChild(downloadButton)  
    });
}

