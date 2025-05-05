document.addEventListener("DOMContentLoaded", async function(){
    tablediv = document.getElementById('stock-table');
    try{
        resp = await fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03');
        data = await resp.json();
        data = data.slice(0,5)
        console.log(data);
        data.forEach(stock => {
            row = document.createElement('tr');
            ticker = document.createElement('td');
            
            tickerlink = document.createElement('a');
            tickerlink.setAttribute('href', `https://finance.yahoo.com/quote/${stock.ticker} `)
            tickerlink.innerText= stock.ticker;
            comments = document.createElement('td');
            comments.innerText = stock.no_of_comments;
            sentiment = document.createElement('td');
            sentimentdiv = document.createElement('div');
            sentimentp = document.createElement('p')
            sentimentp.innerText = stock.sentiment;
            if(stock.sentiment == 'Bullish'){
                image = document.createElement('img');
                image.setAttribute('src', 'https://static.thenounproject.com/png/3328202-200.png');
                sentimentdiv.appendChild(image);
            } else{
                image = document.createElement('img');
                image.setAttribute('src', 'https://static.thenounproject.com/png/3328203-200.png');
                sentimentdiv.appendChild(image);
            }
            row.appendChild(tickerlink);
            row.appendChild(comments);
            row.appendChild(sentimentdiv);
            tablediv.appendChild(row);
        });
    }
    catch(err){
        console.error(err);
    }

});
