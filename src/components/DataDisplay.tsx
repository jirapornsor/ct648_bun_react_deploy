import { useState, useEffect } from "react";
import axios from "axios";
import "./DataDisplay.css"; // Import ไฟล์ CSS สำหรับการตกแต่ง
import pokemonImage from "../assets/pokemon.jpg"; // อัปเดตเส้นทางการนำเข้าถูกต้อง

interface JokeData {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

const DataDisplay = () => {
  const [data, setData] = useState<JokeData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      console.log("Fetched data:", response.data); // Log ข้อมูลที่ได้รับ
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // เรียกข้อมูลครั้งแรกเมื่อคอมโพเนนต์ถูกโหลด

    const intervalId = setInterval(() => {
      fetchData(); // เรียกข้อมูลทุก 10 วินาที
    }, 15000); // 10000 มิลลิวินาที = 10 วินาที

    return () => clearInterval(intervalId); // เคลียร์ interval เมื่อคอมโพเนนต์ถูก unmounted
  }, []);

  return (
    <div className="joke-container">
      <h2 className="title">Random Joke</h2>
      <img src={pokemonImage} alt="Pokemon" className="pokemon-image" />{" "}
      {/* รูปภาพโปเกมอน */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : data ? (
        <div className="joke-card">
          <h3 className="joke-type">{data.type} Joke</h3>
          <p className="setup">{data.setup}</p>
          <p className="punchline">{data.punchline}</p>
        </div>
      ) : (
        <div className="error-message">No data found</div>
      )}
    </div>
  );
};

export default DataDisplay;
