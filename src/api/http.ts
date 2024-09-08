import { API_URL } from 'react-native-dotenv';

/**
 * Generate HTTP headers
 */
const getHeader = async (headers = new Headers(), hasFiles = false): Promise<Headers> => {
  const defaultHeaders = new Headers();

  defaultHeaders.append('Accept', 'application/json');
  defaultHeaders.append('Content-Type', 'application/json');

  if (headers) {
    headers.forEach((value: string, key: string) => defaultHeaders.append(key, value));
  }

  if (hasFiles) {
    defaultHeaders.delete('Content-Type');
  }

  return defaultHeaders;
};

/**
 * Generate HTTP body
 */
const getBody = (body?: unknown, hasFiles = false) => (hasFiles ? body : JSON.stringify(body));

export class ApiResponseError extends Error {
  code = 400;

  constructor(message: string, code = 400) {
    super(message || 'Oops! Something went wrong');
    this.name = 'ApiResponseError';
    this.code = code;
  }
}

type ErrorResponse = {
  message?: string;
  code?: number;
};

/**
 * Handle HTTP error
 */
const handleError = (httpStatusCode: number, response: ErrorResponse) => {
  if (!/^(2|3)[0-9][0-9]$/.test(String(httpStatusCode))) {
    console.log(response)
    throw new ApiResponseError(
      response?.message || 'Something went wrong!!',
      httpStatusCode ?? 501,
    );
  }
};

/**
 * Generate Request URL
 */
const getURL = (url: string, options: { baseURL?: string; isMockedURL?: boolean }) => {
  const baseURL = options?.baseURL ? options.baseURL : API_URL;

  return baseURL + url;
};

type HTTPOptions = {
  baseURL?: string;
  isMockedURL?: boolean;
  headers?: Headers;
  hasFiles?: boolean;
};

/**
 * HTTP POST Request
 */
const fetchPost = async <T extends ErrorResponse>(
  url: string,
  body?: unknown,
  options?: HTTPOptions,
) => {
  const result = await fetch(
    getURL(url, { isMockedURL: options?.isMockedURL, baseURL: options?.baseURL }),
    {
      method: 'POST',
      headers: await getHeader(options?.headers, options?.hasFiles),
      body: getBody(body, options?.hasFiles) as BodyInit_,
    },
  );

  const response: T = await result.json();

  handleError(result.status, response);

  return response;
};

const http = {
  post: fetchPost,
};

export default http;
