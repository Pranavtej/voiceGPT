
import express, { json } from "express";
import {db, connectToDB } from './db.js';


const app = express();
app.use(json());


app.post("/auth/signup", async (req, res) => {
	  const { username, email, password } = req.body; 
	  const details = await db.collection('users').insertOne({
        name: username,
        email:email,
        password: password,
    });
    if (!details) {
        res.status(404).json({ error: 'failled' });
        return;
    }
    res.json(details);


});
app.post("/auth/login", async (req, res) => {
	const { username, password } = req.body; 
	const details = await db.collection('users').findOne({
	  name: username,
	  password: password,
  });
  if (!details) {
	  res.status(404).json({ error: 'failled' });
	  return;
  }
  res.json(details);
});

app.post("/ask/:prompt", async (req, res) => {
const openai = new OpenAIApi(config);

	const prompt = req.params.prompt;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 20,
		temperature: 0.7,
	});
	const parsableJSONresponse = response.data.choices[0].text;
	console.log(parsableJSONresponse);
	// const parsedResponse = JSON.parse(parsableJSONresponse);
	//  console.log("Question: ", parsedResponse.Q);
	// console.log("Answer: ", parsedResponse.A);
  res.send(parsableJSONresponse);

});

connectToDB ( () => {
    app.listen(5000, () => {
      console.log('Example app listening on port 8000!');
    });
  });