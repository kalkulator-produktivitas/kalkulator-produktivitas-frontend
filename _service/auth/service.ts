// An example of using 'request' function

import { request } from "_service/http/request";
import { ApiSuccessResponse } from "_service/http/schema";
import { LoginResponse } from "./interface";

export const login = (username: string, password: string): Promise<ApiSuccessResponse<LoginResponse>> => {
  return request({
    url: '/auth/login',
    method: 'POST',
    body: { username, password }
  })
}