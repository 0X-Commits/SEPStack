export class SepError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = 'SepError';
  }
}

export class SepAuthError extends SepError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
    this.name = 'SepAuthError';
  }
}

export class SepNotFoundError extends SepError {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'SepNotFoundError';
  }
}
