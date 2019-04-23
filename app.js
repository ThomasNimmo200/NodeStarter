const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('http://cdn.adimo.co/clients/Adimo/test/index.html', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    const $ = cheerio.load(body);
    var cheeses = [];

    $('div.item').each(function(i, elem){
        var cheese = {};
        cheese.title = $(this).children('h1').text(); 

        const relativeURL = $(this).children('img').attr('src');
        cheese.url = 'https://cdn.adimo.co/clients/Adimo/test/' + relativeURL;

        cheese.price = $(this).children('span.price').text();
        const currentCheesePriceNumber = parseFloat(cheese.price.substr(1));

        oldPrice = $(this).children('span.oldPrice').text()
        const oldCheesePriceNumber = parseFloat(oldPrice.substr(1))

        // Determines if there is a dicsount currently on the cheese
        if (oldCheesePriceNumber - currentCheesePriceNumber > 0) {
            cheese.discount = "£" +  (oldCheesePriceNumber - currentCheesePriceNumber).toString();
        }
        cheeses.push(cheese)        
    });

    var cheeseData = {}

    var totalPriceOfCheese = 0;
    var numberOfCheeses = 0;

    // Finds the total number of cheeses and the combined price of all the cheeses
    for(var cheese in cheeses) {
        numberOfCheeses += 1;
        const cheesePrice = (cheeses[cheese]['price'])
        const cheesePriceInt = parseFloat(cheesePrice.substr(1));
        totalPriceOfCheese += cheesePriceInt;
    }

    cheeseData.totalNumberOfCheeses = numberOfCheeses;
    cheeseData.averagePriceOfCheese = totalPriceOfCheese / numberOfCheeses;

    cheeses = cheeses.concat(cheeseData)

    const jsonCheese = JSON.stringify(cheeses, null, 2);    

    fs.writeFile('./cheese.json', jsonCheese, err => {
            if(err) {
                console.log(err)
            } else {
                console.log('File succesfully written to!');
            }
    })
    
});