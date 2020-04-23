const accountsService = require('../services/accounts.service');
var request = require('request');
var count = 221;

function facebookLikesCount() {
  pageId = '1197657160409500';
  access_token =
    'EAAIRixXmsaEBAHZAzNHUh2cGVBWImzzYPqMNJRSndLVJmM6ZBo8XQkTZBd8OovojxVpHjOS61N0P7AZA61i55z85hwFq6RelcdJ1IrWHJBiEjchDhplKjbHTsMaKZCi1k4LNPO3l4oZBTZA6mkrIfE43moZBVEMoc1U9uZCVZAwKQbHQZDZD';
  //Set Url of JSON data from the facebook graph api. make sure callback is set with a '?' to overcome the cross domain problems with JSON
  page_access_token_lifetime =
    'EAAIRixXmsaEBADuEvkSZCKu5cdfZCKOUsx6QcEvfQP0q1QSYynqkx7OJk8MhSsDflOLfZCNyxpp0ZAW33LGnZC1cXxihqRVOZBdx7F4gtoBFpHVQST6EYm35MYjigzIqKegyOMNvxIZAVPZBIZCeizIRracILLrZB5YsqaXDgHgSw1rERXQsHMH3T9';

  long_term_access_token =
    'EAAReNQQHbyYBAMy0VDPIdD7qVodXivnoNCyvD2H3szfNYlZBBNP7Mwo6SZAouZBRTHd2gOEFUcjYhK9Tg9g2dIVnSa25c6ppz9fCLaYC8aqh5GiXVznNnn5KYcgxZBT65irJ27vIxjPh5UVFYaGUCcxZB4suDlO5ZBMZClbbLJkpju6PZCkneNMR';
  var url =
    'https://graph.facebook.com/' +
    pageId +
    '?fields=name,fan_count&access_token=' +
    access_token +
    '';

  var url_page_access =
    'https://graph.facebook.com/' +
    pageId +
    '?fields=name,fan_count&access_token=' +
    long_term_access_token +
    '';

  var main_url =
    'https://graph.facebook.com/1197657160409500?fields=name,fan_count&access_token=EAAReNQQHbyYBAO6y3UJ8uWZAkySX7YDYfsutnEAwPSWZAbusQdXgmvZAktNybJyJ6XHk8sZBzuxrk0WhgSR9jZAgVJmT1lTTYY9EIQ51UjnjfL1yh9a2iZCnZBvtBB9XgRCji6DpDbzLZBZBc01bTnOhmjeDZAx5XUrQH2L0y3pKQgfQZDZD';
  //Use jQuery getJSON method to fetch the data from the url and then create our unordered list with the relevant data.
  request(
    {
      url: main_url,
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        count = body.fan_count;
        console.log(body);
      }
      console.log(error);
    }
  );
}

var myCallback = function (data) {
  facebookLikesCount();
  console.log('got data: ' + data);
};

var usingItNow = function (callback) {
  callback('get it?');
  console.log('conteoller ' + count);
  globalres.send(accountsService.get(globalreq.params._id, count));
};

var globalreq;
var globalres;
const get = function (req, res) {
  globalreq = req;
  globalres = res;
  usingItNow(myCallback);
  //facebookLikesCount();
  //res.send(accountsService.get(req.params._id, count));
};

const getAll = function (req, res) {
  res.send(accountsService.getAll());
};

module.exports = {
  get,
  getAll,
};
