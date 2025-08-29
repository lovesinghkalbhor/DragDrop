import "./App.css";
import DragAndDrop from "./components/Dragdrop";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <DragAndDrop></DragAndDrop>
      {/* <DragAndDrop></DragAndDrop> */}
    </ToastProvider>
  );
}

export default App;
