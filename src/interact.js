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

    const { transcript, resetTranscript} = useSpeechRecognition({ commands })  //define transcript used in specch to text 
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    async function runAISpeech() {
        try {
            const response = await fetch("https://api.openai.com/v1/answers", {
                body: `{"documents": ["My name is Odin.", 
                "I am Odin", 
                "I ate 1 sheep on october 24", 
                "I have 1 child", 
                "I ate 1 sheep", 
                "My kid is 0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151", 
                "I am the genesis wolf", 
                "I want to eat sheep", 
                "I am hungry", 
                "I eat sheep",
                "Yes I am hungry",
                "I have one child",
                "My child is 0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151",
                "I am worth 3 ETH",
                "I cost 3 ETH",
                "3 ETH is my value",
                "I am valued at 3 ETH"],
                "question": "${transcript}","search_model": "ada","model": "curie","examples_context": "Odin is a wolf.",
                "examples": [["What is your name?","Odin."], 
                ["What did you eat?", "1 sheep"], 
                ["Are you hungry?","Yes I am hungry."], 
                ["Who is your kid?", "My kid is 0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151"], 
                ["How many kids?", "1 kid"], 
                ["Who is your child?", "0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151"], 
                ["What do you eat?", "I eat sheep"], 
                ["How many children do you have?", "I have one child"], 
                ["What will you do next?", "Eat more sheep"], 
                ["What is next?", "Eat sheep"],
                ["How much are your worth?", "3 Eth"],
                ["How much do you cost?", "My value is 3 ETH"],
                ["Who are you?", "I am Odin"]],
                "max_tokens":15,"stop": ["n", "<|endoftext|>"]}`,
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
                            body: `{"documents": ["My name is Leto",
                            "I am Leto", 
                            "I ate 1 sheep on october 24", 
                            "I have 1 child", 
                            "I ate 1 sheep", 
                            "My kid is 0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151", 
                            "I am the genesis wolf", 
                            "I want to eat sheep", 
                            "I am hungry", 
                            "I eat sheep",
                            "Yes I am hungry",
                            "I have one child",
                            "My child is 0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151",
                            "I am worth 3 ETH",
                            "I cost 3 ETH",
                            "3 ETH is my value",
                            "I am valued at 3 ETH"],
                            "question": "${question}","search_model": "ada","model": "curie","examples_context": "Leto is a wolf.",
                            "examples": [["What is your name?","Leto."], 
                            ["What did you eat?", "1 sheep"], 
                            ["Are you hungry?","Yes I am hungry."], 
                            ["Who is your kid?", "My kid is 0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151"], 
                            ["How many kids?", "1 kid"], 
                            ["Who is your child?", "0x4B6EC90E7cb95AaE16B6487Ea339a397897fd151"], 
                            ["What do you eat?", "I eat sheep"], 
                            ["How many children do you have?", "I have one child"], 
                            ["What will you do next?", "Eat more sheep"], 
                            ["What is next?", "Eat sheep"],
                            ["How much are your worth?", "3 Eth"],
                            ["How much do you cost?", "My value is 3 ETH"],
                            ["Who are you?","I am Leto"]],
                            "max_tokens":15,
                            "stop": ["n", "<|endoftext|>"]}`,
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
                                // window.speechSynthesis.onvoiceschanged = function() {
                                    const utterance = new SpeechSynthesisUtterance();
                                    // const voice = window.speechSynthesis.getVoices()[0];
                                    utterance.text = answer;
                                    // utterance.voice = voice;
                                    utterance.pitch = 1;
                                    utterance.rate = 0.9;
                                    utterance.volume = 1;
                                    window.speechSynthesis.speak(utterance);    
                               //  };
                                //document.getElementById("say").style.display = "none";
                                // document.getElementById("say2").style.display = "";
                                // utterance.default = true;
                            }} >Say it out loud</button>
{/*                 <button id="say2" className='px-4 rounded-lg w-auto text-lg mt-4 font-semibold border-black' style={{ backgroundColor: '#60A5FA', display: "none" }} onClick={(event) => {
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
                            }} >Say it out loud</button> */}
                <div className='mt-4 font-black'>
                    Text response: {answer.toString()}
                </div>
                <button className='px-4 rounded-lg w-auto text-lg mt-4 font-semibold border-black' style={{ backgroundColor: '#60A5FA'}}  onClick={resetTranscript}>Reset</button>
            </div>
        </div>
    )
}
