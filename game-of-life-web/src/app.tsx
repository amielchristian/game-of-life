import { useEffect, useState } from 'preact/hooks';
import './app.css';
import { Universe } from './pkg';

export function App() {
  // const [universe, setUniverse] = useState(wasm.Universe.new());
  let universe = Universe.new();
  let [universeString, setUniverseString] = useState<string>(universe.render());

  return (
    <>
      <pre id='canvas'>{universeString}</pre>
    </>
  );
}
