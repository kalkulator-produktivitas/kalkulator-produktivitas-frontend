import { ErrorApiResponse, ErrorUnauthorized } from "./schema";

export const API_BASE_URL: string = process.env.API_BASE_URL || 'http://localhost:8000';
export const USER_AUTH_LOCAL_KEY: string = 'auth';
export const ADMIN_AUTH_LOCAL_KEY: string = 'admin';

export const getAuthToken = (): string => {
  try {
    const local = localStorage.getItem(USER_AUTH_LOCAL_KEY);
    if (!local) return '';

    // TODO: should be changed to only storing JWT token
    return (JSON.parse(local).token as string).replace("Bearer ", "");
  } catch(e) {
    return '';
  }
}

export interface RequestOptions {
  url: string; // no need to include API_BASE_URL
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any; // body, if present, should be an object in methods other than GET
  additionalHeaders?: { [key: string]: string };
  skipAuthToken?: boolean;
}

export const request = async(options: RequestOptions) => {
  let fullUrl: string = API_BASE_URL;
  if (!fullUrl.endsWith('/')) {
    fullUrl += '/'
  }
  let path = options.url;
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  fullUrl = API_BASE_URL + options.url;

  if (options.url.includes('http') || options.url.includes('https')) {
    fullUrl = options.url;
  }
  let withAuth: boolean = !!options.skipAuthToken;

  // Preparing HTTP request with auth
  const token = getAuthToken();
  let opts: HeadersInit = {
    method: options.method ?? 'GET',
    ...options.additionalHeaders,
  };
  if (withAuth && token) {
    opts['Authorization'] = `Bearer ${token}`
  }
  if (options.body) {
    opts.body = JSON.stringify(options.body);
  }

  const httpResponse = await fetch(fullUrl, opts);

  // Always throw error whenever HTTP response status >= 400
  if (httpResponse.status >= 400) {
    // Special case loging out user
    if (httpResponse.status === 401) {
      throw new ErrorUnauthorized("Unauthorized")
    }
    const errorBody = await httpResponse.json();
    throw new ErrorApiResponse(errorBody);
  }

  // Return JSON body
  const body = await httpResponse.json();
  return body;
}