import axios, { type AxiosResponse } from 'axios';
import UriTemplate from 'es6-url-template';
import { type IObject } from '@/interfaces/IObject';
import { EApiResourceNames } from '@/enums/EApiResourceNames';
import { BASE_PROTOCOL } from '@/constants/api';

class ApiService {
  constructor() {}

  /**
   * Отправить GET запрос
   * @throws {Error} Если при отправке GET запроса произошла ошибка
   */
  async get(
    link: string,
    headers?: IObject,
    params?: IObject,
    signal?: AbortSignal
  ): Promise<AxiosResponse> {
    return await axios
      .get(
        link,
        {
          headers: headers,
          params: params,
          ...(
            signal
              ? {signal: signal}
              : {}
          )
        }
      )
      .then((response: AxiosResponse) => this.handleResponseError(response))
      .then((response: AxiosResponse) => response);
  }

  /**
   * Отправить GET запрос для скачивания
   * @throws {Error} Если при отправке GET запроса произошла ошибка
   */
  async getBlob(
    link: string,
    headers?: IObject
  ): Promise<AxiosResponse> {
    return await axios
      .get(
        link,
        {
          headers: headers,
          responseType: 'blob'
        }
      )
      .then((response: AxiosResponse) => this.handleResponseError(response))
      .then((response: AxiosResponse) => response);
  }

  /**
   * Отправить POST запрос
   * @throws {Error} Если при отправке POST запроса произошла ошибка
   */
  async post(
    link: string,
    data: unknown,
    headers?: IObject,
    signal?: AbortSignal
  ): Promise<AxiosResponse> {
    return await axios
      .post(
        link,
        data,
        {
          headers: headers ?? {},
          ...(
            signal
              ? {signal: signal}
              : {}
          )
        }
      )
      .then((response: AxiosResponse) => this.handleResponseError(response))
      .then((response: AxiosResponse) => response);
  }

  /**
   * Отправить PUT запрос
   * @throws {Error} Если при отправке PUT запроса произошла ошибка
   */
  async put(
    link: string,
    data: unknown,
    headers?: IObject,
    signal?: AbortSignal
  ): Promise<AxiosResponse> {
    return await axios
      .put(
        link,
        JSON.stringify(data),
        {
          headers: headers ?? {},
          ...(
            signal
              ? {signal: signal}
              : {}
          )
        }
      )
      .then((response: AxiosResponse) => this.handleResponseError(response))
      .then((response: AxiosResponse) => response.data);
  }

  /**
   * Отправить DELETE запрос
   * @throws {Error} Если при отправке DELETE запроса произошла ошибка
   */
  async delete(
    link: string,
    headers?: IObject
  ): Promise<AxiosResponse | undefined> {
    return await axios
      .delete(link, {
        headers: headers ?? {},
      })
      .then((response: AxiosResponse) => this.handleResponseError(response));
  }

  /**
   * Исправить протокол ссылки
   * @param link
   */
  private async getLinkWithProtocol(link: string): Promise<string> {
    const getProtocol = (link: string) =>
      new RegExp('^(http?):.*?', 'g').exec(link)?.[1];
    const apiProtocol: string = getProtocol(BASE_PROTOCOL) || '';
    const linkProtocol: string = getProtocol(link) || '';

    if (!linkProtocol) {
      return `${apiProtocol}:${link}`;
    }

    return linkProtocol === apiProtocol
      ? link
      : link.replace(new RegExp(`^${linkProtocol}:`, 'g'), `${apiProtocol}:`);
  }

  /**
   * Получить из response строку с ошибкой
   */
  private async handleResponseError(
    response: AxiosResponse
  ): Promise<AxiosResponse> {
    if (response.data || (response.status >= 200 && response.status < 300)) {
      return response;
    }

    throw new Error(response.data);
  }
}

export default new ApiService();
