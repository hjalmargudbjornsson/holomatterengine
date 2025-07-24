// Holographic Periodic Table AI Engine Interface — with Export Tools
// ... [imports and existing code remain unchanged]

import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import { useState } from 'react';
import ElementPicker from './ElementPicker';
import MoleculeBuilder from './MoleculeBuilder';
import { calculateMoleculeScore } from '../utils/calculateScore';
import { Button } from '@/components/ui/button';

function exportToCSV(atoms, score) {
  let csv = 'Element,Atomic Number,Battery,Aerospace,Biochem\n';
  atoms.forEach(atom => {
    csv += `${atom.symbol},${atom.number},${atom.battery},${atom.aerospace},${atom.biochem}\n`;
  });
  csv += '\n--- Simulated Properties ---\n';
  for (let key in score) {
    csv += `${key},${score[key]}\n`;
  }
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'molecule_simulation.csv');
}

function exportToPDF(atoms, score) {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text("Molecule Simulation Report", 20, 20);
  doc.text("\nSelected Atoms:", 20, 30);
  atoms.forEach((atom, index) => {
    doc.text(`${atom.symbol} (#${atom.number}) - Battery: ${atom.battery}, Aerospace: ${atom.aerospace}, Biochem: ${atom.biochem}`, 20, 40 + index * 10);
  });
  const offset = 50 + atoms.length * 10;
  doc.text("\nSimulated Properties:", 20, offset);
  let line = offset + 10;
  for (let key in score) {
    doc.text(`${key}: ${score[key]}`, 20, line);
    line += 10;
  }
  doc.save("molecule_simulation.pdf");
}

export default function EngineUI() {
  const [selectedAtoms, setSelectedAtoms] = useState([]);
  const addAtom = (atom) => setSelectedAtoms(prev => [...prev, atom]);
  const score = calculateMoleculeScore(selectedAtoms);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">🧪 Build a Molecule</h1>
      <ElementPicker onSelect={addAtom} />
      <MoleculeBuilder selectedAtoms={selectedAtoms} />
      {score && (
        <div className="mt-4 bg-white p-2 rounded shadow">
          <p><strong>Battery Score:</strong> {score.battery}</p>
          <p><strong>Aerospace Score:</strong> {score.aerospace}</p>
          <p><strong>Biochem Score:</strong> {score.biochem}</p>
          <p><strong>Simulated Density:</strong> {score.density}</p>
          <p><strong>Simulated Stability:</strong> {score.stability}</p>
          <p><strong>Simulated Conductivity:</strong> {score.conductivity}</p>
          <p><strong>Simulated Reactivity:</strong> {score.reactivity}</p>
          <div className="flex gap-2 mt-4">
            <Button onClick={() => exportToCSV(selectedAtoms, score)}>Export as CSV</Button>
            <Button onClick={() => exportToPDF(selectedAtoms, score)}>Export as PDF</Button>
          </div>
        </div>
      )}
    </div>
  );
}
