document.addEventListener("DOMContentLoaded", async function(){
    
    slider = document.getElementById('slider')
   
    try{
        resp = await fetch(`https://dog.ceo/api/breeds/image/random/10`);
        data = await resp.json();
        data.message.forEach(link => {
            image = document.createElement('img');
            image.setAttribute('src', link)
            slider.appendChild(image);
        });
        
    }
    catch(err){
        console.error(err);
    }
    

    simpleslider.getSlider();

    buttondiv = document.getElementById('breed-buttons');
    infodiv = document.getElementById('breed-info');
    try{
        resp = await fetch(`https://dogapi.dog/api/v2/breeds`);
        json = await resp.json();
        console.log(json);
        data = json.data
        console.log(data);
        data.forEach(breed => {
            console.log("adding " + breed.attributes.name);
            button = document.createElement('button');
            button.innerText = breed.attributes.name;
            button.setAttribute('value', breed.attributes.name.toLowerCase());
            button.setAttribute('onclick', "{showDog(this.value)}");
            button.setAttribute('class', "breed-button" )
            button.setAttribute('id', breed.attributes.name.toLowerCase() )
            buttondiv.appendChild(button);

            info = document.createElement('div');
            info.setAttribute('id', `info-${breed.attributes.name.toLowerCase()}`)

            header = document.createElement('h2');
            header.innerText = breed.attributes.name;

            description = document.createElement('p');
            description.innerText = breed.attributes.description;

            minlife = document.createElement('p');
            minlife.innerText = `Min Life: ${breed.attributes.life.min}`;


            maxlife = document.createElement('p');
            maxlife.innerText = `Max Life: ${breed.attributes.life.max}`;

            info.appendChild(header);
            info.appendChild(description);
            info.appendChild(minlife);
            info.appendChild(maxlife);
            infodiv.appendChild(info);

            info.style.display = 'none';

        });
        
    }
    catch(err){
        console.error(err);
    }

});

function showDog(breed){
    console.log(breed);
    document.querySelectorAll('#breed-info div').forEach(div => {
        div.style.display = 'none';
    });
    infodiv = document.getElementById(`info-${breed}`);
    infodiv.style.display = 'block';

}