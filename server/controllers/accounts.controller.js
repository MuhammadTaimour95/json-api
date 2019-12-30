const accountsService = require('../services/accounts.service');
var request = require('request');
var count = 221;

function facebookLikesCount() {
  pageId = '1197657160409500';
  access_token =
    'EAAIRixXmsaEBAHZAzNHUh2cGVBWImzzYPqMNJRSndLVJmM6ZBo8XQkTZBd8OovojxVpHjOS61N0P7AZA61i55z85hwFq6RelcdJ1IrWHJBiEjchDhplKjbHTsMaKZCi1k4LNPO3l4oZBTZA6mkrIfE43moZBVEMoc1U9uZCVZAwKQbHQZDZD';
  //Set Url of JSON data from the facebook graph api. make sure callback is set with a '?' to overcome the cross domain problems with JSON
  var url =
    'https://graph.facebook.com/' +
    pageId +
    '?fields=name,fan_count&access_token=' +
    access_token +
    '';

  var url2 =
    'https://graph.facebook.com/1197657160409500?fields=name,fan_count&access_token=EAAIRixXmsaEBAIkiYP9p3SWHbBDZA3G1coBDwfdpDIZAmTg89KeUUDBgApcc8hjIDDKL2ZCDs6vm9qNEAxbWUct6cpAU7p0F9NfZCSv8oc4nrsLlVpD6ynTDwQEAylZC9W72T2xr0OlFTZAPRUTLF2f6rXZCNYqqCOIQ7HgdBZBBZAcMRP0qvG6S3UOpdXLg2qCz8pCPvPZAnSrwZDZD';

  //Use jQuery getJSON method to fetch the data from the url and then create our unordered list with the relevant data.
  request(
    {
      url: url,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        count = body.fan_count;
        console.log(body);
      }
      console.log(error);
    }
  );
}

var myCallback = function(data) {
  facebookLikesCount();
  console.log('got data: ' + data);
};

var usingItNow = function(callback) {
  callback('get it?');
  console.log('conteoller ' + count);
  globalres.send(accountsService.get(globalreq.params._id, count));
};

var globalreq;
var globalres;
const get = function(req, res) {
  globalreq = req;
  globalres = res;
  usingItNow(myCallback);
  //facebookLikesCount();
  //res.send(accountsService.get(req.params._id, count));
};

const getAll = function(req, res) {
  res.send(accountsService.getAll());
};

module.exports = {
  get,
  getAll
};
