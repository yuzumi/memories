const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('This works!');
});

const PORT = process.env.PORT || 5000;

(() => {
  mongoose.connect('mongodb://localhost:27017/memories', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      })
    })
    .catch(error => {
      console.error(error.message);
    });

  mongoose.set('useFindAndModify', false);
})();