import { Card, CardContent, Typography } from '@mui/material';

export default function CarSelect({ cars, onSelect }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
      {cars.map((car) => (
        <Card
          key={car.id}
          onClick={() => onSelect(car)}
          style={{
            width: 150,
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <CardContent>
            {/* поки без картинки */}
            <Typography>{car.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
