import React from 'react'

export default function Header({text}) {
  return (
    <div>
          <header className="sticky m-6 items-center rounded-lg top-0 shadow flex bg-white border-b border-slate-200 h-[52px]">
            <div>
              <p className="text-[20px] text-black font-freesans font-semibold ml-5 content-center">
                {text}
              </p>
            </div>
            <div className="absolute flex justify-center items-center right-0">
              <img
                className="w-[28px] h-[28px] mx-5"
                src="svgs/profile.svg"
              />
            </div>
          </header>
    </div>
  )
}
