// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import CreateCard from "./components/CreateCard";
import Card from "./components/Card";
import HttpService from "./services/httpClientService/httpService";
import { ICard } from "./models/ICard";
import CardService from "./services/httpClientService/httpCardService/httpCardService";


function App() {
  const [cards, setCards] = useState<ICard[]>([]);
  const [renderCount, setRenderCount] = useState(0);

  
  useEffect(()=> {
    const fetchCards = async () => {
      const httpService = new HttpService("http://localhost:8000")
      const cardService = new CardService(httpService)
      const promise = cardService.getCards();
      promise.then(result => {
        const data = result.data;
        setCards(data)
      })
    }
    fetchCards();
  }, [renderCount])

  async function deletecard(id: number) {
    const httpService = new HttpService("http://localhost:8000")
      const cardService = new CardService(httpService)
      await cardService.deleteCard(id)
      console.log(id)
      setCards((prevCards) => prevCards.filter((card) => card.id !== id))
  }

  function handleChildClick() {
    setRenderCount(renderCount + 1)
  }

  return (
    <>
      <CreateCard onChildClick={handleChildClick}/> 
      {cards.map((card) => (
        <Card 
          key={card.id} 
          id={card.id} 
          title={card.title} 
          description={card.description} 
          isStarred={card.isStarred} 
          dateCreated={card.dateCreated} 
          imgUri="https://lavinya.net/wp-content/uploads/2022/11/4c62ba-manzara-gol-lake-landscape-scaled.jpeg"
          onDeleteClick = {deletecard}
          />
      ))}
    </>
  );
}

export default App;
