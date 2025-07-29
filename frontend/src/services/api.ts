import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Types
export interface AugmentRequest {
  page_url: string
  gap_query: string
  block_types: string[]
}

export interface AugmentResponse {
  page_url: string
  augmentations: Record<string, string>
}

export interface PredictRequest {
  aio_length: number
  organic_rank: number
  snippet_richness: number
  device_type: string
  query_intent: string
  brand_flag: boolean
}

export interface PredictResponse {
  aio_risk: number
  ctr_pred: number
}

export interface QARequest {
  page_url: string
  augmentation: Record<string, any>
  approved: boolean
  override_html?: string
}

export interface SERPResponse {
  results: Array<{
    title: string
    url: string
    snippet: string
    position: number
    ctr: number
  }>
}

// API functions
export const contentStudioAPI = {
  augment: async (data: AugmentRequest): Promise<AugmentResponse> => {
    const response = await api.post('/augment', data)
    return response.data
  },
}

export const riskPredictionAPI = {
  predict: async (data: PredictRequest): Promise<PredictResponse> => {
    const response = await api.post('/predict-risk', data)
    return response.data
  },
}

export const serpAPI = {
  crawl: async (query: string): Promise<SERPResponse> => {
    const response = await api.get('/crawl-serp', { params: { query } })
    return response.data
  },
}

export const qaAPI = {
  review: async (data: QARequest): Promise<{ status: string }> => {
    const response = await api.post('/qa-review', data)
    return response.data
  },
}

export default api 