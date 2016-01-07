// custom library

var notFound404 = function(req, res, next)
{
   res.status(404);
   res.render('404', 
      {title: '404 Not Found'});
};

var home = function (req, res, next) {
    res.render('home',
        {title: 'Home Page'});
};

// export functions
/**************************************/

// 404 not found
module.exports.notFound404 = notFound404;

module.exports.home = home;