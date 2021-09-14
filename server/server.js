const path = require('path');
const express = require('express'); // npm installed
const api = require('./helpers/api.js');
const overview = require('./helpers/overview.js');
const qna = require('./helpers/qna.js');
const related = require('./helpers/related.js');
const reviews = require('./helpers/reviews.js');

const app = express();

app.use(express.static(path.join(__dirname, '..', '/client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// other configuration...

app.get('/', (req, res) => {
  res.send('Server says hello!');
});

//Daniel




//Alex





//Ya
app.get('/reviews', (req, res) => {
  reviews.getReviews(req.query)
    .then((APIRes) => {
      res.send(APIRes.data);
      res.status(200).end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.get('/reviews/meta', (req, res) => {
  reviews.getReviewMeta(req.query)
    .then((APIRes) => {
      res.send(APIRes.data);
      res.status(200).end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});



//Bishal





app.listen(9000, () => {
  console.log('connected to server at 9000');
});
