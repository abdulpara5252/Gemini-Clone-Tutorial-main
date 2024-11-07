import React, { useContext, useState } from "react"
import { IoMenu } from "react-icons/io5"
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6"
import { MdHistory } from "react-icons/md"
import { IoSettings } from "react-icons/io5"
import { Context } from "../context/Context"

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const [extended, setExtended] = useState(false)
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context)

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt)

    await onSent(prompt)
  }

  console.log(prevPrompt)
  return (
    <div
      className={`min-h-screen inline-flex flex-col justify-between bg-[#e4e7eb] py-[25px] px-[15px] ${darkMode ? "bg-[#474D56] text-white" : "bg-[#e4e7eb] text-gray-900"
        }`}
    >
      <div>
        {/* Centering the IoMenu icon */}
        <div>
          <IoMenu
            onClick={() => setExtended(!extended)}
            className="text-2xl block cursor-pointer"
          />
        </div>

        <div
          onClick={() => newChat()}
          className={`mt-[20px] inline-flex items-center gap-[10px] py-[15px] px-[15px] text-[14px] ${darkMode ? "text-gray-500 bg-gray-700" : "text-gray-500 bg-gray-300"
            } cursor-pointer rounded-full`}
        >
          <FaPlus className={`${darkMode ? "text-white" : "text-gray-700"} text-2xl`} />
          {extended && <p className={` ${darkMode ? "text-white" : "text-gray-900"
          }`}>New Chat</p>}
        </div>

        {extended && (
          <div className="flex flex-col animate-fadeIn duration-1000">
            <p className="mt-7 mb-5 ml-10">Recent</p>
            {prevPrompt?.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className={`flex items-center gap-2 p-2 pr-10 rounded-[50px] ${darkMode
                    ? "text-slate-200 cursor-pointer hover:bg-gray-600"
                    : "text-slate-700 cursor-pointer hover:bg-gray-300"
                    }`}
                >
                  <FaMessage className="text-2xl" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <div
          className={`flex items-center gap-2 p-2 pr-10 rounded-[20px] ${darkMode
            ? "text-slate-200 cursor-pointer hover:bg-gray-600"
            : "text-slate-700 cursor-pointer hover:bg-gray-300"
            }`}
        >
          <FaQuestion className="text-2xl" />
          {extended && <p>Help</p>}
        </div>

        <div
          className={`flex items-center gap-2 p-2 pr-10 rounded-[50px] ${darkMode
            ? "text-slate-200 cursor-pointer hover:bg-gray-600"
            : "text-slate-700 cursor-pointer hover:bg-gray-300"
            }`}
        >
          <MdHistory className="text-2xl" />
          {extended && <p>Activity</p>}
        </div>

        <div
          className={`flex items-center gap-2 p-2 pr-10 rounded-[50px] ${darkMode
              ? "text-slate-200 cursor-pointer hover:bg-gray-600"
              : "text-slate-700 cursor-pointer hover:bg-gray-300"
            }`}
        >
          <IoSettings className="text-2xl" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
