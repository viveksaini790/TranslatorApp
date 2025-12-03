import { useState } from 'react'

import './App.css'
import Translatorapp from './components/translatorApp';
import Translatorstart from './components/translatorStart';
import './components/translatorApp.css';
import './components/translatorStart.css';
// import { languages } from './languageData';


function App() {

  const [showTranslatorApp, setshowTranslatorApp] =useState(false);

const handleToggle=()=>{
     setshowTranslatorApp(!showTranslatorApp);
}

  return (
    <>
    <div className='h'>Hello Vivek
     {showTranslatorApp?( <Translatorapp onClose={handleToggle} /> ):
       (<Translatorstart onStart={handleToggle}  />)} 
      
      </div>
   
    </>
  )
}

export default App
