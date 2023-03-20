import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
	// apiKey: "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",
	apiKey: "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",

});

const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
       who is the president of the united states?

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 10,
		temperature: 0.7,
	});
	const parsableJSONresponse = response.data.choices[0].text;
	console.log("Response: ", parsableJSONresponse);
	// const parsedResponse = JSON.parse(parsableJSONresponse);
	//  console.log("Question: ", parsedResponse.Q);
	// console.log("Answer: ", parsedResponse.A);
};

runPrompt();