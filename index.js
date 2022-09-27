const express = require('express');
const app = express();

const bahur = [{"id":1,"first_name":"Dun","last_name":"Crady","email":"dcrady0@opensource.org","gender":"Agender","ip_address":"137.231.99.35"},
{"id":2,"first_name":"Gabie","last_name":"Szimoni","email":"gszimoni1@earthlink.net","gender":"Female","ip_address":"197.177.15.97"},
{"id":3,"first_name":"Pincus","last_name":"Yakunikov","email":"pyakunikov2@symantec.com","gender":"Male","ip_address":"198.21.85.152"},
{"id":4,"first_name":"Blondell","last_name":"O' Timony","email":"botimony3@princeton.edu","gender":"Female","ip_address":"249.180.224.75"},
{"id":5,"first_name":"Sara-ann","last_name":"Avon","email":"savon4@furl.net","gender":"Female","ip_address":"144.120.52.159"},
{"id":6,"first_name":"Reinaldos","last_name":"Pedro","email":"rpedro5@last.fm","gender":"Male","ip_address":"137.167.137.23"},
{"id":7,"first_name":"Sander","last_name":"Smartman","email":"ssmartman6@1und1.de","gender":"Male","ip_address":"67.150.212.146"},
{"id":8,"first_name":"Abbie","last_name":"Walkling","email":"awalkling7@ycombinator.com","gender":"Male","ip_address":"162.217.181.28"},
{"id":9,"first_name":"Reggis","last_name":"Gillham","email":"rgillham8@spiegel.de","gender":"Male","ip_address":"80.63.196.240"},
{"id":10,"first_name":"Garfield","last_name":"Organ","email":"gorgan9@who.int","gender":"Male","ip_address":"179.245.76.51"},
{"id":11,"first_name":"Rakel","last_name":"Sorel","email":"rsorela@webeden.co.uk","gender":"Female","ip_address":"198.51.93.67"},
{"id":12,"first_name":"Nicolais","last_name":"Yurocjhin","email":"nyurocjhinb@about.com","gender":"Male","ip_address":"139.189.51.240"},
{"id":13,"first_name":"Justina","last_name":"Perrington","email":"jperringtonc@un.org","gender":"Female","ip_address":"45.231.254.187"},
{"id":14,"first_name":"Jacinda","last_name":"Scahill","email":"jscahilld@skype.com","gender":"Female","ip_address":"26.216.94.248"},
{"id":15,"first_name":"Russell","last_name":"Werrett","email":"rwerrette@fc2.com","gender":"Male","ip_address":"97.198.105.169"},
{"id":16,"first_name":"Carolyne","last_name":"Paszak","email":"cpaszakf@nsw.gov.au","gender":"Female","ip_address":"174.179.75.119"},
{"id":17,"first_name":"Wendi","last_name":"Allmark","email":"wallmarkg@hubpages.com","gender":"Female","ip_address":"208.231.87.117"},
{"id":18,"first_name":"Schuyler","last_name":"Callander","email":"scallanderh@moonfruit.com","gender":"Male","ip_address":"243.60.31.239"},
{"id":19,"first_name":"Delphinia","last_name":"Glennard","email":"dglennardi@xrea.com","gender":"Female","ip_address":"55.55.7.154"},
{"id":20,"first_name":"Louie","last_name":"Coneybeare","email":"lconeybearej@sourceforge.net","gender":"Male","ip_address":"215.60.97.80"}];


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
app.get('/users', (req, res) => {
  res
    .status(200)
    .send(bahur)
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});