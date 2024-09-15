import "./App.css";
import DataDisplay from "./components/DataDisplay";
import DataDisplay_pok from "./components/DataDisplay_pok";
import PokemonTable from "./components/PokemonTable";

function App() {
  return (
    <div>
      <h1>Pokémon</h1>

      <DataDisplay />
      <PokemonTable />
      <DataDisplay_pok/>
    </div>
  );
}

export default App;