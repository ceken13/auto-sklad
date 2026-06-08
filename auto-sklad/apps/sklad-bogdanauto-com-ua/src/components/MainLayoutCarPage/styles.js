export const getStyles = (theme) => ({
  flexWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: '30px 0',
    gap: '50px',
    flexDirection: { xs: 'column', sm: 'row' }, // xs — мобільні, sm+ — десктоп
  },
  imgSlider: {
    maxWidth: '100%',
    width: '450px',
    margin: '0 auto',
    display: 'block',
    cursor: 'pointer',
  },
  sliderWrap: {
    position: 'relative',
    margin: '0 auto',
    paddingTop: '20px',
    border: '1px solid #B8B3AD',
    borderRadius: '8px',
  },
  textUnderSlider: {
    color: '#999999',
    opacity: '0,5',
    fontSize: '14px',
    marginTop: '30px',
  },
});
