# Aperture AI - Content Augmentation Studio

A comprehensive AI-powered platform for content augmentation, SERP analysis, risk prediction, and human-in-the-loop QA workflows.

## 🚀 Features

### Backend Services
- **Content Studio**: AI-powered content augmentation (FAQ, Myth vs Fact, How-to guides)
- **SERP Crawler**: Search engine results analysis and content gap identification
- **Risk Prediction**: AIO risk assessment and CTR prediction models
- **QA Registry**: Human-in-the-loop review workflow
- **Analytics**: GA4 and GSC data integration with scheduled fetching
- **Vector Store**: Qdrant-based embedding storage and retrieval
- **Gap Mining**: Advanced content gap analysis and ranking

### Frontend Application
- **Modern React Interface**: Built with TypeScript, Tailwind CSS, and Vite
- **Real-time Dashboard**: Comprehensive metrics and quick actions
- **Interactive Charts**: Rich data visualizations using Recharts
- **Mobile Responsive**: Optimized for all device sizes
- **Human-in-the-Loop**: Intuitive QA review interface

## 🏗️ Architecture

```
aperture-ai-engine/
├── backend/                 # FastAPI backend services
│   ├── analytics/          # GA4/GSC data fetching
│   ├── content_studio/     # Content augmentation
│   ├── corpus/            # Content ingestion
│   ├── distribution/       # Content distribution
│   ├── gap_miner/         # Gap analysis
│   ├── governance/         # QA and audit
│   ├── models/            # ML models
│   └── serp_crawler/      # SERP analysis
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── services/      # API integration
│   └── public/           # Static assets
├── docker-compose.yml     # Multi-service orchestration
└── requirements.txt       # Python dependencies
```

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **MongoDB**: Document database for content storage
- **PostgreSQL**: Relational database for analytics
- **Qdrant**: Vector database for embeddings
- **Puppeteer**: SERP crawling and automation
- **Joblib**: ML model persistence
- **APScheduler**: Background task scheduling

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first styling
- **React Router**: Client-side routing
- **React Hook Form**: Form management
- **Recharts**: Data visualization
- **Lucide React**: Icon library
- **Axios**: HTTP client

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 16+ (for frontend development)
- Python 3.10+ (for backend development)

### Option 1: Docker (Recommended)

1. **Clone the repository**:
```bash
git clone <repository-url>
cd aperture-ai-engine
```

2. **Start all services**:
```bash
docker-compose up -d
```

3. **Access the applications**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Streamlit: http://localhost:8501

### Option 2: Development Setup

1. **Backend Setup**:
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start backend
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. **Frontend Setup**:
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

3. **Database Setup**:
```bash
# Start required services
docker-compose up -d mongo postgres qdrant
```

## 📊 API Endpoints

### Content Studio
- `POST /api/augment` - Generate content augmentations

### SERP Crawler
- `GET /api/crawl-serp` - Crawl search engine results

### Risk Prediction
- `POST /api/predict-risk` - Assess content risks

### QA Registry
- `POST /api/qa-review` - Submit QA reviews

## 🎯 Core Workflows

### 1. Content Augmentation
1. Navigate to Content Studio
2. Enter page URL and gap query
3. Select block types (FAQ, Myth vs Fact, How-to)
4. Generate AI-powered augmentations
5. Copy generated content

### 2. SERP Analysis
1. Use SERP Crawler
2. Enter search query
3. Analyze results for content gaps
4. Review position and snippet data

### 3. Risk Assessment
1. Access Risk Prediction
2. Input content parameters
3. Get AIO risk and CTR predictions
4. Review recommendations

### 4. QA Review
1. Check QA Registry
2. Review pending augmentations
3. Approve/reject with optional overrides
4. Track review status

## 📈 Analytics

The platform provides comprehensive analytics including:
- Content augmentation metrics
- SERP crawl statistics
- Risk assessment trends
- QA approval rates
- Performance insights

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017
POSTGRES_URI=postgresql://user:password@localhost:5432

# Vector Store
QDRANT_URL=http://localhost:6333

# Analytics
GA4_PROPERTY_ID=your_ga4_property_id
GSC_SITE_URL=https://your-site.com

# Models
MODEL_DIR=backend/models
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🐳 Docker Services

- **mongo**: MongoDB database
- **postgres**: PostgreSQL database
- **qdrant**: Vector database
- **backend**: FastAPI application
- **frontend**: React application
- **streamlit**: Legacy Streamlit interface

## 🧪 Development

### Backend Development
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Running Tests
```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation at http://localhost:8000/docs

---

**Aperture AI** - Empowering content creators with AI-driven insights and automation. 