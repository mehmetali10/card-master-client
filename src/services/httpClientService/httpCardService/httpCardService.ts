import HttpService from '../httpClientService';
import { ICard } from '../../../models/Card';

class CardService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public async getCards(): Promise<ICard[]> {
    return this.httpService.get<ICard[]>('/cards');
  }

  public async getCardById(id: number): Promise<ICard> {
    return this.httpService.get<ICard>(`/cards/${id}`);
  }

  public async addCard(card: ICard): Promise<ICard> {
    return this.httpService.post<ICard>('/cards', card);
  }

  public async updateCard(card: ICard): Promise<ICard> {
    return this.httpService.put<ICard>(`/cards`, card);
  }

  public async deleteCard(id: number): Promise<void> {
    return this.httpService.delete<void>(`/cards/${id}`);
  }
}

export default CardService;
