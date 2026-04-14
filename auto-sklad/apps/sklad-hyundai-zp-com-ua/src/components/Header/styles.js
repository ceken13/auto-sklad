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

    paddingTop: '0px',
    paddingBottom: '0px',
  },
  imgTel: {
    height: '20px',
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
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '8px',
  },
  bottomMenuItem: {
    fontSize: '14px',
    color: '#666',
    fontFamily: 'HyundaiSansHeadMedium, sans-serif',
  },
});
