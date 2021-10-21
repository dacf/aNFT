import { React, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import './tailwind.css' 

export default function Interact() {
    const [answer, setanswer] = useState('')
    const [bgSpeakBtn, setbgSpeakBtn] = useState('#60A5FA')
    const [inputType, setinputType] = useState('speak')
    const [bgTypeBtn, setbgTypeBtn] = useState('')
    const [question, setquestion] = useState('')
    const [action, setaction] = useState('')
    const [BgTalktoMeBtn, setBgTalktoMeBtn] = useState('')
    // commands for speech to text 
    const commands = [
        {
            command: '*',
            callback: (words) => {
                setTimeout(() => {
                    runAISpeech()
                }, 4000);
            }
        },
        {
            command: 'clear',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ]

    const { transcript, browserSupportsSpeechRecognition} = useSpeechRecognition({ commands })  //define transcript used in specch to text 
    if (!browserSupportsSpeechRecognition) {
        return null
    }

    async function runAISpeech() {
        try {
            const response = await fetch("https://api.openai.com/v1/answers", {
                body: `{"documents": ["My name is Freya.", "I bought 1.005 USDC on october 21", "I bought USDC" ,"I aped into USDC", "traded 1 WBUSD for 1.005 USDC", "1 wrapped BUSD for 1.005 USDC", "wrapped BUSD for USDC", "I will buy wrapped BUSD next", "My creator is Autonomy Network", "Next I will buy wrapped BUSD"],"question": "${transcript}","search_model": "ada","model": "curie","examples_context": "Adeolu is a developer.","examples": [["What is your name?","Freya."], ["What did you buy?", "1.005"], ["When did you buy?","today."], ["What did you ape into?", "USDC."], ["What was your last trade?", "I traded 1 wrapped BUSD for 1.005 USDC"], ["What did you trade?", "wrapped BUSD for USDC"], ["What was traded", "1 wrapped BUSD for 1.005 USDC"], ["What did you last buy?", "USDC"], ["What will you buy next?", "Wrapped BUSD"], ["What is next?", "Buying Wrapped BUSD"]],"max_tokens":15,"stop": ["n", "<|endoftext|>"]}`,
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json"
                },
                method: "POST"
            })
            const data = await response.json();
            console.log("hereee", data)
            console.log(data.answers[0]);
            if (data.answers[0].includes("-")) {
                setanswer(data.answers[0].substring(0, data.answers[0].indexOf("-")))

            } else if (data.answers[0].includes("=")){
                setanswer(data.answers[0].substring(0, data.answers[0].indexOf("=")))
            } else {
                setanswer(data.answers[0])
            }
        } catch (e) {
            console.log(e)
        }
    }
    let speech
    let input
    if (inputType === 'speak') {
        speech = <div>
            {transcript}
        </div>
        input = <div>
            <div className='flex justify-center'>
                <button className='font-semibold border border-black hover:bg-red-300 bg-blue-500 h-10 mt-5 px-2 rounded-lg' style ={{backgroundColor: BgTalktoMeBtn}} onClick={(event) => {
                    event.preventDefault()
                    SpeechRecognition.startListening({ continuous: true })
                    setaction('You can speak now...')
                    setBgTalktoMeBtn('#FCA5A5')
                }}
                > Press and Talk </button>
            </div>
            <div>
                {action}
            </div>
        </div>
    } else if (inputType === 'type') {
        speech = <div></div>
        input = <div className='flex justify-center'>
            <input className='w-full h-12 ring ring-black mt-5 rounded-lg px-2 ' value={question} onChange={(event) => {
                setquestion(event.target.value)
            }} />
            <button className='border border-black hover:bg-red-300 bg-blue-500 h-12 w-2/6 mt-5 ml-1 px-2 rounded-lg' onClick={(event) => {
                event.preventDefault()
                async function runAItext() {
                    console.log(question)
                    try {
                        const response = await fetch("https://api.openai.com/v1/answers", {
                            body: `{"documents": ["My name is Freya.", "I bought 1.005 USDC on october 21", "I bought USDC" ,"I aped into USDC", "traded 1 WBUSD for 1.005 USDC", "1 wrapped BUSD for 1.005 USDC", "wrapped BUSD for USDC", "I will buy wrapped BUSD next", "My creator is Autonomy Network", "Next I will buy wrapped BUSD", "Name is Freya", "Freya is my name"],"question": "${question}","search_model": "ada","model": "curie","examples_context": "Adeolu is a developer.","examples": [["What is your name?","Freya."], ["What did you buy?", "1.005"], ["When did you buy?","today."], ["What did you ape into?", "USDC."], ["What was your last trade?", "I traded 1 wrapped BUSD for 1.005 USDC"], ["What did you trade?", "wrapped BUSD for USDC"], ["What was traded", "1 wrapped BUSD for 1.005 USDC"], ["What did you last buy?", "USDC"], ["What will you buy next?", "Wrapped BUSD"], ["What is next?", "Buying Wrapped BUSD"]],"max_tokens":15,"stop": ["n", "<|endoftext|>"]}`,
                            headers: {
                                Authorization: "Bearer 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",
                                "Content-Type": "application/json"
                            },
                            method: "POST"
                        })
                        const data = await response.json();
                        console.log(data.answers[0]);
                        if (data.answers[0].includes("-")) {
                            setanswer(data.answers[0].substring(0, data.answers[0].indexOf("-")))
            
                        } else if (data.answers[0].includes("=")){
                            setanswer(data.answers[0].substring(0, data.answers[0].indexOf("=")))
                        } else {
                            setanswer(data.answers[0])
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
                runAItext()
            }
            }

            > Ask </button>
        </div>
    }
    return (
        <div className='text-black text-center'>
            <form className='mt-10'>
                <label className='font-black'>Hi, What do you want to know?</label>
                <div className='flex justify-center'>
                    <div className='border border-black mt-4 rounded-lg'>
                        <div className='flex flex-row justify-center'>
                            <button className='px-4 rounded-lg  w-24 text-lg font-semibold' style={{ backgroundColor: bgSpeakBtn }} onClick={(event) => {
                                event.preventDefault()
                                setbgSpeakBtn('#60A5FA')
                                setbgTypeBtn('')
                                setinputType('speak')
                            }} >Speak</button>
                            <button className='px-2 rounded-lg text-lg w-24 font-semibold' style={{ backgroundColor: bgTypeBtn }} onClick={(event) => {
                                event.preventDefault()
                                setbgSpeakBtn('')
                                setbgTypeBtn('#60A5FA')
                                setinputType('type')
                                SpeechRecognition.abortListening()
                            }}>Type</button>
                        </div>
                    </div>
                </div>
                {input}
            </form>
            <div className='text-center text-xl mt-4 w-auto'>
                <div className='mt-4 font-black'>
                    Your Question: {speech} ?
                </div>
                <button id="say" className='px-4 rounded-lg w-auto text-lg mt-4 font-semibold border-black' style={{ backgroundColor: '#60A5FA' }} onClick={(event) => {
                                event.preventDefault()
                                //var msg = new SpeechSynthesisUtterance();
                                // const voice = window.speechSynthesis.getVoices()[17];
                                window.speechSynthesis.onvoiceschanged = function() {
                                    const utterance = new SpeechSynthesisUtterance();
                                    const voice = window.speechSynthesis.getVoices()[17];
                                    utterance.text = answer;
                                    utterance.voice = voice;
                                    utterance.pitch = 1;
                                    utterance.rate = 0.9;
                                    utterance.volume = 1;
                                    window.speechSynthesis.speak(utterance);    
                                };
                                document.getElementById("say").style.display = "none";
                                document.getElementById("say2").style.display = "";
                                // utterance.default = true;
                            }} >Say it out loud</button>
                <button id="say2" className='px-4 rounded-lg w-auto text-lg mt-4 font-semibold border-black' style={{ backgroundColor: '#60A5FA', display: "none" }} onClick={(event) => {
                                event.preventDefault()
                                // const voice = window.speechSynthesis.getVoices()[17];
                                    const utterance = new SpeechSynthesisUtterance();
                                    const voice = window.speechSynthesis.getVoices()[17];
                                    utterance.text = answer;
                                    utterance.voice = voice;
                                    utterance.pitch = 1;
                                    utterance.rate = 0.9;
                                    utterance.volume = 1;
                                    window.speechSynthesis.speak(utterance);    
                                // utterance.default = true;
                            }} >Say it out loud</button>
                <div className='mt-4 font-black'>
                    Text response: {answer.toString()}
                </div>
            </div>
        </div>
    )
}
