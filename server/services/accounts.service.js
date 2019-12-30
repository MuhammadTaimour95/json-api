const data = require('../../data');
var request = require('request');
var globalreq;
var globalres;

function facebookLikesCount() {
  pageId = '1197657160409500';
  access_token =
    'EAAIRixXmsaEBAKB5hYjdOe3T18yMR10eG1whpiWBL1tKs0tFxwwSYW7gbCZB3Qrmi8KnVtBXhScjcywnsTut9w5Nj3Dd5ZC4PeZB9rnZA6csZA8sXuh3cDdZCXqGzOQ5TtxlMNW1dEeuT6pMXsInwc23ccujyS339Sbh6COZB9PJQl7imKI8fF21nSqinaZC7ed1JJJliBptlgZDZD';
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
      url: url2,
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
};

const get = function(_id, count) {
  console.log('count in service' + count);
  data.Accounts.find(account => account._id == '0').count = count;
  data.Accounts.find(account => account._id == '0').number = count;
  data.Accounts.find(account => account._id == '0').likes = count;
  //console.log(data.Accounts.find(account => account._id == '0').count);

  return getAll().find(account => account._id == _id);
};

const getAll = function() {
  //console.log(data1.Accounts.find(1));
  return data.Accounts;
};

module.exports = {
  get,
  getAll
};
