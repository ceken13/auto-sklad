export const getStyles = (theme) => ({
  topWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    borderRadius: 1,
    flexDirection: { xs: 'column', sm: 'row' }, // xs — мобільні, sm+ — десктоп
    gap: { xs: 5, sm: 0 }, // додає відстань між елементами в моб версії
  },
  chipSt: {
    backgroundColor: '#006A5D',
    borderRadius: '4px',
    color: '#FFFFFF',
    padding: '8px 10px',
    '& .MuiChip-deleteIcon': {
      color: '#fff',
    },
    '&:hover .MuiChip-deleteIcon': {
      color: '#fff',
    },
  },
  carItemWrap: {
    border: '1px solid #E0E0E0',
    borderRadius: '1px',
    padding: '30px',
    display: 'flex',
    gap: '15%',
    alignItems: 'center',
    position: 'relative',
    alignItems: { xs: 'normal', sm: 'flex-start' },
    marginBottom: '30px',
    flexDirection: { xs: 'column', sm: 'row' }, // xs — мобільні, sm+ — десктоп
  },
  pickUpLabel: {
    background: '#E24124',
    color: '#fff',
    borderRadius: '0',
    fontSize: 12,
    fontWeight: 700,
    padding: '6px 10px 6px 30px',
    width: '250px',
    textTransform: 'uppercase',
    fontFamily: 'HyundaiSansHeadLight, sans-serif',

    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  specialOfferLabel: {
    background: '#43B0D4',
    color: '#fff',
    borderRadius: '0',
    fontSize: 12,
    fontWeight: 700,
    padding: '6px 10px 6px 30px',
    width: '250px',
    textTransform: 'uppercase',
    marginTop: '1px',
    fontFamily: 'HyundaiSansHeadLight, sans-serif',

    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },

  icon: {
    fontSize: 16,
  },

  saleLabels: {
    position: 'absolute',
    left: '0px',
    top: '30px',
  },
  imgCar: {
    width: '100%',
    objectFit: 'contain',
    maxWidth: { xs: '100%', sm: '300px' },
    marginTop: '70px',
  },
});
