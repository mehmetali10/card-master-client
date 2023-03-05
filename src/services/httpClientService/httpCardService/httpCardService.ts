import HttpService from '../httpService';
import { ICard, GetCardResult, IGetCardById2, IGetCardById } from '../../../models/ICard';

class CardService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public async getCards(): Promise<GetCardResult> {
    return this.httpService.get<GetCardResult>('/cards');
  }

  public async getCardById(id: number): Promise<ICard> {
    const headers = { 'id': id.toString() };
    return this.httpService.get<ICard>(`/cards/${id}`, {headers});
  }

  public async getCardById2(id: number): Promise<IGetCardById2> {
    const headers = { 'id': id.toString() };
    return this.httpService.get<IGetCardById2>(`/cards/${id}`, {headers});
  }

  public async addCard(card: ICard): Promise<ICard[]> {
    return this.httpService.post<ICard[]>('/cards', card);
  }

  public async updateCard(card: IGetCardById | undefined): Promise<IGetCardById> {
    return this.httpService.put<IGetCardById>(`/cards`, card);
  }

  public async deleteCard(id: number): Promise<void> {
    const headers = { 'id': id.toString() };
    return this.httpService.delete<void>(`/cards/${id}`, { headers });
  }
}

export default CardService;
