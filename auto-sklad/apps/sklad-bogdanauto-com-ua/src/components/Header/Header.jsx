import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { RightMenu } from './RightMenu';

export function Header() {
  const styles = getStyles(theme);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  return (
    <div>
      <div>
        <header style={styles.header}>
          <div style={styles.divLayoutWidth}>
            <a href="https://bogdanauto.com.ua/" style={styles.logo} target="_blank">
              <img src="https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/icons/logo.svg" />
            </a>
            <nav>
              <div>
                <ul style={styles.ulNav}>
                  <li style={styles.liNav}>
                    <a style={styles.navA} href="https://bogdanauto.com.ua/hyundai/" target="_blank">
                      Hyundai
                    </a>
                  </li>
                  <li style={styles.liNav}>
                    <a style={styles.navA} href="https://bogdanauto.com.ua/jac/" target="_blank">
                      JAC
                    </a>
                  </li>
                  <li style={styles.liNav}>
                    <a style={styles.navA} href="https://bogdanauto.com.ua/haval/" target="_blank">
                      HAVAL
                    </a>
                  </li>
                  <li style={styles.liNav}>
                    <a style={styles.navA} href="https://bogdanauto.com.ua/subaru/" target="_blank">
                      Subaru
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <RightMenu open={open} toggleDrawer={toggleDrawer} />
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
