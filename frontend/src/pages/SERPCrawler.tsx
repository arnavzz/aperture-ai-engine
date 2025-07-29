import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Search, ExternalLink, Loader2, TrendingUp, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import { serpAPI, SERPResponse } from '../services/api'

interface FormData {
  query: string
}

export default function SERPCrawler() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<SERPResponse['results'] | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await serpAPI.crawl(data.query)
      setResults(response.results)
      toast.success('SERP data retrieved successfully!')
    } catch (error) {
      console.error('Error crawling SERP:', error)
      toast.error('Failed to retrieve SERP data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">SERP Crawler</h1>
        <p className="text-secondary-600 mt-2">Analyze search engine results for content gaps and opportunities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Search Query</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search Query
              </label>
              <input
                type="text"
                {...register('query', { required: 'Search query is required' })}
                placeholder="Enter your search query..."
                className="input-field"
              />
              {errors.query && (
                <p className="text-red-600 text-sm mt-1">{errors.query.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Crawling...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Crawl SERP
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Search Results</h2>
            {results ? (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="border border-secondary-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded">
                            #{result.position}
                          </span>
                          <h3 className="font-semibold text-secondary-900 line-clamp-2">
                            {result.title}
                          </h3>
                        </div>
                        <p className="text-sm text-secondary-600 mb-2 line-clamp-3">
                          {result.snippet}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-secondary-500">
                          <span>{result.url}</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {result.ctr}% CTR
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                          title="Visit URL"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-secondary-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
                <p>Enter a search query to see results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 