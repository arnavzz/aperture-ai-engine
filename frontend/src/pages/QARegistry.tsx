import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, XCircle, Eye, Loader2, Clock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { qaAPI, QARequest } from '../services/api'

interface QAEntry {
  id: string
  page_url: string
  augmentation: Record<string, any>
  approved: boolean | null
  override_html?: string
  created_at: string
  reviewer?: string
}

const mockQAEntries: QAEntry[] = [
  {
    id: '1',
    page_url: 'https://example.com/seo-guide',
    augmentation: {
      faq: '<div class="faq"><h3>What is SEO?</h3><p>SEO stands for Search Engine Optimization...</p></div>',
      mythfact: '<div class="mythfact"><h3>Myth: SEO is dead</h3><p>Fact: SEO is more important than ever...</p></div>'
    },
    approved: true,
    created_at: '2024-01-15T10:30:00Z',
    reviewer: 'John Doe'
  },
  {
    id: '2',
    page_url: 'https://example.com/content-marketing',
    augmentation: {
      howto: '<div class="howto"><h3>How to Create Great Content</h3><ol><li>Research your audience...</li></ol></div>'
    },
    approved: false,
    created_at: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    page_url: 'https://example.com/backlink-strategies',
    augmentation: {
      faq: '<div class="faq"><h3>How to build backlinks?</h3><p>Building quality backlinks requires...</p></div>'
    },
    approved: null,
    created_at: '2024-01-13T09:20:00Z'
  }
]

export default function QARegistry() {
  const [entries, setEntries] = useState<QAEntry[]>(mockQAEntries)
  const [selectedEntry, setSelectedEntry] = useState<QAEntry | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const { register, handleSubmit, reset } = useForm<{
    override_html: string
  }>()

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true
    if (filter === 'pending') return entry.approved === null
    if (filter === 'approved') return entry.approved === true
    if (filter === 'rejected') return entry.approved === false
    return true
  })

  const handleReview = async (entryId: string, approved: boolean, overrideHtml?: string) => {
    setIsLoading(true)
    try {
      const entry = entries.find(e => e.id === entryId)
      if (!entry) return

      const reviewData: QARequest = {
        page_url: entry.page_url,
        augmentation: entry.augmentation,
        approved,
        override_html: overrideHtml
      }

      await qaAPI.review(reviewData)
      
      setEntries(prev => prev.map(e => 
        e.id === entryId 
          ? { ...e, approved, override_html: overrideHtml, reviewer: 'Current User' }
          : e
      ))
      
      toast.success(approved ? 'Augmentation approved!' : 'Augmentation rejected!')
      setSelectedEntry(null)
      reset()
    } catch (error) {
      console.error('Error reviewing augmentation:', error)
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (approved: boolean | null) => {
    if (approved === null) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Pending</span>
    }
    if (approved) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Approved</span>
    }
    return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Rejected</span>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">QA Registry</h1>
        <p className="text-secondary-600 mt-2">Review and approve content augmentations</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'pending', label: 'Pending' },
          { key: 'approved', label: 'Approved' },
          { key: 'rejected', label: 'Rejected' }
        ].map((filterOption) => (
          <button
            key={filterOption.key}
            onClick={() => setFilter(filterOption.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === filterOption.key
                ? 'bg-primary-100 text-primary-700'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entries List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Review Queue</h2>
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="border border-secondary-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(entry.approved)}
                        <span className="text-sm text-secondary-500">
                          {formatDate(entry.created_at)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        {entry.page_url}
                      </h3>
                      <p className="text-sm text-secondary-600 mb-3">
                        {Object.keys(entry.augmentation).length} augmentation(s)
                      </p>
                      {entry.reviewer && (
                        <div className="flex items-center gap-1 text-xs text-secondary-500">
                          <User className="w-3 h-3" />
                          Reviewed by {entry.reviewer}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {entry.approved === null && (
                        <>
                          <button
                            onClick={() => handleReview(entry.id, true)}
                            disabled={isLoading}
                            className="p-2 text-green-600 hover:text-green-700 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReview(entry.id, false)}
                            disabled={isLoading}
                            className="p-2 text-red-600 hover:text-red-700 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filteredEntries.length === 0 && (
                <div className="text-center py-8 text-secondary-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
                  <p>No entries found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Details</h2>
          {selectedEntry ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">Page URL</h3>
                <p className="text-sm text-secondary-600 break-all">{selectedEntry.page_url}</p>
              </div>

              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">Augmentations</h3>
                <div className="space-y-3">
                  {Object.entries(selectedEntry.augmentation).map(([type, html]) => (
                    <div key={type} className="border border-secondary-200 rounded-lg p-3">
                      <h4 className="font-medium text-secondary-900 mb-2 capitalize">
                        {type.replace('_', ' ')}
                      </h4>
                      <div 
                        className="prose prose-sm max-w-none text-xs"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {selectedEntry.approved === null && (
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Override HTML (Optional)</h3>
                  <form onSubmit={handleSubmit((data) => handleReview(selectedEntry.id, true, data.override_html))}>
                    <textarea
                      {...register('override_html')}
                      placeholder="Enter custom HTML if needed..."
                      rows={4}
                      className="input-field"
                    />
                    <div className="flex gap-2 mt-3">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary flex-1 flex items-center justify-center"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReview(selectedEntry.id, false)}
                        disabled={isLoading}
                        className="btn-secondary flex-1 flex items-center justify-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {selectedEntry.override_html && (
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-2">Override HTML</h3>
                  <div className="bg-secondary-50 p-3 rounded-lg">
                    <pre className="text-xs text-secondary-700 whitespace-pre-wrap">
                      {selectedEntry.override_html}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-secondary-500">
              <Eye className="w-12 h-12 mx-auto mb-4 text-secondary-300" />
              <p>Select an entry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 