// import logo from './logo.svg';

import React, { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()


mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function Main() {

  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  // const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        document.getElementById('infomation').innerHTML = 'Mic is off, click on the mic to start again.'
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {

      document.getElementById('infomation').innerHTML = 'Mic is on, please speak now.'
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }


const decode = (e) => {
  console.log(e)
  e.note= e.note.toLowerCase()
  setNote(e.note)
  runPrompt(note)

}

console.log(process.env.OPENAI_API_KEY)
const config = new Configuration({
	 apiKey: process.env.OPENAI_API_KEY,


});
const openai = new OpenAIApi(config);
const msg = new SpeechSynthesisUtterance();

const runPrompt = async (querry) => {
  
  mic.stop()
	const prompt = querry;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 100,
		temperature: 0.7,
	});
	const parsableJSONresponse = response.data.choices[0].text;
	console.log("Response: ", parsableJSONresponse);
  document.getElementById('response').innerHTML = parsableJSONresponse;
  msg.text = parsableJSONresponse;
  window.speechSynthesis.speak(msg);

};


  return (
    <>
    <div className='text-center space' >
      <header className="text-center space">
        <h1 className='text-center text-white header '>VoiceGPT</h1>
        {/* <p className='text-centr text-white tag'>aa</p> */} 
        </header>

      <div className='image decode center space'>
      {/* <img src='/assets/geastures/A.jpg' alt='defeat' width="250" height="250" className='img-fluid' /> */}
      </div>
      <div className='text-center space info '>
      <p className='text-light'>{note}</p>

      </div>

      <div>
        <p className="text-light text-center" id='response'></p>
      </div>
<div className='text-center query nav'>
          
{/* <p htmlFor="querry">👻</p> */}
    <input 
          type="text"
          name="querry"
          placeholder='Ask Something'

          className='form-control col-md- mt- mx-auto'
          ></input>
          <button className='btn btn-light ' onClick={() => setIsListening(prevState => !prevState)}>
          <img src="https://img.icons8.com/small/16/null/microphone.png" alt='mic'/> 
          </button>

          <button className='btn btn-light right' onClick={()=> decode({note})}><img src="https://img.icons8.com/small/16/null/sent.png" alt='send'/></button>
</div>
        <div className='text-center navbar'>
        <div className=" text-center box">
         <p className='text-center text-white micoff'  id='infomation'></p>
        </div>
          {/* <input type='text' name='input' onChange={(e)=>handlechange(e.target.value)} className='col-md- mt-4 mx-auto' />
          <button className='btn btn-light' onClick={() => setIsListening(prevState => !prevState)}>
            🎙️
          </button>
          <button className='btn btn-light right' onClick={()=> decode({note})}>➡️</button> */}
        </div>
                   {/* <p className='text-light'>{note}</p> */}
        <div className="box text-center">
         <p className='text-center text-white information'></p>
        </div>
    </div>
       <footer className='nav-footer'>
       <p className='text-center  footer'><a className='text-center  footer' href='https://github.com/Pranavtej'>@Pranavtej</a></p>
   </footer>
   </>
  );
}

export default Main;
