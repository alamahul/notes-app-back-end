class ClientError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'ClientError';
    this.statusCode = status;
    this.status = status;
  }
}

export default ClientError;