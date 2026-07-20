# SciVerify

> **AI-Powered Scientific Claim Verification System**

SciVerify is an AI-powered web application designed to verify scientific claims by retrieving relevant research evidence and determining whether a claim is **Supported**, **Contradicted**, or has **Not Enough Information**. The project focuses on healthcare and artificial intelligence, using Natural Language Processing (NLP), semantic search, and machine learning techniques.

This project is being developed as part of an academic NLP project and uses a **custom-built dataset inspired by the SciFact dataset structure**.

---

## 📖 Overview

With the rapid growth of scientific publications and online medical information, verifying the accuracy of scientific claims has become increasingly important. SciVerify aims to assist users by analyzing healthcare-related claims and providing evidence-backed verification using relevant research papers.

The system retrieves the most relevant scientific documents, identifies supporting evidence, and classifies each claim into one of three categories:

- ✅ **SUPPORT**
- ❌ **CONTRADICT**
- ❓ **NOT ENOUGH INFO**

---

## ✨ Features

- 🔍 Scientific claim verification
- 📄 Evidence retrieval from research papers
- 🤖 AI-powered claim classification
- 📚 Custom scientific dataset
- ⚡ Fast React frontend built with Vite
- 🎨 Responsive and modern user interface
- 🔗 REST API integration
- 📈 Scalable architecture

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend *(Planned)*
- FastAPI
- Python

### AI / NLP *(Planned)*
- Hugging Face Transformers
- Sentence Transformers
- FAISS
- PyTorch

### Dataset
- **SciVerify Dataset**
- Original dataset inspired by the SciFact schema
- Domain: AI in Healthcare & Clinical Decision Support

---

## 📂 Project Structure

```
SciVerify/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/SciVerify.git
```

Navigate into the project:

```bash
cd SciVerify
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:5173
```

---

## 📊 Dataset

SciVerify uses a **custom-created scientific claim verification dataset** developed specifically for this project.

### Dataset Characteristics

- 📄 150+ scientific research abstracts
- 💬 150+ scientific claims
- 🏥 Domain: Artificial Intelligence in Healthcare
- 📚 JSONL format
- 🔍 Evidence annotations
- ⚖️ Balanced claim labels

### Labels

| Label | Description |
|--------|-------------|
| SUPPORT | Evidence supports the claim |
| CONTRADICT | Evidence contradicts the claim |
| NOT ENOUGH INFO | Insufficient evidence available |

> **Note:** The dataset follows the schema of the SciFact dataset but contains entirely original content created for academic purposes.

---

## 🧠 Project Workflow

```
User Claim
      │
      ▼
Preprocessing
      │
      ▼
Semantic Search (FAISS)
      │
      ▼
Retrieve Relevant Papers
      │
      ▼
Evidence Extraction
      │
      ▼
Claim Classification
      │
      ▼
Display Result
```

---

## 📌 Development Status

- ✅ React + TypeScript + Vite setup
- ✅ Project initialization
- ⏳ UI development
- ⏳ Custom dataset creation
- ⏳ Backend API development
- ⏳ Semantic retrieval implementation
- ⏳ Claim verification model
- ⏳ Deployment

---

## 🎯 Future Enhancements

- User authentication
- Search history
- Saved claims
- Evidence highlighting
- Explainable AI predictions
- Research paper recommendations
- Dashboard analytics
- Multi-domain claim verification

---

## 👨‍💻 Team

Developed as part of an academic Natural Language Processing (NLP) project.

---

## 📄 License

This project is intended for educational and research purposes only.

---

## 🙏 Acknowledgements

- SciFact Dataset (used only as structural inspiration)
- Hugging Face Datasets
- React
- Vite
- FastAPI
- FAISS
- Sentence Transformers
