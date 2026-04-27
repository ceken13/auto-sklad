import DealerCard from './DealerCard';

export default function DealerList({ dealers, onSelect }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: 10,
        marginTop: '10px',
        marginBottom: '10px',
      }}
    >
      {dealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} onSelect={onSelect} />
      ))}
    </div>
  );
}
