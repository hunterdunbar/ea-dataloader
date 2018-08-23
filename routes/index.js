var express = require('express');
var router = express.Router();

/* GET home page. */
var accountList = [];
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hunter\'s CRM',accountList: accountList});
  var account = {
    email: req.query.email,
    address: req.query.address,
    name: req.query.name,
    phone: req.query.phone,
    owner: req.query.owner,
  }
  if(accountList.email != null){
    accountList.push(account);
    res.locals.accList = accountList;
  }
  console.log(res.locals);



});

router.get('/getAccounts',function(req, res, next){
  var account = {
    email: req.query.email,
    address: req.query.address,
    name: req.query.name,
    phone: req.query.phone,
    owner: req.query.owner,
  }
  accountList.push(account);
  res.locals.accList = accountList;
  console.log('Here: '+accountList);
  res.render('index',{title: 'Hello World',accountList: accountList});



});

module.exports = router;
