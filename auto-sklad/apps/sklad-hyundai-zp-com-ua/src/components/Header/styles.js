export const getStyles = (theme) => ({
  header: {
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid #ececec',
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
  imgLogo: {
    display: 'flex',
    height: 21,
  },
  topMenuLayout: {
    display: 'flex',
    backgroundColor: '#e4dcd3',
    position: 'initial',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  imgTel: {
    height: '20px',
    display: { xs: 'none', md: 'initial' },
  },
  linkTel: {
    color: '#000',
    fontWeight: '700',
    textDecoration: 'none',
  },
  topMenuItem: {
    borderLeft: '1px solid #f1efee',
    color: '#666',
    fontSize: '16px',
    padding: '5px 30px',
  },
  bottomMenuLayout: {
    display: { xs: 'initial', md: 'flex' },
    paddingTop: '10px',
    paddingBottom: '8px',
  },
  bottomMenuItem: {
    fontSize: '14px',
    color: { xs: '#000', md: '#666' },
    p: { xs: 2, md: 2 },
    fontFamily: 'HyundaiSansHeadMedium, sans-serif',
    '&:hover': {
      background: '#fff',
    },
  },

  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100vw',
    background: '#fff',
    padding: '40px 80px',
    display: 'flex',
    gap: '80px',
    zIndex: 1000,
    borderTop: '1px solid #ddd',
  },

  dropdownColumn: {
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  dropdownTitle: {
    fontWeight: '600',
    marginBottom: '10px',
  },

  dropdownLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '14px',
    '&:hover': {
      color: '#000',
    },
  },
  closeButton: {
    position: 'absolute',
    top: '130px',
    right: '30px',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#999',
    zIndex: '9999',
    '&:hover': {
      color: '#000',
    },
  },
  mobTopMenu: {
    display: { xs: 'flex', md: 'none' },
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 2,
    py: 1,
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 2000,
  },
  mobTopMenuItem: {
    fontSize: '14px',
    fontFamily: 'HyundaiSansHeadMedium, sans-serif',
    boxShadow: 'none',
  },
});
