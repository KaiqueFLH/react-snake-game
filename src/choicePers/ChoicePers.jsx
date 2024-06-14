import { Link } from 'react-router-dom';
import "../choicePers/ChoicePers.css"

export default function ChoicePers() {
  
  
    let listaPers = [

        {
            image: "/assets/cabeca.svg",
            name: "",
        },
        {
            image: "/assets/ratoCabeca.svg",
            name: "",
        },
        {
            image: "/assets/macacoCabeca.svg",
            name: "",
        }

    ]
  
    return (
    <>
      <div className="screen">
        {
            listaPers.map((item,index) =>{
                return <img className="pers" key={index} src={item.image} />
            })
        }
      </div>
    </>
  );
}
