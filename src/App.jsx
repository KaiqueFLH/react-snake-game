import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  let [snakeBoard, setSnakeBoard] = useState([
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

  let [eatApple,setEatApple] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      let newSnakeBoard = [...snakeBoard];
      let tale = [];
      let xPos, yPos;
      for (let i = 0; i < newSnakeBoard.length; i++) {
        for (let j = 0; j < newSnakeBoard[i].length; j++) {
          if (newSnakeBoard[i][j] === "()") {
            xPos = i;
            yPos = j;
          }
        }
      }

      if (e.key === "ArrowUp") {
        if (yPos > 0) {
          if (eatApple) {
            tale.push("X");
          }
          for (let i = 0; i < tale.length; i++) {
            newSnakeBoard[xPos][yPos] = "X";
          }
          // newSnakeBoard[xPos][yPos] = "X";

          console.log(yPos);
          if (newSnakeBoard[xPos][yPos - 1] === "X") {
            window.location.reload();
            alert("Game Over");
          } else newSnakeBoard[xPos][yPos - 1] = "()";
        }
      }
      if (e.key === "ArrowDown") {
        if (yPos < newSnakeBoard[0].length - 1) {
          if (eatApple) {
            tale.push("X");
          }

          for (let i = 0; i < tale.length; i++) {
            newSnakeBoard[xPos][yPos] = "X";
          }
          // newSnakeBoard[xPos][yPos] = "X";

          if (newSnakeBoard[xPos][yPos + 1] === "X") {
            window.location.reload();
            alert("Game Over");
          } else newSnakeBoard[xPos][yPos + 1] = "()";
        }
      }
      if (e.key === "ArrowLeft") {
        if (xPos > 0) {
          if (eatApple) {
            tale.push("X");
          }
          for (let i = 0; i < tale.length; i++) {
            newSnakeBoard[xPos][yPos] = "X";
          }
          // newSnakeBoard[xPos][yPos] = "X";

          if (newSnakeBoard[xPos - 1][yPos] === "X") {
            window.location.reload();
            alert("Game Over");
          } else newSnakeBoard[xPos - 1][yPos] = "()";
        }
      }
      if (e.key === "ArrowRight") {
        if (xPos < newSnakeBoard.length - 1) {
          // newSnakeBoard[xPos][yPos] = "X";
          if (eatApple) {
            tale.push("X");
          }
          for (let i = 0; i < tale.length; i++) {
            newSnakeBoard[xPos][yPos] = "X";
          }

          if (newSnakeBoard[xPos + 1][yPos] === "X") {
            window.location.reload();
            alert("Game Over");
          } else newSnakeBoard[xPos + 1][yPos] = "()";

          //todo = fazer ele comer a maçã quando passar por cima
        }
      }
      setSnakeBoard(newSnakeBoard);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snakeBoard]);

  useEffect(() => {
    let newSnakeBoard = [...snakeBoard];
    newSnakeBoard[0][0] = "()";
    //todo = colocar maça aleatoriamente em um espaço vazio
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    console.log(x, y);
    newSnakeBoard[x][y] = "A";
    setSnakeBoard(newSnakeBoard);
  }, []);

  return (
    <>
      <section>
        {snakeBoard.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((cell, cellIndex) => {
                return (
                  <div className="cell" key={cellIndex}>
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default App;
