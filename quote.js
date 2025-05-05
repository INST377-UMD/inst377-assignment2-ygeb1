document.addEventListener("DOMContentLoaded", async function(){
    const quotetext = document.getElementById("quote");
    const authortext = document.getElementById("author");
    try{
        const resp = await fetch(`https://zenquotes.io/api/random`);
        const data = await resp.json();
        console.log(data)



        quotetext.innerText = data[0].q;
        console.log("quote: " + data[0].q)
        authortext.innerText = '-' + data[0].a;
    }
    catch (err) {
        console.error(err)
    }
    
});