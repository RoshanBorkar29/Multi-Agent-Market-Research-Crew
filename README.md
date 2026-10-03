# 🧠 MarketMind AI — Multi-Agent Market Research Crew

> **Autonomous Multi-Agent Market Intelligence & Strategic Validation Platform powered by LangGraph, FastAPI, pgvector RAG, and React.**

---

## 🚀 Live Deployment

The system is deployed and accessible across the following cloud infrastructure:

- **Frontend Application**: Deployed on **[Vercel](https://vercel.com)** (React 18 + TypeScript + Vite SPA)
- **Backend API Gateway**: Deployed on **[Render / Railway](https://render.com)** (FastAPI Async ASGI Application)
- **Database & Vector Store**: Hosted on **[Supabase / Neon](https://supabase.com)** (PostgreSQL 16 with native `pgvector` extension)
- **LLM Inference & Search**: Powered by **[Groq Cloud](https://groq.com)** (Llama 3 / Mixtral for ultra-low latency inference) and **[Tavily Search API](https://tavily.com)** for grounded web intelligence.

---

## 📌 Project Overview

Validating business ideas and generating comprehensive market research typically takes days of manual searching, synthesizing competitor data, building customer personas, and validating claims.

**MarketMind AI** automates this entire pipeline into minutes. By orchestrating a crew of **7 specialized autonomous AI agents** in a deterministic **LangGraph StateGraph**, the platform decomposes any startup or product idea into a structured, citation-backed intelligence report covering market dynamics, competitor positioning, ICP customer profiles, product strategy, and financial feasibility—complete with an interactive **RAG-powered conversational assistant ("Ask MarketMind")** to interrogate report findings.

---

## 🏛️ System Architecture

The application is structured into four cohesive layers: modern web frontend, asynchronous API gateway, multi-agent state graph orchestrator, and a persistent hybrid relational + vector storage engine.

```
+----------------------------------------------------------------------------------------------------+
| 1. User Interface (React 18 + TypeScript + Vite + Tailwind CSS)                                    |
|    - Research Workspace     - Interactive Dashboard     - Ask MarketMind (RAG Chat) - Saved Ideas  |
+-------------------------------------------------+--------------------------------------------------+
                                                  | HTTP / REST & Streaming
                                                  v
+----------------------------------------------------------------------------------------------------+
| 2. API & Orchestration Gateway (FastAPI Async Engine)                                              |
|    - /api/research          - /api/reports/{id}         - /api/reports/{id}/chat    - /api/ideas   |
+-------------------------------------------------+--------------------------------------------------+
                                                  | StateGraph Invocation
                                                  v
+----------------------------------------------------------------------------------------------------+
| 3. Multi-Agent Crew (LangGraph Orchestration State Machine)                                         |
|    [Research Planner] -> [Parallel Fan-Out: Market Agent | Competitor Agent | Customer Agent]     |
|                       -> [Product Strategy Agent] -> [Evidence Critic Agent (Validation Loop)]     |
|                       -> [Business Analysis Agent] -> Final Synthesized Intelligence State         |
+-------------------------------------------------+--------------------------------------------------+
                                                  | Async Persistence & Embeddings
                                                  v
+----------------------------------------------------------------------------------------------------+
| 4. Persistence & Vector Knowledge Base                                                             |
|    - PostgreSQL (Reports, Chunks, Bookmarks)    - pgvector / Qdrant Embeddings Store               |
|    - Tavily Search API & Web Scraper Tools      - Groq LLM Ultra-Fast Inference Engine             |
+----------------------------------------------------------------------------------------------------+
```

### 🖼️ Architecture Diagram
<!-- Place your System Architecture Diagram below -->
![System Architecture](assets/architecture.png)

---

## 🤖 Multi-Agent Workflow (LangGraph StateGraph)

The core intelligence layer utilizes **LangGraph** to model market research as a stateful, cyclical graph rather than a brittle sequential chain:

```mermaid
flowchart TD
    START((Start)) --> RP["1. Research Planner Agent\n(Decomposes idea, generates search matrix)"]
    
    RP --> MR["2. Market Research Agent\n(Industry size, TAM/SAM/SOM, market trends)"]
    RP --> CR["3. Competitor Agent\n(Direct & indirect rivals, feature matrix, moats)"]
    RP --> CU["4. Customer Agent\n(ICP personas, pain points, willingness-to-pay)"]
    
    MR --> PS["5. Product Strategy Agent\n(Value proposition, differentiation, MVP roadmap)"]
    CR --> PS
    CU --> PS
    
    PS --> EC["6. Evidence Critic Agent\n(Fact validation, citation verification, hallucination checks)"]
    
    EC -- "Passes Validation / Threshold Met" --> BA["7. Business Analysis Agent\n(Revenue models, unit economics, risk analysis)"]
    EC -- "Critical Data Gaps Found" --> MR
    
    BA --> DB_SAVE[("Save Report to DB & Index Embeddings")] --> END_NODE((Complete))
```

### Agent Roles & Responsibilities:
1. **Research Planner Agent**: Takes the raw user idea and target market, decomposing them into focused sub-queries and hypothesis statements.
2. **Market Research Agent**: Queries live market intelligence via Tavily, extracting market size, growth drivers, CAGR, and tailwinds.
3. **Competitor Agent**: Maps out top incumbents, rising competitors, pricing strategies, and weaknesses.
4. **Customer Agent**: Analyzes Ideal Customer Profiles (ICPs), Jobs-to-be-Done (JTBD), purchasing behaviors, and unsolved pain points.
5. **Product Strategy Agent**: Synthesizes the parallel findings to craft a distinct product positioning strategy, core feature roadmap, and MVP scope.
6. **Evidence Critic Agent**: Audits generated claims against real scraped sources to eliminate hallucinations. If claims lack evidence, it routes back for refinement.
7. **Business Analysis Agent**: Computes monetization channels, unit economics, operational risks, and go-to-market recommendations.

---

## 💻 Frontend & User Experience

The frontend is built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**, designed for high-density analytical consumption.

### Key Frontend Views:
- **Research Workspace**: Intuitive onboarding to input business concepts, target geography, and initial constraints.
- **Dynamic Analytics Dashboard**: Tabular, visual, and categorized breakdown of market findings, competitor analysis, ICP customer profiles, and product roadmaps with interactive charts via **Recharts**.
- **Ask MarketMind (RAG Chat)**: A slide-over / floating intelligent copilot allowing founders to ask specific questions about any report section, backed by pgvector semantic retrieval.
- **Saved Ideas & History**: Bookmark and compare past market analyses side-by-side.

### 🖼️ Frontend Showcase
<!-- Place your Frontend Screenshots below -->
#### 1. Research Workspace & Launchpad
![Frontend Research Workspace](assets/frontend-workspace.png)

#### 2. Interactive Analytics Dashboard & "Ask MarketMind" Assistant
![MarketMind Dashboard](assets/dashboard-rag.png)

---

## 🛠️ Tech Stack & Tools

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Recharts, Axios |
| **Backend & API** | FastAPI, Python 3.11+, Uvicorn, Pydantic v2, Pydantic Settings |
| **Multi-Agent Orchestration** | LangGraph, LangGraph Checkpoint, LangChain Core |
| **LLM & Inference** | Groq (`langchain-groq`), Llama-3.3-70b-versatile, OpenAI / Gemini fallback |
| **Web Research & Tools** | Tavily Python SDK, BeautifulSoup4, Requests, HTTPX |
| **Database & ORM** | PostgreSQL, SQLAlchemy 2.0 (AsyncIO), asyncpg, pgvector |
| **Deployment & Cloud** | Vercel (Frontend), Render / Railway (Backend), Supabase / Neon (Database) |

---

## ⚡ Challenges Faced & Engineering Solutions

| # | Challenge | Root Cause | Engineering Solution Implemented |
| :--- | :--- | :--- | :--- |
| **1** | **LLM Hallucinations in Market Data** | Standard LLM outputs fabricate market statistics, fake competitor pricing, or obsolete information. | Introduced a dedicated **Evidence Critic Agent** and mandatory source grounding with **Tavily Web Search** + structured Pydantic citation models. |
| **2** | **High Latency in Deep Research** | Sequential agent execution (Market -> Competitor -> Customer) resulted in 60s+ execution times. | Implemented **Fan-Out Parallelism** in LangGraph for nodes 2, 3, and 4, coupled with **Groq ultra-fast LPU inference**, reducing pipeline runtimes by over 65%. |
| **3** | **Static Reports Without Queryability** | Once generated, users had to manually skim massive reports to find specific insights. | Integrated **pgvector semantic chunking**. Upon report creation, sections are automatically embedded and indexed, powering the **"Ask MarketMind"** interactive RAG chatbot. |
| **4** | **Unstructured & Noisy Web Scrapes** | Raw HTML extraction produced token bloat and irrelevant boilerplate text. | Built a custom **Web Scraper & Sanitizer** utilizing BeautifulSoup to extract structured text blocks, stripped of scripts, navbars, and advertisements before feeding context to the LLMs. |

---

## 🚀 Future Production Enhancements & Roadmap

For scaling MarketMind AI into an enterprise-grade SaaS platform:

1. **Asynchronous Job Queues & Workers**:
   - Transition long-running research jobs from HTTP request-response to background task workers powered by **Celery + Redis** or **Temporal / AWS SQS**, with webhook notifications upon completion.
2. **Real-Time Streaming via Server-Sent Events (SSE) / WebSockets**:
   - Stream agent thought processes, search progress, and token-by-token synthesis directly to the UI in real-time.
3. **Dedicated Distributed Vector Store**:
   - Migrate from PostgreSQL `pgvector` to dedicated vector infrastructure like **Qdrant Cloud** or **Pinecone** with hybrid sparse/dense search (BM25 + ColBERT).
4. **Human-in-the-Loop (HITL) Validation**:
   - Utilize LangGraph's native breakpoint/checkpointing mechanisms to allow analysts to pause execution, refine search terms, or approve competitor lists before generating final strategy.
5. **Multi-Tenant Auth & Usage Quotas**:
   - Add **Clerk / Supabase Auth** with tiered subscription limits, organization workspaces, and encrypted API key management.
6. **Observability & Tracing**:
   - Integrate **Langfuse / LangSmith** and **OpenTelemetry** for full agent execution tracing, latency profiling, cost tracking, and automated evaluation metrics.

---

## 📂 Project Structure

```
Multi-Agent-Market-Research-Crew/
├── backend/
│   ├── app/
│   │   ├── agents/               # Autonomous agent logic
│   │   │   ├── business_agent.py
│   │   │   ├── competitor_agent.py
│   │   │   ├── critic_agent.py
│   │   │   ├── customer_agent.py
│   │   │   ├── market_agent.py
│   │   │   ├── product_agent.py
│   │   │   └── research_planner_agent.py
│   │   ├── db/                   # Database configuration & models
│   │   │   ├── database.py       # Async SQLAlchemy engine & session
│   │   │   └── models.py         # Report, ReportEmbedding, SavedIdea
│   │   ├── graph/                # LangGraph state machine definition
│   │   │   ├── graph.py          # StateGraph construction & conditional edges
│   │   │   ├── nodes.py          # Execution node wrappers
│   │   │   └── state.py          # ResearchState TypedDict
│   │   ├── schemas/              # Pydantic validation schemas
│   │   │   ├── api.py            # API request/response models
│   │   │   └── research.py       # Structured agent outputs
│   │   ├── services/             # Embeddings & RAG services
│   │   │   ├── embeddings.py     # Vector embedding generation
│   │   │   └── rag_service.py    # Contextual similarity search & Q&A
│   │   ├── tools/                # Search & scraping tools
│   │   │   ├── web_scrapper.py
│   │   │   └── web_search.py
│   │   ├── main.py               # FastAPI application entrypoint
│   │   └── routes.py             # REST API endpoint handlers
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/                  # Axios HTTP client & API bindings
│   │   ├── components/           # UI components & research widgets
│   │   │   └── research/         # ResearchWorkspace, AskMarketMind, Analytics
│   │   ├── types/                # TypeScript interface definitions
│   │   ├── App.tsx               # Root component & routing
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── assets/                       # Architectural diagrams & screenshots
└── README.md
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- Python `3.11+`
- Node.js `18+` and npm / pnpm
- PostgreSQL (Optional, fallback to SQLite for local development)
- API Keys for **Groq** and **Tavily**

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Linux/macOS:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with your API keys
cp .env.example .env # or create .env with:
# GROQ_API_KEY=your_groq_api_key
# TAVILY_API_KEY=your_tavily_api_key
# DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/marketmind

# Run FastAPI server
uvicorn app.main:app --reload --port 8000
```

### 3. Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Visit `http://localhost:5173` to start exploring market research workflows!

---

## 📄 License
This project is licensed under the **MIT License**.
