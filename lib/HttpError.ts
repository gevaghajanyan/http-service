export class HttpError extends Error {
  public status: number;

  public statusText: string;

  public type: string;

  public url: string;

  constructor({
    status = 500,
    statusText = '',
    url = '',
    type = '',
  }) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.type = type;
  }

  static throw(response: Response) {
    if (!response.ok) {
      throw new HttpError(response);
    }
  }
}
