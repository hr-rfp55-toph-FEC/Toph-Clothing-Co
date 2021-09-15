const path = require('path');
const express = require('express'); // npm installed
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
  const { product_id, count, sort } = req.query;
  reviews.getReviews({ product_id, count, sort })
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
  const { product_id } = req.query;
  reviews.getReviewMeta({ product_id })
    .then((APIRes) => {
      res.send(APIRes.data);
      res.status(200).end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});

app.post('/reviews', (req, res) => {
  const {
    product_id, rating, summary, body, recommend, name, email, photos, characteristics,
  } = req.body;
  reviews.postReview({
    product_id, rating, summary, body, recommend, name, email, photos, characteristics,
  })
    .then(() => {
      res.status(201).end();
    })
    .catch((err) => {
      console.error(err);
      res.end();
    });
});



//Bishal - Related Products
app.get('/related/:id', (req, res) => {
  const currId = req.params.id;
  related.genRelProdResObj(currId)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});



app.listen(9000, () => {
  console.log('connected to server at 9000');
});
