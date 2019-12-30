const accountsService = require('../services/accounts.service');
var request = require('request');
var count = 221;

function facebookLikesCount() {
  pageId = '1197657160409500';
  access_token =
    'EAAIRixXmsaEBAHZAzNHUh2cGVBWImzzYPqMNJRSndLVJmM6ZBo8XQkTZBd8OovojxVpHjOS61N0P7AZA61i55z85hwFq6RelcdJ1IrWHJBiEjchDhplKjbHTsMaKZCi1k4LNPO3l4oZBTZA6mkrIfE43moZBVEMoc1U9uZCVZAwKQbHQZDZD';
  //Set Url of JSON data from the facebook graph api. make sure callback is set with a '?' to overcome the cross domain problems with JSON
  page_access_token_lifetime =
    'EAAIRixXmsaEBAIUFh1hOUscuNIYHlMp23SOZCgpTjVTbvDnRLiZCJZAcHcuaO8xN0HsP06yTR2mnhan2sYEHjBGuvGb06RnZCDrbMi4FJmXZCIOmrVBk4SjckBSMFMptSL1K8ZCD9vdX1O3Ppi4UcyXOIuDFAEQgl5NA3ZB22db5QZDZD';

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
    page_access_token_lifetime +
    '';

  //Use jQuery getJSON method to fetch the data from the url and then create our unordered list with the relevant data.
  request(
    {
      url: url_page_access,
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
