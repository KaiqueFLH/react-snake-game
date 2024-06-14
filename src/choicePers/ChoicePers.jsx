import { Link } from "react-router-dom";
import "../choicePers/ChoicePers.css";
import { useContext } from "react";
import { PersContext } from "../contexts/persProvider";

export default function ChoicePers() {
  let listaPers = [
    {
      image: "/assets/cobraComLingua.svg",
      name: "COBRÃO",
      colorBody: "#2A4825",
      food: "/assets/maca.png",
    },
    {
      image: "/assets/cabecaRato.svg",
      name: "RATÃO",
      colorBody: "#6E5D5D",
      food: "/assets/queijin.png",
    },
    {
      image: "/assets/macacoCompleto.svg",
      name: "PRETÃO",
      colorBody: "#E5A66C",
      food: "/assets/banana.png",
    },
  ];

  const pers = useContext(PersContext);

  return (
    <>
      <div className="screen">
        {listaPers.map((item, index) => {
          return (
            <Link
              to={`/game`}
              key={index}
              onClick={() =>
                pers.setPers({
                  image: item.image,
                  name: item.name,
                  colorBody: item.colorBody,
                })
              }
            >
              <div className="abovePersDiv">
                <img src={item.image} className="pers" />

                {item.name && <p>{item.name}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
