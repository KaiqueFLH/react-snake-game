import { useEffect, useState } from "react";
import "./App.css";

function App() {
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

  const [eatApple, setEatApple] = useState(false);
  const [snake, setSnake] = useState([
    [0, 0],
    [1, 0],
    [2, 0],
  ]); // Cobra inicial com comprimento de 3

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newSnakeBoard = [...snakeBoard];
      let newSnake = [...snake];
      let [xPos, yPos] = newSnake[newSnake.length - 1];

      let newHead;
      if (e.key === "ArrowUp") {
        newHead = [xPos, yPos - 1];
      } else if (e.key === "ArrowDown") {
        newHead = [xPos, yPos + 1];
      } else if (e.key === "ArrowLeft") {
        newHead = [xPos - 1, yPos];
      } else if (e.key === "ArrowRight") {
        newHead = [xPos + 1, yPos];
      } else {
        return;
      }

      if (
        newHead[0] < 0 ||
        newHead[0] >= newSnakeBoard.length ||
        newHead[1] < 0 ||
        newHead[1] >= newSnakeBoard[0].length ||
        newSnake.some(([x, y]) => x === newHead[0] && y === newHead[1])
      ) {
        window.location.reload();
        alert("Game Over");
        return;
      }

      newSnake.push(newHead);

      if (newSnakeBoard[newHead[0]][newHead[1]] === "A") {
        setEatApple(true);
        let x, y;
        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
        } while (newSnakeBoard[x][y] === "()" || newSnakeBoard[x][y] === "X");
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

    window.addEventListener("keydown", handleKeyDown);



    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snakeBoard, snake]);

  useEffect(() => {
    let newSnakeBoard = [...snakeBoard];
    newSnakeBoard[0][0] = "X";
    newSnakeBoard[1][0] = "X";
    newSnakeBoard[2][0] = "()";

    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (newSnakeBoard[x][y] === "()" || newSnakeBoard[x][y] === "X");
    newSnakeBoard[x][y] = "A";
    setSnakeBoard(newSnakeBoard);
  }, []);

  return (
    <>
      <section>
        {snakeBoard.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => {
                if (cell === "X") {
                  return (
                    <div key={cellIndex} className="cellBodySnake">
                    </div>
                  );
                }else if (cell === "()") {
                  return (
                    <div key={cellIndex} className="cellHeadSnake">
                    </div>
                  );
                } else if (cell === "A") {
                  return (
                    <div key={cellIndex} className="cellApple">
                    </div>
                  );
                } else {
                  return (
                    <div key={cellIndex} className="cell">
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
