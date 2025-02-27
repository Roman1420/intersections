export class TokenStorageService {
  static saveToken(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static getToken(key: string) {
    const token = localStorage.getItem(key);
    return token ? JSON.parse(token) : token;
  }
  static deleteToken(key: string) {
    localStorage.removeItem(key);
  }
}

export default new TokenStorageService();
