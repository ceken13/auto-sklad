export const getStyles = (theme) => ({
  liNav: { listStyle: 'none', display: 'flex', aligItems: 'center', padding: '0 20px' },
  header: {
    top: 0,
    zIndex: 1000,
    background: '#FFFFFF',
    transition: 'all 0.3s ease',
    boxShadow: '0px 4px 12.4px -6px #D9D9D9',
    position: 'sticky',
  },
  divLayoutWidth: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 100,
    alignItems: 'center',
    maxWidth: 1240,
    margin: '0 auto',
  },
  logo: {
    display: 'flex',
    width: 246,
    height: 58,
  },
  nav: {
    width: '70%',
  },
  ulNav: {
    justifyContent: 'center',
    gap: 20,
    display: 'flex',
  },
  navA: {
    color: '#404B52',
    textDecoration: 'none',
  },
});
