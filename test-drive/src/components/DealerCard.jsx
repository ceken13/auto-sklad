import { Card, CardContent, Typography, Button } from '@mui/material';

export default function DealerCard({ dealer, onSelect }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{dealer.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {dealer.city}
        </Typography>
        <Typography variant="body2">{dealer.address}</Typography>

        <Button variant="contained" style={{ marginTop: 10 }} onClick={() => onSelect(dealer)}>
          Обрати
        </Button>
      </CardContent>
    </Card>
  );
}
