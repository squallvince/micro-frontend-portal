import React, { useState } from 'react';
import IconFont from '../IconFont';
import { MANAGE_PORTAL, OPERATION_PORTAL, Portal } from '../../constants/header';


const ModeMenu = (props) => {
  const [mode, setMode] = useState(MANAGE_PORTAL);
  const toggleMode = () => {
    const newMode = mode === MANAGE_PORTAL ? OPERATION_PORTAL : MANAGE_PORTAL;
    setMode(newMode);
    props.changeMode(newMode);
  };

  return (
      <div className="hy-menu-dropdown-link" onClick={toggleMode}>
        <IconFont type="icon-computing" />
        {Portal[mode]}
      </div>
  );
};

export default ModeMenu;
