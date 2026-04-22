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
      <a href={`tel:${normalizePhone(phone)}`} style={{ color: '#00aad2', textDecoration: 'none' }}>
        {phone}
      </a>
      {i < phones.length - 1 ? ', ' : ''}
    </span>
  ));

export default function DealerCard({ dealer, onSelect }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {/* NAME */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
            marginBottom: 8,
            textDecoration: 'underline',
          }}
        >
          Показати на мапі
        </a>

        {/* ADDRESS */}
        <Typography sx={{ mb: 1 }}>{dealer.fullAddress}</Typography>

        {/* SHOWROOM */}
        {dealer.phonesShowroom?.length > 0 && (
          <Typography variant="body2">
            <b>Автосалон:</b> {renderPhones(dealer.phonesShowroom)}
          </Typography>
        )}

        {/* SERVICE */}
        {dealer.phonesService?.length > 0 && (
          <Typography variant="body2">
            <b>СТО:</b> {renderPhones(dealer.phonesService)}
          </Typography>
        )}

        {/* SITE */}
        {dealer.site && (
          <Typography sx={{ fontSize: 14, mt: 1 }}>
            <span>Сайт: </span>
            <a href={dealer.site} target="_blank" rel="noreferrer">
              {dealer.siteLabel}
            </a>
          </Typography>
        )}

        {/* BUTTON */}
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => onSelect(dealer)}>
          Обрати
        </Button>
      </CardContent>
    </Card>
  );
}
