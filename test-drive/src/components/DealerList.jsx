import DealerCard from './DealerCard';

export default function DealerList({ dealers, onSelect }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 20,
      }}
    >
      {dealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} onSelect={onSelect} />
      ))}
    </div>
  );
}
