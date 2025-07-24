
export default function MoleculeBuilder({ selectedAtoms }) {
  return (
    <div>
      <h2>Selected Atoms:</h2>
      <ul>
        {selectedAtoms.map((atom, i) => (
          <li key={i}>{atom.symbol}</li>
        ))}
      </ul>
    </div>
  );
}
