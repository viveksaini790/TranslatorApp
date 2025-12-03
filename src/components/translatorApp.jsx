
import { ImCross } from "react-icons/im";
import { TbTransfer } from "react-icons/tb";
// import './components/translatorApp.css'
import { useRef, useEffect, useState, use } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { languages } from "../languageData";

const maxChars = 200;

function translatorApp({ onClose }) {

    const [translatedText, settranslatedText] = useState("");
    const [selectLangaugeFrom, setselectLanguageFrom] = useState('en');
    const [selectLangaugeTo, setselectLanguageTo] = useState("hi");
    const [showLanguages, setshowLanguages] = useState(false);
    const [currentLanguageSelection, setcurrentLanguageSelection] = useState(null)
    const [inputText, setinputText] = useState("");
    const [charCount, setcharCount] = useState(0);

    const handleLanguageSelect = (languageCode) => {
        if (currentLanguageSelection === "from") {
            setselectLanguageFrom(languageCode)
        }
        else {
            setselectLanguageTo(languageCode)
        }
        setshowLanguages(false);
    }

    const handleLanguageClick = (type) => {
        setcurrentLanguageSelection(type);
        setshowLanguages(true)
    }

    const handleSwapClick = () => {
        setselectLanguageFrom(selectLangaugeTo)
        setselectLanguageTo(selectLangaugeFrom)
    }

    const dropDownRef = useRef("null")

    const handleClickOutSide = (e) => {
        if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
            setshowLanguages(false);
        }
    }
    useEffect(() => {
        if (showLanguages) {
            document.addEventListener("mousedown", handleClickOutSide);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutSide);
        }
        return () => document.removeEventListener("mousedown", handleClickOutSide);
    }, [showLanguages])


const handleTranslate = async () => {
    if (!inputText.trim().length) return;

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                inputText
             )}&langpair=${selectLangaugeFrom}|${selectLangaugeTo}`
            // )}&langpair=en|hi-IN}`
        );

        const data = await response.json();
        settranslatedText(data.responseData.translatedText);

    } catch (err) {
        console.log(err);
    }
};



    // const handleTranslate = async () => {
    //     console.log("---0",translatedText)
    //     if (!translatedText.trim().length) {
    //         return;
    //     }

    //    try {
    //     const response = await fetch(
    //         `https://api.mymemory.translated.net/get?q= ${ encodeURIComponent(
    // inputText)}&langpair=${selectLangaugeFrom}|${selectLanguageTo}`);
    //     const data = await response.json();
    //     settranslatedText(data.responseData.translatedText);
    //    } catch(err){
    //     console.log(err);
    //    }
        
    // };
    const handleInputTextChange = (e) => {
        const value = e.target.value;
        if (value.length <= maxChars) {
            setinputText(value)
            setcharCount(value.length);
        }

    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleTranslate();
        }
    }


    return (
        <>
            <div className="app">I am translatorApp
                <button onClick={onClose}><ImCross /> </button>
                <div className="space ">
                    
                    <div className="language " onClick={() => handleLanguageClick("from")}>
                        {languages [selectLangaugeFrom] || "English"}
                         </div>
                    <TbTransfer onClick={handleSwapClick} />
                    <div className="language " onClick={() => handleLanguageClick("to")}>
                        { languages[selectLangaugeTo] || "English"}
                         </div>
                </div>
                {showLanguages && (<div ref={dropDownRef}
                    className="w-[calc(100%-4rem)] h-[calc(100%-9rem)] absolute top-32 left-8 z-10 rounded shadow-lg p-4 overflow-y-scroll scrollbar-hide">

                    <ul>
                        {Object.entries(languages).map(([code, name]) => (
                            <li className="i1" onClick={() => handleLanguageSelect(code)} key={code}>
                                {name}
                            </li>
                        ))}

                        <li />
                    </ul>
                </div>)}
                <div className="text">
                    <textarea value={inputText || ""} onChange={handleInputTextChange} name="text1" id="t"
                                      type='textarea' onKeyDown={handleKeyDown}></textarea>
                    <div className="text2 "> {charCount}/{maxChars}</div>
                </div>
                <button onClick={handleTranslate}
                    className=" abcd"><MdKeyboardDoubleArrowDown   onClick={handleTranslate}  /> </button>
                <div className=" only">
                    <textarea value={translatedText} readOnly></textarea>
                </div>
            </div>
        </>
    )
}
export default translatorApp ;