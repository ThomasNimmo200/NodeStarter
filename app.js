const request = require('request');
const cheerio = require('cheerio');

request('http://127.0.0.1:5500/clients/Adimo/test/index.html', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    const $ = cheerio.load(body);
    const cheeses = [];

    $('div.item').each(function(i, elem){
        var cheese = {};

        console.log('----------------------------------------------------');
        cheese.title = $(this).children('h1').text();
        cheese.price = $(this).children('span.price').text();
        cheese.price = $(this).children('span.price').text();
        // console.log($(this).text());
        console.log('----------------------------------------------------');
    });
});