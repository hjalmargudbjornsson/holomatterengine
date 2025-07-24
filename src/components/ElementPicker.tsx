
export default function ElementPicker({ onSelect }) {
  const mockElements = [
    { symbol: 'H', number: 1, battery: 3, aerospace: 4, biochem: 5 },
    { symbol: 'He', number: 2, battery: 2, aerospace: 1, biochem: 1 },
  ];
  return (
    <div>
      <h2>Select Elements:</h2>
      {mockElements.map(atom => (
        <button key={atom.symbol} onClick={() => onSelect(atom)}>{atom.symbol}</button>
      ))}
    </div>
  );
}
