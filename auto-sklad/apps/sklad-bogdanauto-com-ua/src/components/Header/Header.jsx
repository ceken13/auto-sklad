import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { RightMenu } from './RightMenu';
import { Box } from '@mui/material';

export function Header() {
  const styles = getStyles(theme);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  return (
    <Box>
      <div>
        <header style={styles.header}>
          <Box
            sx={{
              paddingLeft: { xs: '15px', sm: '0' },
            }}
          >
            <div style={styles.divLayoutWidth}>
              <a href="https://bogdanauto.com.ua/" style={styles.logo} target="_blank">
                <img src="https://bogdanauto.com.ua/wp-content/themes/bah-theme/images/icons/logo.svg" />
              </a>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
              >
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
                      <li style={styles.liNav}>
                        <a style={styles.navA} href="https://os.bogdanauto.com.ua/">
                          Авто в наявності
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </Box>
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <RightMenu open={open} toggleDrawer={toggleDrawer} />
            </div>
          </Box>
        </header>
      </div>
    </Box>
  );
}

export default Header;
