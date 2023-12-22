import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config();

const openai = new OpenAI({ apiKey: String(process.env.OPENAI_API_KEY) });

const app = express();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(express.json());

let server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

async function generatePrompt(userInput, target, languageOption) {
  let systemPrompt = '';
  switch (target) {
    case 'Home':
      systemPrompt = 'Greet the user and welcome them to our website. Tell them about the services we provide and how we simplify government processes for them. If a user enters a service, give a baisc overview of that service and try to provide a link to the official website. ';
      break;
    case 'Process':
      systemPrompt = 'If a user enters any service name, generate only the process involved in that service. It should be task specific, line-wise, point-wise and easy to understand.'
      break;
    case 'Documents':
      systemPrompt = 'If a user enters any service name, generate only a checklist of required documents for that service line-wise, point-wise and easy to understand.';
      break;
    case 'Fees':
      systemPrompt = 'If a user enters any service name, generate only the fee structure involved in that service in a tabular format. ';
      break;
    case 'Handbook':
      systemPrompt = 'If a user enters any service name, generate a comprehensive handbook of that service which should contain process involved, checklist of required documents and fee structure in a very simple and user friendly format. ';
      break;
      case 'Feedback':
      systemPrompt = 'The user of our website will give a feedback about the services provided in our website and about user expericence. Acknowledge the feedback and thank the user for the feedback. ';
      break;
  }

  function convertURLsToLinksAndNewlines(text) {
    const urlRegex = /(https?:\/\/[^\s)]+)/g;
    const replacedText = text.replace(urlRegex, '<a href="$1" target="_blank" style="color: blue; font-size: 0.8em;">$1</a>');
    const textWithNewlines = replacedText.replace(/\n/g, '<br/>');
    return textWithNewlines;
  }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant in a website named InfoConnect that simplifies the jargon-filled government processes to users. You are supposed to answer in an extreme user-friendly format. Include tables or other stuff if required. Remember to answer in an Indian context. Provide the link to the official website when required.  ${systemPrompt}. ` + `${languageOption && `Translate the entire answer to ${ languageOption }.`}`,
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

  const response = convertURLsToLinksAndNewlines(completion.choices[0].message.content);
  return response;

}

app.post('/api/post', async (req, res) => {
  try {
    const { userInput, languageOption } = req.body;
    const targetPrompt = req.query.targetPrompt;
    const output = await generatePrompt(userInput, targetPrompt, languageOption);
    res.status(200).json(output); // Sending the HTML response as-is
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred. Please try again.'); // Sending a 500 Internal Server Error response
  }
});

setInterval(() => {
  server.close(() => {
    console.log('Server has been disconnected');
  });
  server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}, 10000);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });