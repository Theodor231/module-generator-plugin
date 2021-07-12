import APIModel from "../APIModel";

export default class Banks extends APIModel {
  private readonly resourceUrl: string;

  constructor() {
    super();
    this.resourceUrl = "<%= lowerCase(name) %>";
  }

  async getData(params: object): Promise<any> {
    return await this.http.get(`${this.resourceUrl}`, params);
  }

  async getForEdit(id: number): Promise<any> {
    return await this.http.get(`${this.resourceUrl}/${id}/edit`);
  }

  async getList(): Promise<any> {
    return await this.http.get(`${this.resourceUrl}/list`, {});
  }

  async edit(id: number, payload: object): Promise<any> {
    return await this.http
      .ignoreErrorHandler(422)
      .post(`${this.resourceUrl}/${id}?_method=PATCH`, payload);
  }

  async create(payload: any): Promise<any> {
    return await this.http
      .ignoreErrorHandler(422)
      .post(`${this.resourceUrl}`, payload);
  }

  async delete(id: any): Promise<any> {
    return await this.http.delete(`${this.resourceUrl}`, { id });
  }
}
