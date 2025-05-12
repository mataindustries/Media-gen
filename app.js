
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY',
}));

app.post('/generate', async (req, res) => {
  const { name, industry, highlight } = req.body;

  try {
    const prompt = `Generate 3 creative social media posts for a ${industry} called ${name} highlighting ${highlight}.`;
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    });

    const posts = completion.data.choices[0].text.trim().split('\n').filter(p => p);
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ posts: ['Failed to generate posts.'] });
  }
});

app.listen(3000, () => console.log('Backend running on port 3000'));
