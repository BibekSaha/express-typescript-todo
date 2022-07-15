export class ResponseMessage<T> {
  status = 'success';
  timestamp = Date.now();

  constructor(
    public data: T
  ) {
    if (!this.data)
      this.status = 'fail';
  }

  static build<T>(data: T) {
    return new ResponseMessage(data);
  }
}
