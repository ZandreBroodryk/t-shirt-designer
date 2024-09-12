import "./App.css";
import ShirtCanvas from "./components/molecules/shirt-canvas";

function App() {
  return (
    <div className="flex flex-col flex-grow h-screen min-w-full min-h-full bg-neutral-300">
      <ShirtCanvas />
    </div>
  );
}

export default App;
