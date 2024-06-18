export interface ApiResponse {
  status: 'ok' | 'error'
}

export interface PingStatus extends ApiResponse {
  where: string
}

export interface ReqStatus extends ApiResponse {
  error: string
}
