import { Link } from 'react-router-dom';
import "../choicePers/ChoicePers.css"
import { useContext } from 'react';
import { PersContext } from '../contexts/persProvider';

export default function ChoicePers() {
  
  
    let listaPers = [

        {
            image: "/assets/cobraComLingua.svg",
            name: "COBRONA",
            colorBody:""
        },
        {
            image: "/assets/cabecaRato.svg",
            name: "RATÃO",
            colorBody:""
        },
        {
            image: "/assets/macacoCompleto.svg",
            name: "GORILÃO",
            colorBody:""
        }

    ]
  
    const pers = useContext(PersContext);

    return (
    <>
      <div className="screen">
        {
            listaPers.map((item,index) =>{
                return (
                    <Link to={`/game`} key={index} onClick={() => pers.setPers(item.name)}>
                        <div className="abovePersDiv">
                            <img src={item.image} className='pers'/>

                            {item.name && <p>{item.name}</p>}
                        </div>
                    </Link>
                )
            })
        }
      </div>
    </>
  );
}
