const express = require('express');
const router = express.Router();
var fs=require('fs');
var file="src/app/menu/menu.json";
var result=JSON.parse(fs.readFileSync( file));
/* GET api listing. */
router.get('/menu', (req, res) => {
  res.send(result);
});


module.exports = router;