import React, { useContext } from "react"
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,

} from "react-icons/fa"
import DarkModeToggle from "react-dark-mode-toggle";
import { FaMessage } from "react-icons/fa6"
import { MdAddPhotoAlternate } from "react-icons/md"
import { IoMdSend } from "react-icons/io"
import { Context } from "../context/Context"
import geminiLogo from "../assets/geminiLogo.png"
import run from "../config/gemini";

const MainContent = ({ darkMode, toggleDarkMode }) => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
    setResultData,
    setLoading,
    setShowResult,
    delayPara
  } = useContext(Context)

  const onSend = async (prompt) => {
    debugger;
    setResultData("")
    setLoading(true)
    setShowResult(true)


    const response = await run(prompt)
    setRecentPrompt(prompt)
    setPrevPrompt((prev) => [...prev, prompt])
    let responseArray = response.split("**")
    let newResponse = ""

    for (let i = 0; i < responseArray.length; i++) {
      if (i == 0 || i % 2 !== 1) {
        newResponse += responseArray[i]
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"
      }
    }

    let newResponse2 = newResponse.split("*").join("</br>")

    let newResponseArray = newResponse2.split(" ")

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]

      delayPara(i, nextWord + " ")
    }

    setLoading(false)
    setInput("")
  }
  return (
    <div
      className={`flex-1 min-h-screen pb-[15vh] relative ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
    >
      <div className="flex items-center justify-between text-xl p-5 text-slate-700">
        <p className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}>Gemini</p>
        <div className="flex items-center gap-2">
          <DarkModeToggle
            onChange={toggleDarkMode}
            checked={darkMode}
            size={80}
          />
          <FaUserCircle className={`text-5xl p-1 ${darkMode ? "text-white" : "text-gray"
            }`} />
        </div>

      </div>

      <div className="max-w-[900px] mx-auto">
        {!showResult ? (
          <>
            <div className="my-12 text-[56px] text-slate-500 font-semibold p-5">
              <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Abdul.
                </span>
              </p>

              <p className="text-slate-400">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => onSend("Suggeset top 10 webseries.")}>
                <p className="text-slate-700 text-lg">
                  Suggeset top 10 webseries.
                </p>

                <FaCompass className={`text-4xl p-1 absolute bottom-2 right-2 ${darkMode ? "text-black" : "text-gray"
                  }`} />
              </div>

              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => onSend("What is loop in Javascript?")}
              >
                <p className="text-slate-700 text-lg">
                  What is loop in Javascript?
                </p>

                <FaLightbulb className={`text-4xl p-1 absolute bottom-2 right-2 ${darkMode ? "text-black" : "text-gray"
                  }`} />
              </div>

              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => onSend("Who is known as the Mother of Dragons?")}
              >
                <p className="text-slate-700 text-lg">
                  Who is known as the "Mother of Dragons"?
                </p>

                <FaMessage className={`text-4xl p-1 absolute bottom-2 right-2 ${darkMode ? "text-black" : "text-gray"
                  }`} />
              </div>

              <div className="h-[200px] p-4 bg-gray-200 rounded-lg relative cursor-pointer hover:bg-gray-300"
                onClick={() => onSend("Who sits on the Iron Throne at the end of the series?")}
              >
                <p className="text-slate-700 text-lg">
                  Who sits on the Iron Throne at the end of the series?
                </p>

                <FaCode className={`text-4xl p-1 absolute bottom-2 right-2 ${darkMode ? "text-black" : "text-gray"
                  }`} />
              </div>
            </div>
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            <div className="my-10 mx-0 flex items-center gap-5">
              <FaUserCircle className="text-3xl" />

              <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-5">
              <img src={geminiLogo} alt="" className="w-8 rounded-[50%]" />

              {loading ? (
                <div className="w-full flex flex-col gap-2">
                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />

                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />

                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="text-lg font-[400] leading-[1.8]"
                ></p>
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
          <div className="flex items-center justify-between gap-20 bg-gray-200 py-2 px-5 rounded-full">
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className={`flex-1 bg-transparent border-none outline-none p-2 text-lg ${darkMode ? "text-black" : "text-slate-700"}`}
              value={input} // Ensure the input's value is controlled by state
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission or other default behavior
                  onSent();
                }
              }}
            />

            <div className="flex gap-4 items-center">
              <MdAddPhotoAlternate className={`text-2xl cursor-pointer ${darkMode ? "text-black" : "text-gray"
                }`} />
              <FaMicrophone className={`text-2xl cursor-pointer ${darkMode ? "text-black" : "text-gray"
                }`} />
              {input && (
                <IoMdSend
                  onClick={() => onSent()}
                  className={`text-2xl cursor-pointer ${darkMode ? "text-black" : "text-gray"
                    }`}
                />
              )}
            </div>
          </div>

          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-500">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainContent
