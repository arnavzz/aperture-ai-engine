import { useState, useEffect } from 'react'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { TrendingUp, Users, Eye, MousePointer, Calendar, Activity } from 'lucide-react'

const mockData = {
  weeklyMetrics: [
    { day: 'Mon', augmentations: 12, serpCrawls: 8, riskAssessments: 15, qaReviews: 5 },
    { day: 'Tue', augmentations: 18, serpCrawls: 12, riskAssessments: 22, qaReviews: 8 },
    { day: 'Wed', augmentations: 15, serpCrawls: 10, riskAssessments: 18, qaReviews: 6 },
    { day: 'Thu', augmentations: 22, serpCrawls: 14, riskAssessments: 25, qaReviews: 10 },
    { day: 'Fri', augmentations: 19, serpCrawls: 11, riskAssessments: 20, qaReviews: 7 },
    { day: 'Sat', augmentations: 8, serpCrawls: 5, riskAssessments: 12, qaReviews: 3 },
    { day: 'Sun', augmentations: 6, serpCrawls: 4, riskAssessments: 9, qaReviews: 2 },
  ],
  monthlyTrend: [
    { month: 'Jan', augmentations: 156, serpCrawls: 89, riskAssessments: 234, qaReviews: 67 },
    { month: 'Feb', augmentations: 189, serpCrawls: 112, riskAssessments: 287, qaReviews: 89 },
    { month: 'Mar', augmentations: 234, serpCrawls: 145, riskAssessments: 356, qaReviews: 123 },
    { month: 'Apr', augmentations: 198, serpCrawls: 134, riskAssessments: 298, qaReviews: 98 },
    { month: 'May', augmentations: 267, serpCrawls: 178, riskAssessments: 412, qaReviews: 145 },
    { month: 'Jun', augmentations: 312, serpCrawls: 201, riskAssessments: 489, qaReviews: 167 },
  ],
  blockTypeDistribution: [
    { name: 'FAQ', value: 45, color: '#3b82f6' },
    { name: 'Myth vs Fact', value: 30, color: '#10b981' },
    { name: 'How-to', value: 25, color: '#f59e0b' },
  ],
  riskDistribution: [
    { name: 'Low Risk', value: 65, color: '#10b981' },
    { name: 'Medium Risk', value: 25, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' },
  ],
  topPages: [
    { url: 'https://example.com/seo-guide', augmentations: 23, riskScore: 0.15 },
    { url: 'https://example.com/content-marketing', augmentations: 18, riskScore: 0.22 },
    { url: 'https://example.com/backlink-strategies', augmentations: 15, riskScore: 0.08 },
    { url: 'https://example.com/keyword-research', augmentations: 12, riskScore: 0.31 },
    { url: 'https://example.com/technical-seo', augmentations: 9, riskScore: 0.19 },
  ]
}

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const chartData = timeRange === 'week' ? mockData.weeklyMetrics : mockData.monthlyTrend

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Analytics</h1>
        <p className="text-secondary-600 mt-2">Track performance and insights across all modules</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {[
          { key: 'week', label: 'This Week' },
          { key: 'month', label: 'This Month' }
        ].map((option) => (
          <button
            key={option.key}
            onClick={() => setTimeRange(option.key as 'week' | 'month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === option.key
                ? 'bg-primary-100 text-primary-700'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Total Augmentations</p>
              <p className="text-2xl font-bold text-secondary-900">
                {chartData.reduce((acc, item) => acc + item.augmentations, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">SERP Crawls</p>
              <p className="text-2xl font-bold text-secondary-900">
                {chartData.reduce((acc, item) => acc + item.serpCrawls, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Risk Assessments</p>
              <p className="text-2xl font-bold text-secondary-900">
                {chartData.reduce((acc, item) => acc + item.riskAssessments, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">QA Reviews</p>
              <p className="text-2xl font-bold text-secondary-900">
                {chartData.reduce((acc, item) => acc + item.qaReviews, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trend */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Activity Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={timeRange === 'week' ? 'day' : 'month'} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="augmentations" stroke="#3b82f6" strokeWidth={2} name="Augmentations" />
                <Line type="monotone" dataKey="serpCrawls" stroke="#10b981" strokeWidth={2} name="SERP Crawls" />
                <Line type="monotone" dataKey="riskAssessments" stroke="#f59e0b" strokeWidth={2} name="Risk Assessments" />
                <Line type="monotone" dataKey="qaReviews" stroke="#8b5cf6" strokeWidth={2} name="QA Reviews" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Block Type Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Block Type Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.blockTypeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {mockData.blockTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Risk Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.riskDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Pages */}
        <div className="card">
          <h2 className="text-xl font-semibold text-secondary-900 mb-4">Top Pages by Augmentations</h2>
          <div className="space-y-4">
            {mockData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-secondary-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-secondary-900 truncate">{page.url}</p>
                  <p className="text-sm text-secondary-600">
                    {page.augmentations} augmentations • Risk: {(page.riskScore * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-secondary-600">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">+23%</div>
            <p className="text-sm text-secondary-600">Increase in augmentations this month</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">-15%</div>
            <p className="text-sm text-secondary-600">Decrease in high-risk content</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">+8%</div>
            <p className="text-sm text-secondary-600">Improvement in QA approval rate</p>
          </div>
        </div>
      </div>
    </div>
  )
} 