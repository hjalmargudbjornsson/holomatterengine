
export function calculateMoleculeScore(atoms) {
  const battery = atoms.length * 2;
  const aerospace = atoms.length * 1.5;
  const biochem = atoms.length * 1.2;
  const density = atoms.length * 0.8;
  const stability = 100 - atoms.length * 3;
  const conductivity = atoms.length * 0.7;
  const reactivity = Math.max(0, 100 - stability + Math.random() * 10);
  return { battery, aerospace, biochem, density, stability, conductivity, reactivity };
}
