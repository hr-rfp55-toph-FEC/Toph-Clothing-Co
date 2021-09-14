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

//Daniel




//Alex





//Ya





//Bishal - Related Products
app.get('/related/:id', (req, res) => {
  const currId = req.params.id;
  const promises = [related.getRelatedProductsInfo(currId),
    related.getRelatedProductStyles(currId)];
  return Promise.all(promises)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});




app.listen(9000, () => {
  console.log('connected to server at 9000');
});
