// import React from "react";
import "./PokemonTable.css"; // Import CSS for styling

const PokemonTable = () => {
  const pokemonList = [
    {
      englishName: "bulbasaur",
      japaneseName: "fushigidane",
      jpPronounce: "ฟุชิงิดาเนะ",
    },
    {
      englishName: "ivysaur",
      japaneseName: "fushigisou",
      jpPronounce: "ฟุชิงิโซ",
    },
    {
      englishName: "venusaur",
      japaneseName: "fushigibana",
      jpPronounce: "ฟุชิงิบานะ",
    },
    {
      englishName: "charmander",
      japaneseName: "hitokage",
      jpPronounce: "ฮิโตคาเงะ",
    },
    // Add more Pokémon here...
  ];

  return (
    <div className="table-container">
      <h2>Pokémon Name List</h2>
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>English Name</th>
            <th>Japanese Name</th>
            <th>Japanese Pronunciation</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.map((pokemon, index) => (
            <tr key={index}>
              <td>{pokemon.englishName}</td>
              <td>{pokemon.japaneseName}</td>
              <td>{pokemon.jpPronounce}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTable;
