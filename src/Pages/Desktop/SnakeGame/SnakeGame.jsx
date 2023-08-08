import { useState, useEffect } from "react";
import "./SnakeGame.css";
import PropTypes from "prop-types";

const SnakeGame = ({ directionSocket }) => {
  const [snakeDots, setSnakeDots] = useState([[0, 0]]);
  const [direction, setDirection] = useState("RIGHT");
  const [gameOver, setGameOver] = useState(false);

  const generateFood = () => {
    const x = Math.floor(Math.random() * 49) * 2;
    const y = Math.floor(Math.random() * 49) * 2;
    return [x, y];
  };

  const [food, setFood] = useState(generateFood());

  const resetGame = () => {
    setSnakeDots([[0, 0]]);
    setDirection("RIGHT");
    setGameOver(false);
    setFood(generateFood());
  };

  useEffect(() => {
    setDirection(directionSocket);
  }, [directionSocket]);

  useEffect(() => {
    const moveSnake = () => {
      if (gameOver) return;

      let dots = [...snakeDots];
      let head = dots[dots.length - 1];

      switch (direction) {
        case "RIGHT":
          head = [head[0] + 2, head[1]];
          break;
        case "LEFT":
          head = [head[0] - 2, head[1]];
          break;
        case "DOWN":
          head = [head[0], head[1] + 2];
          break;
        case "UP":
          head = [head[0], head[1] - 2];
          break;
        default:
          break;
      }

      dots.push(head);

      if (head[0] === food[0] && head[1] === food[1]) {
        setFood(generateFood());
      } else {
        dots.shift();
      }

      if (checkCollision(head, dots)) {
        setGameOver(true);
        return;
      }

      setSnakeDots(dots);
    };

    const gameLoop = setInterval(moveSnake, 80);

    const onKeyDown = (event) => {
      switch (event.keyCode) {
        case 37:
          setDirection("LEFT");
          break;
        case 38:
          setDirection("UP");
          break;
        case 39:
          setDirection("RIGHT");
          break;
        case 40:
          setDirection("DOWN");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [snakeDots, direction, food, gameOver]);

  const checkCollision = (head, snake) => {
    for (let i = 0; i < snake.length - 1; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="App">
      <div className="game-area">
        {snakeDots.map((dot, i) => {
          const style = {
            left: `${dot[0]}%`,
            top: `${dot[1]}%`,
          };
          return <div className="snake-dot" key={i} style={style}></div>;
        })}
        <div
          className="food"
          style={{ left: `${food[0]}%`, top: `${food[1]}%` }}
        ></div>
        {gameOver && (
          <div className="game-over flex flex-col items-center gap-3">
            <h2 className="text-3xl text-black">Game Over</h2>
            <button
              onClick={resetGame}
              className="py-4 bg-red-400 w-1/2 text-white"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;

SnakeGame.propTypes = {
  directionSocket: PropTypes.string,
};
