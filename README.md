
# PitchNova: AI-Powered Cold Calling Sales Agent

PitchNova is an intelligent phone agent that conducts natural-sounding sales conversations, analyzes customer responses in real-time, processes inventory orders, and converts leads into sales opportunities with remarkable efficiency.

## 🌟 Live Deployment

Experience PitchNova in action:
- **Front-end:** [https://pitch-nova.vercel.app/](https://pitch-nova.vercel.app/)
- **Back-end API:** [https://pitchnova.onrender.com/](https://pitchnova.onrender.com/)
- **Python ML Model:** [https://pitchnovamodel.onrender.com/](https://pitchnovamodel.onrender.com/)

## 📋 Overview

PitchNova is a full-stack intelligent sales system designed to seamlessly integrate into existing sales pipelines. The system leverages advanced natural language processing, voice synthesis, and real-time analytics to create personalized and effective cold calling experiences.

### What PitchNova Can Do:

- Initiate outbound calls to potential customers
- Conduct natural, flowing conversations
- Process and fulfill inventory orders
- Adapt its approach based on customer responses
- Provide personalized product recommendations 
- Generate detailed call summaries and insights
- Update inventory levels automatically

---

## ✨ Key Features

### 🗣️ Voice Intelligence

- Real-time speech-to-text processing
- Natural-sounding text-to-speech using Eleven Labs
- Dynamic conversation flow with contextual understanding
- Emotion and sentiment analysis during calls

### 📊 Business Intelligence & Analytics

- Comprehensive dashboard showing call success metrics
- Sentiment score tracking and analysis
- Month-wise customer engagement statistics
- Inventory management with real-time updates
- Product matching based on detected customer needs
- Objection handling with adaptive responses
- Conversion optimization through continuous learning

### 💻 Technical Capabilities

- Secure API handling with environment variable protection
- Advanced order processing and inventory management
- Call summary generation with actionable insights
- Rich analytics dashboard for business intelligence
- Flask-based backend for robust request handling

---

## 🛠️ Technology Stack

PitchNova leverages cutting-edge technologies to deliver exceptional performance:

- **Voice Services:** Twilio for call handling and telephony
- **Text-to-Speech:** Eleven Labs for ultra-realistic voice synthesis
- **AI Processing:** Groq for high-performance API responses
- **Frontend:** React with modern UI/UX principles
- **Backend:** Flask/Python API services
- **Machine Learning:** Custom trained models for sentiment analysis and conversation intelligence
- **Database:** MongoDB for data persistence 

---

## 📱 Usage

### 📞 Making Test Calls

1. Ensure your Twilio webhook URLs are properly configured to point to your deployed application
2. Use the Twilio console to initiate test calls or integrate with the API
3. Monitor call logs, conversation transcripts, and inventory updates in the dashboard

---

## 📊 Analytics Dashboard

PitchNova includes a comprehensive analytics dashboard that provides:

- **Call Success Ratio:** Track successful vs. unsuccessful calls
- **Sentiment Analysis:** Average sentiment scores across all calls
- **Inventory Management:** Real-time tracking of sold and available inventory
- **Customer Engagement:** Month-wise visualization of customer interactions
- **Performance Metrics:** Conversion rates, talk time, and objection statistics
- **Order Summaries:** Detailed breakdowns of processed orders

### 💬 Call History & Conversation Analysis

The dashboard features dedicated pages for reviewing complete call histories:

- **Full Conversation Transcripts:** Access the complete chat history for every call made
- **Call Summaries:** Review AI-generated summaries highlighting key points from each conversation
- **Customer Insights:** Track customer preferences, objections, and buying signals
- **Conversation Analytics:** Analyze conversation patterns and successful sales techniques

### 🛒 Order Processing & Inventory Management

PitchNova integrates seamless order processing within the dashboard:

- **Real-time Inventory Check:** Verifies product availability during conversation
- **Order Placement Tracking:** Monitors orders processed during calls
- **Summary Generation:** Creates detailed order summaries after call completion
- **Inventory Updates:** Automatically adjusts inventory levels based on sales
- **Stock Management:** Shows real-time inventory status and alerts for low stock

This comprehensive solution provides critical business intelligence to optimize your sales strategy, conversation quality, and inventory management.

---

## 🖼️ Screenshots

*This section will showcase images of the PitchNova platform in action, including the dashboard, call interface, and analytics views.*

## Dashboard Overview
<img src="https://drive.google.com/uc?export=view&id=1yTvQXnkmeissonhT7upAFrUKYcO3lBov" width="800"/>

## Call Summary Overview
<img src="https://drive.google.com/uc?export=view&id=1-Un6SHmXbmKswAsGx4GYWFBugS8F35YR" width="800"/>

## Call Chat Overview
<img src="https://drive.google.com/uc?export=view&id=1CKwZMeQTjVS8XhEEQKW-AXGNh8K1gHxb" width="800"/>

---

## 🚀 Getting Started

### 📋 Prerequisites

- Python 3.8 or higher
- MongoDB instance
- Twilio account
- Eleven Labs API key
- Groq API access

### 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PitchNova.git
cd PitchNova
```

2. Install dependencies:

For the front-end:
```bash
cd frontend
npm install --legacy-peer-deps
```

For the back-end:
```bash
cd backend
npm install
```

For the Python model:
```bash
cd model
pip install -r requirements.txt
```

3. Configure your environment variables:
    - Copy the `.env.example` file to `.env`
    - Fill in all required API keys and configuration values

### ⚙️ Configuration

The system is configured through environment variables in the `.env` file:

```
# Flask Configuration
SECRET_KEY=your_secret_key
APP_PUBLIC_URL=your_public_url  

# Twilio API Credentials
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_FROM_NUMBER=your_twilio_number

# Database Configuration
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=your_database_name

# Groq API Credentials
GROQ_API_KEY=your_groq_api_key

# Eleven Labs API Credentials
ELEVENLABS_API_KEY=your_elevenlabs_api_key
VOICE_ID=your_selected_voice_id

# Company Details
COMPANY_NAME="Your Company Name"
COMPANY_BUSINESS="Your company business description"
COMPANY_PRODUCTS_SERVICES="Your product/service descriptions"
CONVERSATION_PURPOSE="Primary goal of sales conversations"
AISALESAGENT_NAME="Your Agent Name"
```

### Starting the Application

Start the front-end:
```bash
cd frontend
npm start
```

Start the back-end:
```bash
cd backend
npm run dev
```

Start the Python model (if running locally):
```bash
cd model
python app.py
```

The front-end will typically run on port 3000, the back-end on port 8000, and the Python model on port 5000, unless configured otherwise.
