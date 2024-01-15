import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [isClickButton, setIsClickButton] = useState(false);
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#$%&";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsClickButton(false);
    }, 1000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword, passwordGenerator]);

  return (
    <>
      <div className="w-screen h-screen bg-black pt-10">
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg  pb-5 px-4 my-8 text-orange-500 bg-gray-700">
          <h1 className="text-white text-2xl text-center my-4">
            Password generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={password}
              placeholder="password"
              className="outline-none w-full px-3 py-1"
              readOnly
              ref={passwordRef}
            />
            <button
              className={`outline-none   ${
                isClickButton ? `bg-green-700` : "bg-blue-700"
              } text-white px-3 py-0.5 shrink-0`}
              onClick={copyPasswordToClipboard}
            >
              copy
            </button>
            {copied && <p className="text-b text-xl ">copied</p>}
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="charInput"
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label>characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
