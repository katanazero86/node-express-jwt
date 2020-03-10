import express from 'express';
import asyncify from 'express-asyncify';

const router = asyncify(express.Router());

/* GET home page. */
// router.get('/', function(req, res, next) {
//   // res.render('index', { title: 'Express' });
// });

router.get('/', (req, res) => {
  console.log('jwt test..');
  res.send('Hello JWT');
});

export default router;
