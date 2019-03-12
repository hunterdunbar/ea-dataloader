var express = require('express');
var router = express.Router();

var records = [];
router.get('/', function(req, res, next) {
var sf = require('node-salesforce');
var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://login.salesforce.com'
});
var username = process.env.SFDC_USER;
var password = process.env.SFDC_PASSWORD;
console.log("username: " + username);
console.log("password: " + password);
conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...

  conn.query("SELECT Id, Name FROM Opportunity", function(err, result) {
    if (err) { return console.error(err); }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
    console.log("done ? : " + result.done);
    res.send(result.records);
    res.end();
    if (!result.done) {
      // you can use the locator to fetch next records set.
      // Connection#queryMore()
      console.log("next records URL : " + result.nextRecordsUrl);
    }
  });
});

});

module.exports = router;
