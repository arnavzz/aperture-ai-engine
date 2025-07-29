import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ContentStudio from './pages/ContentStudio'
import SERPCrawler from './pages/SERPCrawler'
import RiskPrediction from './pages/RiskPrediction'
import QARegistry from './pages/QARegistry'
import Analytics from './pages/Analytics'
import Landing from './pages/Landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/content-studio" element={<ContentStudio />} />
            <Route path="/serp-crawler" element={<SERPCrawler />} />
            <Route path="/risk-prediction" element={<RiskPrediction />} />
            <Route path="/qa-registry" element={<QARegistry />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  )
}

export default App 