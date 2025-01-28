import React from "react";
import NewGame from "./components/NewGame";
import Game from "./components/Game";
import "./styles/base.scss";

function App() {
  const [play, setPlay] = React.useState(false);
  const [gameState, setGameState] = React.useState();

  const startNewGame = function (state) {
    setPlay(true);
    setGameState(state);
  };

  const restartGame = function () {
    setPlay(false);
  };

  if (!play) return <NewGame startNewGame={startNewGame} />;
  if (play) return <Game gameState={gameState} restartGame={restartGame} />;
}

export default App;
