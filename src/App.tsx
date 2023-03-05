// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from "react";
import CreateCard from "./components/CreateCard";
import Card from "./components/Card";
import HttpService from "./services/httpClientService/httpService";
import { ICardEffect } from "./models/ICard";
import CardService from "./services/httpClientService/httpCardService/httpCardService";
import { storage } from "./services/firebase/firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";


function App() {
  const [cards, setCards] = useState<ICardEffect[]>([]);
  const [urls, setUrls] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const imagesListRef = ref(storage, "images/");
  
  useEffect(()=> {
    const fetchCards = async () => {
      const httpService = new HttpService("http://localhost:8000")
      const cardService = new CardService(httpService)
      const promise = cardService.getCards();
      promise.then(result => {
        const data = result.data;
        Promise.all(data.map((item: ICardEffect) => {
          const fileRef = ref(imagesListRef, `${item.imgUri}`);
          return getDownloadURL(fileRef);
        })).then((urls) => {
          var theEnd : ICardEffect[];
          theEnd = data.map((item: ICardEffect, index) => ({
            ...item,
            downloadedUri: urls[index]
          }));
          setCards(theEnd)
        })
      })
    }
    fetchCards();
  }, [imagesListRef, renderCount])

  async function deletecard(id: number) {
    const httpService = new HttpService("http://localhost:8000")
      const cardService = new CardService(httpService)
      await cardService.deleteCard(id)
      console.log(id)
      setCards((prevCards) => prevCards.filter((card) => card.id !== id))
      setRenderCount(renderCount + 1)
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
          downloadedUri={card.downloadedUri}
          onDeleteClick = {deletecard}
          />
      ))}
    </>
  );
}

export default App;
