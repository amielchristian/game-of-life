import { useEffect, useState, useRef } from 'preact/hooks';
import './app.css';
import { Universe, Cell } from './pkg';
import { memory } from './pkg/game_of_life_bg.wasm';

const cellSize = 5;
const universe = Universe.new();
const height = universe.height();
const width = universe.width();
export function App() {
  const [count, setCount] = useState<number>(0);
  const [cells, setCells] = useState(
    new Uint8Array(memory.buffer, universe.cells(), width * height)
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function getIndex(row: number, column: number) {
    return row * width + column;
  }

  function drawGrid(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.strokeStyle = '#cccccc';

    for (let i = 0; i <= width; i++) {
      context.moveTo(i * (cellSize + 1) + 1, 0);
      context.lineTo(i * (cellSize + 1) + 1, (cellSize + 1) * height + 1);
    }

    for (let i = 0; i <= height; i++) {
      context.moveTo(0, i * (cellSize + 1) + 1);
      context.lineTo((cellSize + 1) * width + 1, i * (cellSize + 1) + 1);
    }

    context.stroke();
  }

  function drawCells(context: CanvasRenderingContext2D) {
    context.beginPath();

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        const index = getIndex(i, j);

        context.fillStyle = cells[index] === Cell.Dead ? '#ffffff' : '#000000';
        context.fillRect(
          j * (cellSize + 1) + 1,
          i * (cellSize + 1) + 1,
          cellSize,
          cellSize
        );
      }
    }

    context.stroke();
  }

  useEffect(() => {
    universe.tick();
    setCount(count + 1);

    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas !== null) {
      canvas.height = (cellSize + 1) * height + 1;
      canvas.height = (cellSize + 1) * width + 1;

      const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (context) {
        drawGrid(context);
        drawCells(context);
      }
    }

    setCells(new Uint8Array(memory.buffer, universe.cells(), width * height));
  }, [cells]);

  return (
    <>
      {/* <pre>{universeString}</pre> */}
      <canvas ref={canvasRef}></canvas>
      <div>{count}</div>
    </>
  );
}
