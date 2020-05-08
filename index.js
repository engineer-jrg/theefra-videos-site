const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('tiny'));
app.use(cors());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendfile(Path.join(projectPath, 'public/index.html'));
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found!');
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  })
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
})