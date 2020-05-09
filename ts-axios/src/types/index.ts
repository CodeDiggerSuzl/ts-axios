export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any // for get or head method
}

// method only to use the certain method
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
