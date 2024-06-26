import { useContext, useEffect, useState } from "react";
import "../game/Game.css";
import { PersContext } from "../contexts/persProvider";

export default function Game() {
  const [snakeBoard, setSnakeBoard] = useState([
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ]);

  const [direction, setDirection] = useState("ArrowRight");
  // eslint-disable-next-line no-unused-vars
  const [eatApple, setEatApple] = useState(false);
  const [snake, setSnake] = useState([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);

  let [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.key === "ArrowUp" && direction != "ArrowDown") ||
        (e.key === "ArrowDown" && direction != "ArrowUp") ||
        (e.key === "ArrowLeft" && direction != "ArrowRight") ||
        (e.key === "ArrowRight" && direction != "ArrowLeft")
      ) {
        setDirection(e.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    if (gameStarted) {
      const moveSnake = () => {
        let newSnakeBoard = [...snakeBoard];
        let newSnake = [...snake];
        let [xPos, yPos] = newSnake[newSnake.length - 1];
        let newHead;

        if (direction === "ArrowUp") {
          newHead = [xPos, yPos - 1];
        } else if (direction === "ArrowDown") {
          newHead = [xPos, yPos + 1];
        } else if (direction === "ArrowLeft") {
          newHead = [xPos - 1, yPos];
        } else if (direction === "ArrowRight") {
          newHead = [xPos + 1, yPos];
        }

        if (
          newHead[0] < 0 ||
          newHead[0] >= newSnakeBoard.length ||
          newHead[1] < 0 ||
          newHead[1] >= newSnakeBoard[0].length ||
          newSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])
        ) {
          newSnake = [
            [0, 0],
            [1, 0],
            [2, 0],
          ];
          setSnake(newSnake);
          alert("Game Over");
          window.location.href = "/";

          return;
        }
        if (newSnake.length === 100) {
          newSnake = [
            [0, 0],
            [1, 0],
            [2, 0],
          ];
          setSnake(newSnake);
          alert("You Win");
          window.location.reload();
          return;
        }

        newSnake.push(newHead);

        if (newSnakeBoard[newHead[0]][newHead[1]] === "A") {
          setEatApple(true);
          let x, y;
          do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
          } while (newSnakeBoard[x][y] !== "");
          newSnakeBoard[x][y] = "A";
          newSnakeBoard[newHead[0]][newHead[1]] = "()";
        } else {
          setEatApple(false);
          let [tailX, tailY] = newSnake.shift();
          newSnakeBoard[tailX][tailY] = "";
        }

        newSnakeBoard[xPos][yPos] = "X";
        newSnakeBoard[newHead[0]][newHead[1]] = "()";

        setSnakeBoard(newSnakeBoard);
        setSnake(newSnake);
      };

      const intervalId = setInterval(moveSnake, 100);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [snake, snakeBoard, direction]);

  const start = () => {
    setGameStarted(true);
    let newSnakeBoard = [...snakeBoard];
    newSnakeBoard[0][0] = "X";
    newSnakeBoard[1][0] = "X";
    newSnakeBoard[2][0] = "()";

    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (newSnakeBoard[x][y] !== "");
    newSnakeBoard[x][y] = "A";
    newSnakeBoard[x][y] = "A";
    setSnakeBoard(newSnakeBoard);
  };

  const { pers } = useContext(PersContext);

  return (
    <>
      <div className="geralDiv">
        <div className="scoreBoard">
          <h1>JOGO DO {pers.name}</h1>

          {gameStarted && <h2>Tamanho do seu {pers.name}: {snake.length}</h2>}
        </div>

        <section>
          {snakeBoard.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {row.map((cell, cellIndex) => {
                  if (cell === "X") {
                    return (
                      <div key={cellIndex} style={{backgroundColor:pers.colorBody}} className="cellBodySnake"></div>
                    );
                  } else if (cell === "()") {
                    let tongueClass = "";
                    if (direction === "ArrowUp") tongueClass = "tongue-up";
                    else if (direction === "ArrowDown")
                      tongueClass = "tongue-down";
                    else if (direction === "ArrowLeft")
                      tongueClass = "tongue-left";
                    else if (direction === "ArrowRight")
                      tongueClass = "tongue-right";

                    return (
                      <div key={cellIndex} id="head" className="cellHeadSnake">
                        <img
                          style={{
                            position: "absolute",
                            transform:
                              direction === "ArrowUp"
                                ? "rotate(180deg)"
                                : direction === "ArrowDown"
                                ? "rotate(0deg)"
                                : direction === "ArrowLeft"
                                ? "rotate(90deg)"
                                : "rotate(270deg)",
                          }}
                          src="../../public/assets/cabecaCobra.svg"
                          alt=""
                        />
                        <img
                          className={`snakeTongue ${tongueClass}`}
                          src="../../public/assets/linguaCobra.png"
                          alt=""
                        />
                      </div>
                    );
                  } else if (cell === "A") {
                    return <div key={cellIndex} className="cellApple"></div>;
                  } else {
                    return <div key={cellIndex} className="cell"></div>;
                  }
                })}
              </div>
            );
          })}
        </section>

        <button onClick={() => start()}>Iniciar Jogo do {pers.name}.</button>
      </div>
    </>
  );
}
