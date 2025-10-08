import React, { useState } from 'react';

import CommandTerminal from './components/CommandTerminal';
import DesktopIcon from './components/DesktopIcon';
import ContextMenu from './components/ContextMenu';
import FileExplorerWindow from './components/FileExplorerWindow';
import IFrameComponent from './components/IFrameComponent';
import Minesweeper from './components/Minesweeper'
import ResumeViewer from './components/ResumeViewer';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import { Apps } from './Constants';

import './styles/App.css';
import PptComponent from './components/PptComponent';

const App = () => {
  const [windows, setWindows] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [icons, setIcons] = useState(Apps);


  const handleIconStop = (id, data) => {
    console.log('Dragging stopped:', data);
    setIcons(prevIcons =>
      prevIcons.map(icon =>
        icon.id === id ? { ...icon, position: { x: data.x, y: data.y } } : icon
      )
    );
  };


  const nextPosition = () => {
    const baseX = 100;
    const baseY = 100;
    const offset = 30;
    const count = windows.filter(win => !win.minimized).length;
    return { x: baseX + (count * offset), y: baseY + (count * offset) };
  };

  const openWindow = (title, item) => {
    const position = nextPosition();
    setWindows(prevWindows => [
      ...prevWindows,
      {
        id: Date.now(),
        title: title == "Iframe" ? item.title :(title == "Pptx")?" Welcome !!!": title,
        content: title == "Iframe" ? <IFrameComponent url={item.url} /> : (title == "Minesweeper") ? <Minesweeper /> : (title == "Resume") ? <ResumeViewer /> : (title == "Pptx")? <PptComponent/>: <div>Content for {title}</div>,
        minimized: false,
        maximized: false,
        type: (title === 'File' ? 'File' : (title === 'Command' ? 'Command' : 'Window')),
        position,
        icon: item.icon,
        size: { width: item.size.width, height: item.size.height }
      }
    ]);
  };

  const closeWindow = (id) => {
    setWindows(prevWindows => prevWindows.filter(win => win.id !== id));
    if (id === activeWindowId) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id) => {
    console.log(id)
    setWindows(prevWindows => prevWindows.map(win =>
      win.id === id ? { ...win, minimized: true } : win
    ));
    console.log(windows)
    if (id === activeWindowId) {
      setActiveWindowId(null);
    }
  };

  const restoreWindow = (id) => {
    setWindows(prevWindows => prevWindows.map(win =>
      win.id === id ? { ...win, minimized: false } : win
    ));
    setActiveWindowId(id);
  };

  const maximizeWindow = (id) => {
    console.log(id)
    setWindows(prevWindows => prevWindows.map(win =>
      win.id === id
        ? { ...win, maximized: !win.maximized }
        : win
    ));

  };

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'Open', action: () => openWindow('New Window', null) },
        { label: 'Refresh', action: () => console.log('Refresh clicked') },
      ]
    });
  };

  //onContextMenu={handleRightClick}
  return (
    <div className="desktop" onContextMenu={handleRightClick} >
      <Taskbar
        windows={windows}
        apps={Apps}
        onStartClick={() => console.log('Start button clicked')}
        //onWindowClick={handleWindowClick}
        openWindow={openWindow}
        onRestoreWindow={restoreWindow}
      />

      {icons.map(icon => (
        <DesktopIcon
          key={icon.id}
          iconSrc={icon.icon}
          label={icon.title}
          position={icon.position}
          onStop={(data) => handleIconStop(icon.id, data)}
          onClick={() => openWindow(icon.onClick, icon)}
        />
      ))}

      {windows.map(win => (
        !win.minimized && win.type == "File" ?
          <FileExplorerWindow
            key={win.id}
            id={win.id}
            title={win.title}
            isActive={win.isActive}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            onRestore={() => restoreWindow(win.id)}
            onMaximize={() => maximizeWindow(win.id)}
            //onClick={() => handleWindowClick(win.id)}
            initialPosition={win.position}
            initialSize={win.size}
          />
          :
          (win.type == "Command" ?
            <CommandTerminal
              id={win.id}
              key={win.id}
              title={win.title}
              isActive={win.id === activeWindowId}
              isMaximized={win.maximized}
              isMinimized={win.minimized}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onRestore={() => restoreWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              //onClick={() => handleWindowClick(win.id)}
              initialPosition={win.position}
              initialSize={win.size}
              apps={Apps}
              openWindow={openWindow}
            />

            :

            (
              <Window
                id={win.id}
                key={win.id}
                title={win.title}
                isActive={win.id === activeWindowId}
                isMaximized={win.maximized}
                isMinimized={win.minimized}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onRestore={() => restoreWindow(win.id)}
                onMaximize={() => maximizeWindow(win.id)}
                //onClick={() => handleWindowClick(win.id)}
                initialPosition={win.position}
                initialSize={win.size}
              >
                {win.content}
              </Window>
            ))
      ))}
      {/**contextMenu && (
        <ContextMenu
          position={contextMenu}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )**/}

    </div>
  );
};

export default App;

