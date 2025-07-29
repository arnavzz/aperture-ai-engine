import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Sparkles, Copy, Check, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { contentStudioAPI, AugmentRequest } from '../services/api'

interface FormData {
  page_url: string
  gap_query: string
  block_types: string[]
}

const blockTypeOptions = [
  { id: 'faq', label: 'FAQ Blocks', description: 'Frequently asked questions' },
  { id: 'mythfact', label: 'Myth vs Fact', description: 'Debunking common myths' },
  { id: 'howto', label: 'How-to Guides', description: 'Step-by-step instructions' },
]

export default function ContentStudio() {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Record<string, string> | null>(null)
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      block_types: ['faq', 'mythfact', 'howto']
    }
  })

  const selectedBlockTypes = watch('block_types')

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await contentStudioAPI.augment({
        page_url: data.page_url,
        gap_query: data.gap_query,
        block_types: data.block_types
      })
      setResults(response.augmentations)
      toast.success('Content augmentations generated successfully!')
    } catch (error) {
      console.error('Error generating augmentations:', error)
      toast.error('Failed to generate augmentations. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string, blockType: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedBlock(blockType)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopiedBlock(null), 2000)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Content Studio</h1>
        <p className="text-secondary-600 mt-2">Generate AI-powered content augmentations for your pages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Generate Augmentations</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Page URL
              </label>
              <input
                type="url"
                {...register('page_url', { required: 'Page URL is required' })}
                placeholder="https://example.com/page"
                className="input-field"
              />
              {errors.page_url && (
                <p className="text-red-600 text-sm mt-1">{errors.page_url.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Gap Query
              </label>
              <textarea
                {...register('gap_query', { required: 'Gap query is required' })}
                placeholder="Describe the content gap you want to fill..."
                rows={4}
                className="input-field"
              />
              {errors.gap_query && (
                <p className="text-red-600 text-sm mt-1">{errors.gap_query.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Block Types
              </label>
              <div className="space-y-2">
                {blockTypeOptions.map((option) => (
                  <label key={option.id} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option.id}
                      {...register('block_types')}
                      className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-secondary-900">{option.label}</p>
                      <p className="text-xs text-secondary-600">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              {errors.block_types && (
                <p className="text-red-600 text-sm mt-1">{errors.block_types.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || selectedBlockTypes.length === 0}
              className="btn-primary w-full flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Augmentations
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Generated Content</h2>
          {results ? (
            <div className="space-y-4">
              {Object.entries(results).map(([blockType, html]) => (
                <div key={blockType} className="border border-secondary-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-secondary-900 capitalize">
                      {blockType.replace('_', ' ')}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(html, blockType)}
                      className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                    >
                      {copiedBlock === blockType ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-secondary-500">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
              <p>Generated content will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 