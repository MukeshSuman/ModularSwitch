import "./App.css";
import ModularSwitchBox from "./components/ModularSwitchBox";
import Module from "./components/Module";

export default function App() {
  return (
    <main>
      <ModularSwitchBox>
        <Module />
      </ModularSwitchBox>
    </main>
  );
}
