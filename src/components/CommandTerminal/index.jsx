import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalInput, TerminalOutput } from 'react-terminal-ui';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

import './styles.css';

const CommandTerminal = ({ id, title, onClose, onMinimize, onRestore, isActive, isMaximized, isMinimized, onClick, onMaximize, initialSize,apps,
  openWindow }) => {
  console.log(initialSize)
  const [size, setSize] = useState(initialSize);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMaximize = () => {
    setSize(isMaximized ? initialSize : { width: window.innerWidth - 20, height: window.innerHeight - 45 });
    setPosition(isMaximized ? { x: 100, y: 100 } : { x: 10, y: 10 });
    onMaximize(id)
    if (!isMaximized) {
      onRestore();  // Trigger restore when maximized
    }
  };

  const [colorMode, setColorMode] = useState(ColorMode.Dark);
  const [lineData, setLineData] = useState([
    <TerminalOutput>Welcome to the command line!&#128075;</TerminalOutput>,
    <TerminalOutput></TerminalOutput>,
    <TerminalOutput>The following example commands are provided:</TerminalOutput>,
    <TerminalOutput>'resume' will navigate to my resume.</TerminalOutput>,
    <TerminalOutput>'minesweeper' will navigate to the Minesweeper game.</TerminalOutput>,
    <TerminalOutput>'time' will show the current time.</TerminalOutput>,
    <TerminalOutput>'clear' will clear the terminal.</TerminalOutput>,
  ]);

  function toggleColorMode(e) {
    e.preventDefault();
    setColorMode(colorMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light);
  }

  function onInput(input) {
    let ld = [...lineData];
    ld.push(<TerminalInput>{input}</TerminalInput>);
    if (input.toLocaleLowerCase().trim() === 'resume') {
      openWindow("Resume",apps.filter(item=>item.title=="Resume")[0])
    } else if (input.toLocaleLowerCase().trim() === 'minesweeper') {
      openWindow("Minesweeper",apps.filter(item=>item.title=="Minesweeper")[0])
    }else if (input.toLocaleLowerCase().trim() === 'time') {
      const newDate = new Date()
      ld.push(<TerminalOutput>{newDate.toLocaleString()}</TerminalOutput>);
    } else if (input.toLocaleLowerCase().trim() === 'clear') {
      ld = [];
    } else if (input) {
      ld.push(<TerminalOutput>Unrecognized command</TerminalOutput>);
    }
    setLineData(ld);
  }

  const redBtnClick = () => {
    console.log("Clicked the red button.");
  }

  const yellowBtnClick = () => {
    console.log("Clicked the yellow button.");
  }

  const greenBtnClick = () => {
    console.log("Clicked the green button.");
  }

  const btnClasses = ['btn'];
  if (colorMode === ColorMode.Light) {
    btnClasses.push('btn-dark');
  } else {
    btnClasses.push('btn-light');
  }

  return (
    <Draggable
      handle=".window-content-terminal"
      defaultPosition={isMaximized ? { x: 0, y: 0 } : position}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onStop={(e, data) => !isMaximized ? setPosition({ x: data.x, y: data.y }) : { x: 0, y: 0 }}
    >
      <div
        className={`window-terminal ${isActive ? 'active' : ''}`}
        style={{ display: isMinimized ? 'none' : 'block' }}
      // onClick={onClick}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[200, 200]}
          maxConstraints={[window.innerWidth - 20, window.innerHeight - 20]}
          className="resizable-box"
          onResizeStop={(e, data) => setSize({ width: data.size.width, height: data.size.height })}
        >
          <div className="window-content-terminal">
              <Terminal
                name='Command Line'
                colorMode={colorMode}
                onInput={onInput}
                redBtnCallback={onClose}
                yellowBtnCallback={() => onMinimize(id)}
                greenBtnCallback={handleMaximize}
                height={size.height + ""}
              >
                {lineData}
              </Terminal>
            </div>

        </ResizableBox>
      </div>
    </Draggable>


  )
}

export default CommandTerminal;