import React, { useState } from 'react';

function CascadingMenu() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="cascading-menu">
      <div className="menu-item" onClick={toggleSubMenu}>
        Menu Principal
      </div>
      {isSubMenuOpen && (
        <div className="sub-menu">
          <div className="sub-menu-item">Subitem 1</div>
          <div className="sub-menu-item">Subitem 2</div>
          <div className="sub-menu-item">Subitem 3</div>
        </div>
      )}
    </div>
  );
}

export default CascadingMenu;
