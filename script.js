function setup(){
    if(annyang){
        console.log("annyang working")
        var commands ={
            'hello': function(){
                alert("Hello World!")
            }, 
            'change the color to *color': function(color){
                console.log(color);
                document.body.style.backgroundColor = color;
            }, 
            'navigate to *page' : function(page){
                switch(page){
                    case 'home':
                        window.location.href = 'index.html';
                        break;
                    case 'dogs':
                        window.location.href = 'dogs.html';
                        break;
                    case 'stocks':
                        window.location.href = 'stocks.html';
                        break;
                }
            },
            'look up *stock' : function(stock){
                console.log("looking up " + stock);
                showStock(true, stock);
            },
            'load dog breed *breed' : function(breed){
                console.log("showing dog breed "+ breed);
                showDog(breed.toLowerCase());
            }
        }

        annyang.addCommands(commands);

        annyang.start();
    }

    


}

let currChart = null;

function formatDate(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

async function showStock(voice, stock){
    event.preventDefault();
    const ctx = document.getElementById('myChart');

    let ticker;

    if(!voice){
        ticker = document.getElementById('ticker-input').value.toUpperCase();
    } else {
        ticker = stock.toUpperCase().replaceAll(" ","");
    }
    //console.log("Ticker input: " + ticker);
    const daterange = document.getElementById('date-range').value.slice(0,2);
    //console.log("Date range: " + daterange);
    const startDate = formatDate(new Date());
    //console.log(startDate);
    const endDate = formatDate(new Date(new Date() - daterange * 24 * 60 * 60 * 1000));
    //console.log(endDate);


    if(currChart){
        currChart.destroy();
    }
    try{
        const resp = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${endDate}/${startDate}?apiKey=12weaJ0_DnfZDRJSgxZTR9PSM1cBs00F`);
        const data = await resp.json();
        console.log(data);

        const prices = data.results;
        console.log(prices);
        const labels = [];
        const chartdata = [];
        prices.forEach(day => {
            //console.log("adding day " + new Date(day.t) + "at price " + day.c);
            labels.push(formatDate(new Date(day.t)));
            chartdata.push(day.c);
            
        });
        Chart.defaults.color = '#fff';
        
        currChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: labels,
            datasets: [{
                label: `${ticker} closing price`,
                data: chartdata,
                borderWidth: 1
            }]
            },
            options: {
            scales: {
                y: {
                beginAtZero: true
                }
            }
            }
        });

    }
    catch (err){
        console.error(err)
    }
    
    return false;
}


window.onload = setup;