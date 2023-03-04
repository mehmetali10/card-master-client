// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import CreateCard from "./components/CreateCard";
import Card from "./components/Card";
import HttpService from "./services/httpClientService/httpService";
import { ICard } from "./models/ICard";
import CardService from "./services/httpClientService/httpCardService/httpCardService";


function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  
  useEffect(()=> {
    const fetchCards = async () => {
      const httpService = new HttpService("http://localhost:8000")
      const cardService = new CardService(httpService)
      const promise = cardService.getCards();
      promise.then(result => {
        const data = result.data;
        console.log(result);
        setCards(data)
      })
      
    }
    fetchCards();
  }, [])
  return (
    <>
      <CreateCard /> 
      {cards.map((card) => (
        <Card key={card.id} title={card.title} description={card.description} isStarred={card.isStarred} dateCreated={card.dateCreated} imgUri="https://lavinya.net/wp-content/uploads/2022/11/4c62ba-manzara-gol-lake-landscape-scaled.jpeg" />
      ))}
    </>
  );
}

export default App;
