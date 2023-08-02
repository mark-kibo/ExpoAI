const apiKey="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"



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
    let apiBody={
        prompt:input.value,
        n:3,
        size:"1024x1024"
    }

    // fetch our data from our api
    getImages(apiBody)
    .then(data=>{
        handlePrompt(data)
    }).catch(e=>console.log(e))

    // reset our form

})



// function that creates the image from dalle api to the html page
function handlePrompt(data){
    // console.log(data)
    // our data is an array
    // get our search result div
    // console.log(data.data)
    let searchResult=document.getElementById("search-result")
    data.data.map(element => {
        // create image tag
        // let img=document.createElement('img')
        // img.src=element.url
        // img.alt="image"
        // let downloadButton =document.createElement('button')
        // let a=document.createElement('a')
        // a.href=element.url
        // downloadButton.appendChild(a)
        // // add download event listener on our download button to download image
        // downloadButton.addEventListener("click", (e)=>{
        //     a.setAttribute('download', 'true')
        // })

        // // add our tags to the page
        // searchResult.appendChild(img)
        // searchResult.appendChild(downloadButton)        
        searchResult.innerHTML=`
        <img src="${element.url}" alt="image" srcset="">
        <button><a href="./images/R.jpg" download="filename.jpg"><img src="./images/R.jpg" alt="Image" hidden><i class="fa-light fa-download"></i></a></button>
        `
    });
}