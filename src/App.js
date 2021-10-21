import { useState } from 'react';
import './tailwind.css'
import logo from './Black-png.png'
import cryptoPunk from './cryptoPunk.png'
import freya from './freya.png'
import Interact from './interact';
function App() {
  const [mode, setmode] = useState('home')
  let content

  if (mode === 'home') {
    content = <button className='border-2 border-black text-lg hover:bg-blue-200 bg-blue-500 text-black mt-10 p-2 rounded-2xl' onClick = {(event) => {
      event.preventDefault()
      setmode('interact')
    }}>
      Interact with me!
    </button>
  } else if (mode === 'interact') {
    content = <Interact
    />
  }

  return (
    <div className="App bg-gradient-to-b from-blue-500 via-blue-200 to-blue-50 h-full">
      <div className = 'w-full h-12'>
        <div className ='flex flex-row justify-start p-4'>
          <img src = {logo} className = 'h-14 w-14'/>
          <p className = 'mt-4 font-bold text-2xl'>Autonomy Network</p>
        </div>
      </div>
      <div className='text-center font-bold text-4xl text-black mt-10'>
        FREYA
      </div>
      <div className='text-center font-bold text-2xl text-black mt-2'>
        The first aNFT
      </div>
      <div className='flex justify-center w-auto h-72'>
        <img src={freya} alt='freya' className='mt-10' />
      </div>
      <div className='flex justify-center'>
        {content}
      </div>
      <div className = 'h-36'>

</div>
    </div>

  );
}

export default App;
