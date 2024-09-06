// customer-survey-backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let surveyData = [
  { id: 'q1', text: 'How satisfied are you with our products?', type: 'rating', max: 5 },
  { id: 'q2', text: 'How fair are the prices compared to similar retailers?', type: 'rating', max: 5 },
  { id: 'q3', text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', max: 5 },
  { id: 'q4', text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating', max: 10 },
  { id: 'q5', text: 'What could we do to improve our service?', type: 'text' },
];

let answers = []; // In-memory storage for answers

app.get('/api/questions', (req, res) => {
  res.json(surveyData);
});

app.post('/api/answers', (req, res) => {
  const { customerId, answers: customerAnswers } = req.body;
  answers.push({ customerId, customerAnswers, status: 'COMPLETED' });
  res.status(200).json({ message: 'Survey answers submitted successfully' });
});

app.listen(5000, () => {
  console.log('Backend server is running on http://localhost:5000');
});
