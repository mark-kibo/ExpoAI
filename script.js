// const apiKey="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"

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
        n:4,
        size:"512x512"
    }
    // get  loader element
    const loader=document.querySelector(".loader");

    // fetch our data from our api
    getImages(apiBody)
    .then(data=>{
        // remove loader
        console.log(data)
        handlePrompt(data)
    }).catch(e=>console.log(e))

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
        searchResult.innerHTML=`
        <img src="${element.url}" alt="image" srcset="">
        <a href="${element.url}" download="expoAi.jpg" target="_blank"><img src="${element.url}" alt="Image" hidden><i class="fa-solid fa-download"></i></a>
        `
    });
}