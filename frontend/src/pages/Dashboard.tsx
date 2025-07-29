import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Search, 
  Shield, 
  CheckCircle, 
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = {
  augmentations: 156,
  serpCrawls: 89,
  riskAssessments: 234,
  qaReviews: 67,
  weeklyTrend: [
    { day: 'Mon', augmentations: 12, serpCrawls: 8, riskAssessments: 15 },
    { day: 'Tue', augmentations: 18, serpCrawls: 12, riskAssessments: 22 },
    { day: 'Wed', augmentations: 15, serpCrawls: 10, riskAssessments: 18 },
    { day: 'Thu', augmentations: 22, serpCrawls: 14, riskAssessments: 25 },
    { day: 'Fri', augmentations: 19, serpCrawls: 11, riskAssessments: 20 },
    { day: 'Sat', augmentations: 8, serpCrawls: 5, riskAssessments: 12 },
    { day: 'Sun', augmentations: 6, serpCrawls: 4, riskAssessments: 9 },
  ]
}

const quickActions = [
  {
    title: 'Content Studio',
    description: 'Generate content augmentations',
    icon: FileText,
    href: '/content-studio',
    color: 'bg-blue-500'
  },
  {
    title: 'SERP Crawler',
    description: 'Analyze search results',
    icon: Search,
    href: '/serp-crawler',
    color: 'bg-green-500'
  },
  {
    title: 'Risk Prediction',
    description: 'Assess content risks',
    icon: Shield,
    href: '/risk-prediction',
    color: 'bg-orange-500'
  },
  {
    title: 'QA Registry',
    description: 'Review augmentations',
    icon: CheckCircle,
    href: '/qa-registry',
    color: 'bg-purple-500'
  }
]

export default function Dashboard() {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-secondary-900">Dashboard</h1>
        <p className="text-secondary-600 mt-2">Welcome to Aperture AI Content Augmentation Studio</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Augmentations</p>
              <p className="text-2xl font-bold text-secondary-900">{mockData.augmentations}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Search className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">SERP Crawls</p>
              <p className="text-2xl font-bold text-secondary-900">{mockData.serpCrawls}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">Risk Assessments</p>
              <p className="text-2xl font-bold text-secondary-900">{mockData.riskAssessments}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-secondary-600">QA Reviews</p>
              <p className="text-2xl font-bold text-secondary-900">{mockData.qaReviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="card hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-secondary-900">{action.title}</h3>
                  <p className="text-sm text-secondary-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="card">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Weekly Activity</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="augmentations" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="serpCrawls" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="riskAssessments" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 