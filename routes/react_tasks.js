var express = require('express');
var router = express.Router();

/* GET users listing. */
/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    var query = req.query;
    var page = 1;
    if(query.page != null){
        page = query.page
        console.log( "page=", page )
    }  
    res.render('react_tasks/index', {"page": page } );
});

/******************************** 
* 
*********************************/
router.get('/new', function(req, res, next) {
    res.render('react_tasks/new', {});
  });

router.get('/show/:id', function(req, res) {
console.log(req.params.id  );
    res.render('react_tasks/show', {"params_id": req.params.id });
});

router.get('/edit/:id', function(req, res) {
console.log(req.params.id  );
      res.render('react_tasks/edit', {"params_id": req.params.id });
});

module.exports = router;
