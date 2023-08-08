import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Icon } from "@iconify/react";
import SnakeGame from "./SnakeGame/SnakeGame";

const socket = io.connect("https://snake-game-server.vercel.app/");

const Connection = () => {
  const [roomCode, setRoomCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [direction, setDirection] = useState("RIGHT");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    socket.on("connectSecondDevice", (data) => {
      if (data.id !== socket.id && data.room === roomCode) {
        setIsSuccess(true);
      }
    });

    socket.on("move", (data) => {
      setDirection(data);
    });
  }, [roomCode]);

  const generateRandomCode = () => {
    const min = 1000; // Minimum value for 4 digits
    const max = 9999; // Maximum value for 4 digits
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRoom = () => {
    // Generate the code and join the room
    const code = generateRandomCode().toString();
    setRoomCode(code);
    socket.emit("join room", code);
  };

  return (
    <div>
      {!roomCode ? (
        <div className="min-h-screen flex justify-center items-center relative">
          <div className="grid place-content-center">
            <h1 className="text-4xl font-bold mb-4 text-white text-center">
              Welcome to RemoteSnake
            </h1>
            <p className="text-md mb-6 text-gray-400 text-center">
              Snake Game thats controlled from your phones browser
            </p>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md md:w-full w-1/2"
                onClick={generateRoom}
              >
                Generate Room
              </button>
            </div>
          </div>
          <div className={"absolute top-3 right-3 flex gap-2"}>
            <div
              className={`bg-black opacity-80 p-5 rounded-xl  ${
                isHovered ? "visible" : "hidden"
              }`}
            >
              <p className="text-white text-md">How to play:</p>
              <p className="text-white text-sm">1. Generate a room</p>
              <p className="text-white text-sm">
                2. Open the room on your phone
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
        <>
          {isSuccess ? (
            <div>
              <div className="min-h-screen flex justify-center items-center relative overflow-hidden">
                <div className="grid place-content-center">
                  <div className="z-20">
                    <SnakeGame directionSocket={direction} />
                  </div>
                  <div className="game-area-bg absolute bg-white z-0 blur-3xl opacity-950"></div>
                </div>
                <div className="absolute top-3 left-3">
                  <p className="text-white">
                    Room Code: <span className="text-2xl">{roomCode}</span>
                  </p>
                </div>
                <div className="absolute bottom-3 right-3 text-white">
                  <div className="flex flex-col w-full border-opacity-50">
                    <div className="grid rounded-box place-items-center">
                      Play With Arrow Keys
                    </div>
                    <div className="divider">OR</div>
                    <div className="grid rounded-box place-items-center">
                      Same website on your phone
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen flex justify-center items-center relative">
              <div className="grid place-content-center">
                <h1 className="text-4xl font-bold mb-4 text-white text-center">
                  Enter the code on your phone
                </h1>
                <p className="text-2xl mb-6 text-green-400 text-center font-semibold">
                  {roomCode}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Connection;
