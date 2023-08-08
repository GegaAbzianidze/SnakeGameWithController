import { Icon } from "@iconify/react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.13:3001");

const Controls = () => {
  const [room, setRoom] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRotated, setIsRotated] = useState(true);
  const [isKBD, setIsKBD] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleInputChange = (event) => {
    setRoom(event.target.value);
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join room", room);
      setIsSuccess(true);
    }
  };

  const handleInputEvent = (input) => {
    socket.emit("Inputs", { room, input });
  };

  return (
    <div>
      {!isSuccess ? (
        <div className="min-h-screen flex justify-center items-center relative">
          <div className="grid place-content-center">
            <div className="form-control w-full max-w-xs items-center">
              <h1 className="text-4xl font-bold mb-4 text-white text-center">
                Welcome to RemoteSnake
              </h1>
              <label className="label">
                <span className="label-text text-white">
                  Enter 4-digit code
                </span>
              </label>
              <input
                type="text"
                placeholder="****"
                className="input input-bordered w-full max-w-xs"
                value={room}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={joinRoom}
              className="px-4 py-2 bg-blue-500 text-white rounded-md w-full mt-4"
            >
              Join Room
            </button>
          </div>
          <div className={"absolute top-3 right-3 flex gap-2"}>
            <div
              className={`bg-black opacity-80 p-5 rounded-xl  ${
                isHovered ? "visible" : "hidden"
              }`}
            >
              <p className="text-white text-md">How to play:</p>
              <p className="text-white text-sm">
                1. Generate a room on your PC
              </p>
              <p className="text-white text-sm">
                2. Enter the code on your phone
              </p>
              <p className="text-white text-sm">3. Play!</p>
            </div>
            <Icon
              icon="ion:help-circle-outline"
              className="text-white text-3xl cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center relative">
          <div className="grid place-content-center">
            {isKBD ? (
              <div>
                {!isRotated ? (
                  <div className="flex flex-col p-5 gap-3">
                    <button
                      className="text-3xl m-2"
                      onClick={() => handleInputEvent("UP")}
                    >
                      <kbd className="kbd">▲</kbd>
                    </button>
                    <div className="flex justify-center gap-5">
                      <button
                        className="text-3xl m-2"
                        onClick={() => handleInputEvent("LEFT")}
                      >
                        <kbd className="kbd">◀︎</kbd>
                      </button>
                      <button
                        className="text-3xl m-2"
                        onClick={() => handleInputEvent("DOWN")}
                      >
                        <kbd className="kbd">▼</kbd>
                      </button>
                      <button
                        className="text-3xl m-2"
                        onClick={() => handleInputEvent("RIGHT")}
                      >
                        <kbd className="kbd">▶︎</kbd>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col p-5 gap-3 rotate-90">
                    <button
                      className="text-3xl m-2"
                      onClick={() => handleInputEvent("UP")}
                    >
                      <kbd className="kbd">▲</kbd>
                    </button>
                    <div className="flex justify-center gap-5">
                      <button
                        className="text-3xl m-2"
                        onClick={() => handleInputEvent("LEFT")}
                      >
                        <kbd className="kbd">◀︎</kbd>
                      </button>
                      <button
                        className="text-3xl m-2"
                        onClick={() => handleInputEvent("DOWN")}
                      >
                        <kbd className="kbd">▼</kbd>
                      </button>
                      <button
                        className="text-3xl m-2"
                        onClick={() => handleInputEvent("RIGHT")}
                      >
                        <kbd className="kbd">▶︎</kbd>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-3xl">
                <div className="flex justify-center w-full">
                  <button
                    className="m-2"
                    onClick={() => handleInputEvent("UP")}
                  >
                    <kbd className="kbd">▲</kbd>
                  </button>
                </div>
                <div className="flex justify-center gap-12 w-full">
                  <button
                    className="m-2"
                    onClick={() => handleInputEvent("LEFT")}
                  >
                    <kbd className="kbd">◀︎</kbd>{" "}
                  </button>
                  <button
                    className="m-2"
                    onClick={() => handleInputEvent("RIGHT")}
                  >
                    <kbd className="kbd">▶︎</kbd>
                  </button>
                </div>
                <div className="flex justify-center w-full">
                  {" "}
                  <button
                    className="m-2"
                    onClick={() => handleInputEvent("DOWN")}
                  >
                    <kbd className="kbd">▼</kbd>{" "}
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="absolute top-3 left-3">
            <p className="text-white">
              Room Code: <span className="text-2xl">{room}</span>
            </p>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-2" onClick={() => setIsRotated(!isRotated)}>
              <p className="text-white text-3xl">
                <Icon icon="ic:round-rotate-90-degrees-ccw" />
              </p>
            </button>
            <button className="p-2" onClick={() => setIsKBD(!isKBD)}>
              <p className="text-white text-3xl">
                <Icon icon="material-symbols:keyboard" />
              </p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;
