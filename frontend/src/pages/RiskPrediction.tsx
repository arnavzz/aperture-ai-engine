import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Shield, AlertTriangle, CheckCircle, Loader2, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { riskPredictionAPI, PredictRequest, PredictResponse } from '../services/api'

interface FormData {
  aio_length: number
  organic_rank: number
  snippet_richness: number
  device_type: string
  query_intent: string
  brand_flag: boolean
}

const deviceTypeOptions = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'tablet', label: 'Tablet' },
]

const queryIntentOptions = [
  { value: 'informational', label: 'Informational' },
  { value: 'navigational', label: 'Navigational' },
  { value: 'transactional', label: 'Transactional' },
  { value: 'commercial', label: 'Commercial' },
]

export default function RiskPrediction() {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictResponse | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      aio_length: 0,
      organic_rank: 1,
      snippet_richness: 0,
      device_type: 'desktop',
      query_intent: 'informational',
      brand_flag: false,
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await riskPredictionAPI.predict(data)
      setPrediction(response)
      toast.success('Risk assessment completed!')
    } catch (error) {
      console.error('Error predicting risk:', error)
      toast.error('Failed to assess risk. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskLevel = (risk: number) => {
    if (risk < 0.3) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' }
    if (risk < 0.7) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const getCTRLevel = (ctr: number) => {
    if (ctr > 0.1) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (ctr > 0.05) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (ctr > 0.02) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { level: 'Poor', color: 'text-red-600', bg: 'bg-red-100' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Risk Prediction</h1>
        <p className="text-secondary-600 mt-2">Assess content risks and CTR predictions for your pages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Content Parameters</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                AIO Length
              </label>
              <input
                type="number"
                step="0.1"
                {...register('aio_length', { 
                  required: 'AIO length is required',
                  min: { value: 0, message: 'AIO length must be positive' }
                })}
                className="input-field"
              />
              {errors.aio_length && (
                <p className="text-red-600 text-sm mt-1">{errors.aio_length.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Organic Rank
              </label>
              <input
                type="number"
                min="1"
                max="100"
                {...register('organic_rank', { 
                  required: 'Organic rank is required',
                  min: { value: 1, message: 'Rank must be at least 1' },
                  max: { value: 100, message: 'Rank must be at most 100' }
                })}
                className="input-field"
              />
              {errors.organic_rank && (
                <p className="text-red-600 text-sm mt-1">{errors.organic_rank.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Snippet Richness
              </label>
              <input
                type="number"
                min="0"
                max="10"
                {...register('snippet_richness', { 
                  required: 'Snippet richness is required',
                  min: { value: 0, message: 'Snippet richness must be positive' },
                  max: { value: 10, message: 'Snippet richness must be at most 10' }
                })}
                className="input-field"
              />
              {errors.snippet_richness && (
                <p className="text-red-600 text-sm mt-1">{errors.snippet_richness.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Device Type
              </label>
              <select
                {...register('device_type', { required: 'Device type is required' })}
                className="input-field"
              >
                {deviceTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.device_type && (
                <p className="text-red-600 text-sm mt-1">{errors.device_type.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Query Intent
              </label>
              <select
                {...register('query_intent', { required: 'Query intent is required' })}
                className="input-field"
              >
                {queryIntentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.query_intent && (
                <p className="text-red-600 text-sm mt-1">{errors.query_intent.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('brand_flag')}
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm font-medium text-secondary-700">Brand Query</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 mr-2" />
                  Assess Risk
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Risk Assessment</h2>
          {prediction ? (
            <div className="space-y-6">
              {/* AIO Risk */}
              <div className="border border-secondary-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-secondary-900">AIO Risk Score</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevel(prediction.aio_risk).bg} ${getRiskLevel(prediction.aio_risk).color}`}>
                    {getRiskLevel(prediction.aio_risk).level}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-secondary-600 mb-1">
                    <span>Risk Level</span>
                    <span>{(prediction.aio_risk * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getRiskLevel(prediction.aio_risk).color.replace('text-', 'bg-')}`}
                      style={{ width: `${prediction.aio_risk * 100}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-secondary-600">
                  {prediction.aio_risk < 0.3 
                    ? 'Low risk of AIO detection. Content appears natural.'
                    : prediction.aio_risk < 0.7
                    ? 'Medium risk detected. Consider reviewing content structure.'
                    : 'High risk of AIO detection. Immediate review recommended.'
                  }
                </p>
              </div>

              {/* CTR Prediction */}
              <div className="border border-secondary-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-secondary-900">CTR Prediction</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getCTRLevel(prediction.ctr_pred).bg} ${getCTRLevel(prediction.ctr_pred).color}`}>
                    {getCTRLevel(prediction.ctr_pred).level}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-secondary-600 mb-1">
                    <span>Predicted CTR</span>
                    <span>{(prediction.ctr_pred * 100).toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getCTRLevel(prediction.ctr_pred).color.replace('text-', 'bg-')}`}
                      style={{ width: `${Math.min(prediction.ctr_pred * 1000, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm text-secondary-600">
                  {prediction.ctr_pred > 0.1 
                    ? 'Excellent click-through rate expected.'
                    : prediction.ctr_pred > 0.05
                    ? 'Good click-through rate predicted.'
                    : prediction.ctr_pred > 0.02
                    ? 'Fair click-through rate. Room for improvement.'
                    : 'Low click-through rate expected. Consider optimization.'
                  }
                </p>
              </div>

              {/* Recommendations */}
              <div className="border border-secondary-200 rounded-lg p-4">
                <h3 className="font-semibold text-secondary-900 mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {prediction.aio_risk > 0.5 && (
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary-700">
                        Consider reducing AIO length and improving content structure
                      </p>
                    </div>
                  )}
                  {prediction.ctr_pred < 0.05 && (
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary-700">
                        Optimize title and meta description for better CTR
                      </p>
                    </div>
                  )}
                  {prediction.aio_risk < 0.3 && prediction.ctr_pred > 0.05 && (
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-secondary-700">
                        Content appears well-optimized for both risk and CTR
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-secondary-500">
              <Shield className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
              <p>Risk assessment results will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 