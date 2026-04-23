import { Card, CardContent, Typography } from '@mui/material';

export default function CarSelect({ cars, onSelect }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
      }}
    >
      {cars
        .filter((car) => car.isTestDriveAvailable)
        .map((car) => (
          <Card
            key={car.id}
            onClick={() => onSelect(car)}
            elevation={0}
            style={{
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: 'none',
              border: 'none',
            }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{
                width: '100%',
                height: 150,
                objectFit: 'contain',
              }}
            />

            <CardContent>
              <Typography style={{ fontWeight: '700' }}>{car.name}</Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
