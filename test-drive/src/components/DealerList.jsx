import DealerCard from './DealerCard';

export default function DealerList({ dealers, onSelect }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 20,
        marginTop: '30px',
        marginBottom: '30px',
      }}
    >
      {dealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} onSelect={onSelect} />
      ))}
    </div>
  );
}
