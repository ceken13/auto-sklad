import { Card, CardContent, Typography, Button } from '@mui/material';

// нормалізація для tel:
const normalizePhone = (phone) => {
  let cleaned = phone.replace(/[^\d+]/g, '');

  if (!cleaned.startsWith('+') && cleaned.length === 10) {
    cleaned = '+38' + cleaned;
  }

  return cleaned;
};

// рендер списку телефонів
const renderPhones = (phones = []) =>
  phones.map((phone, i) => (
    <span key={i}>
      <a href={`tel:${normalizePhone(phone)}`} style={{ color: '#000', textDecoration: 'none' }}>
        {phone}
      </a>
      {i < phones.length - 1 ? ', ' : ''}
    </span>
  ));

export default function DealerCard({ dealer, onSelect }) {
  return (
    <Card
      sx={{
        mb: 2,
        textAlign: 'left',
        borderRadius: '0',
        padding: '40px 30px',
        boxShadow: '0 0 10px 0 rgb(0 0 0 / 20%)',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '0',
        }}
      >
        {/* NAME */}
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '24px', color: '#002c5f' }}>
          {dealer.name}
        </Typography>

        {/* MAP */}
        <a
          href={dealer.mapUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#00aad2',
            display: 'inline-block',
            margin: '20px 0',
            textDecoration: 'none',
          }}
        >
          Показати на мапі
        </a>

        {/* ADDRESS */}
        <Typography sx={{ mb: 1, fontSize: '16px' }}>{dealer.fullAddress}</Typography>

        {/* SHOWROOM */}
        {dealer.phonesShowroom?.length > 0 && (
          <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
            <b>Автосалон:</b> {renderPhones(dealer.phonesShowroom)}
          </Typography>
        )}

        {/* SERVICE */}
        {dealer.phonesService?.length > 0 && (
          <Typography variant="body2" sx={{ mb: 2, mt: 2 }}>
            <b>СТО:</b> {renderPhones(dealer.phonesService)}
          </Typography>
        )}

        {/* SITE */}
        {dealer.site && (
          <Typography variant="body2" sx={{ mb: 4, mt: 2 }}>
            <span>
              <b>Сайт:</b>{' '}
            </span>
            <a
              href={dealer.site}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#002c5f', textDecoration: 'underline' }}
            >
              {dealer.siteLabel}
            </a>
          </Typography>
        )}

        {/* BUTTON */}
        <Button
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => onSelect(dealer)}
          sx={{
            mt: 'auto',
            display: 'block',

            lineHeight: '50px',
            height: '50px',
            background: '#002c5f',
            color: '#fff',
            padding: '0 10px',
            fontSize: '16px',
            borderRadius: 0,
            textTransform: 'none',
            fontWeight: '400',
          }}
        >
          Обрати
        </Button>
      </CardContent>
    </Card>
  );
}
