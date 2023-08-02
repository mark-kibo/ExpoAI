const apiKey="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"

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



console.log(getImages({
    "prompt": "pictures of cats",
    "n": 1,
    "size": "1024x1024"
}).then(data=> console.log(data)))