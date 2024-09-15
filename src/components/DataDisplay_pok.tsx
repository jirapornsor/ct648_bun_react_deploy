import { useState, useEffect } from "react";
import axios from "axios";
import "./DataDisplay_pok.css"; // Import CSS for styling

interface PokemonData {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
  };
}

const DataDisplay_pok = () => {
  const [data, setData] = useState<PokemonData | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("pikachu");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (name: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pokemonName);
  }, [pokemonName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(pokemonName.toLowerCase());
  };

  return (
    <div className="container">
      <h2 className="title">Pokémon Info</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name"
          className="input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : data ? (
        <div className="pokemon-card">
          <h3 className="pokemon-name">{data.name}</h3>
          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="pokemon-image"
          />
          <ul className="pokemon-stats">
            <li>Height: {data.height} decimetres</li>
            <li>Weight: {data.weight} hectograms</li>
            <li>Base Experience: {data.base_experience}</li>
          </ul>
        </div>
      ) : (
        <div className="error-message">No data found</div>
      )}
    </div>
  );
};

export default DataDisplay_pok;
