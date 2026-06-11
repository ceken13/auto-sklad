import { theme } from '../../theme.ts';
import { getStyles } from './styles';
import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { BottomMenu } from './BottomMenu';
import { TopMenu } from './TopMenu';
import { ContactBar } from './ContactBar';
import { ImgLogo } from './imgLogo';
import { MobileMenu } from './MobileMenu';
import { Box, IconButton, Drawer, Typography } from '@mui/material';

export function Header() {
  const styles = getStyles(theme);
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  return (
    <Box>
      <div>
        <header style={{ ...styles.header, position: 'relative' }}>
          {/* DESKTOP  */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
            <ContactBar />
            <TopMenu />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
            <ImgLogo />
            <BottomMenu />
            <Typography sx={{ fontWeight: '700', fontSize: '20px', paddingRight: '20px' }}>
              Богдан-Авто Івано-Франківськ
            </Typography>
          </Box>
          {/* MOBILE */}
          <Box sx={styles.mobTopMenu}>
            <ImgLogo />

            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Typography sx={{ fontWeight: '700', fontSize: '20px', paddingLeft: '20px' }}>
              Богдан-Авто Івано-Франківськ
            </Typography>
            <ContactBar />
          </Box>
          <Drawer
            anchor="right"
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{
              sx: { width: '100%', maxWidth: 340 },
            }}
          >
            <MobileMenu onClose={() => setOpen(false)} />
          </Drawer>
        </header>
      </div>
    </Box>
  );
}

export default Header;
