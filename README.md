# AlmaConnect - Professional Alumni Network Platform

<div align="center">

![AlmaConnect Logo](https://img.shields.io/badge/AlmaConnect-Professional_Alumni_Network-blue?style=for-the-badge&logo=graduation-cap)

**Connect • Collaborate • Career Growth**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🎯 Project Overview

**AlmaConnect** is a comprehensive professional alumni networking platform designed for the Smart India Hackathon (SIH). It serves as a LinkedIn-inspired solution that connects alumni, facilitates career growth, and creates meaningful professional relationships within educational institutions.

### 🏆 SIH Problem Statement

This project addresses the need for a robust alumni networking platform that enables:

- Professional networking between alumni and current students
- Career guidance and mentorship opportunities
- Job placement assistance through alumni networks
- Event organization and community building
- AI-powered career insights and recommendations

## ✨ Key Features

### 🌐 **Core Networking**

- **Professional Profiles**: Complete alumni profiles with career timelines
- **Connection Management**: Advanced search, filtering, and connection recommendations
- **Real-time Messaging**: Integrated chat system for seamless communication
- **Mutual Connections**: Smart networking suggestions based on common connections

### 💼 **Career Development**

- **Job Board**: Alumni-posted job opportunities with referral system
- **Career Path Visualization**: AI-generated career progression insights
- **Resume Optimization**: AI-powered resume enhancement suggestions
- **Mentorship Matching**: Smart algorithm to connect mentors with mentees

### 🤖 **AI-Powered Features**

- **Career Path Advisor**: Personalized career guidance based on alumni success stories
- **Network Insights**: Hidden connection discovery and networking opportunities
- **Story Timeline**: AI-generated visual timelines of alumni achievements
- **Smart Recommendations**: Intelligent job and connection suggestions

### 📅 **Events & Engagement**

- **Event Management**: Alumni reunion, tech talks, and networking events
- **Virtual & Physical Events**: Hybrid event support with attendance tracking
- **Community Building**: Batch-wise and department-wise communities

### 📊 **Analytics & Insights**

- **Success Metrics**: Alumni career progression analytics
- **Platform Analytics**: Engagement and networking success rates
- **Institutional Insights**: University-wide alumni network health

## 🛠️ Technology Stack

### **Frontend Framework**

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool and dev server

### **UI/UX Design System**

- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### **State Management & Data**

- **TanStack Query 5.83.0** - Server state management
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

### **Routing & Navigation**

- **React Router DOM 6.30.1** - Client-side routing

### **Styling & Animation**

- **Class Variance Authority** - Component styling utilities
- **Tailwind Animate** - Animation utilities
- **Custom CSS Variables** - Professional design system

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Akshay-Vinod-Jha/divinedevs-aluminis-sih.git
   cd alma-story-connect-main
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   ```
   http://localhost:8080
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## 📁 Project Structure

```
alma-story-connect-main/
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── feed/          # Post and feed components
│   │   ├── layout/        # Header, sidebar layouts
│   │   ├── ui/            # shadcn/ui components
│   │   └── widgets/       # Specialized widgets
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Route components
│   │   ├── AIHub.tsx      # AI features dashboard
│   │   ├── Events.tsx     # Event management
│   │   ├── Jobs.tsx       # Job board
│   │   ├── Network.tsx    # Alumni network
│   │   └── StoryTimeline.tsx # AI story timelines
│   ├── assets/            # Images and media
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles & design system
├── components.json        # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

AlmaConnect features a professional design system inspired by LinkedIn:

### **Color Palette**

- **Primary Blue**: `#1B237E` - Professional & trustworthy
- **Accent Orange**: `#FF5722` - Action & energy
- **Success Green**: `#22C55E` - Positive actions
- **Warning Yellow**: `#F59E0B` - Alerts & notifications

### **Typography**

- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### **Components**

- Professional card styling with subtle shadows
- Gradient backgrounds for hero sections
- Smooth transitions and hover effects
- Consistent spacing and border radius

## 🔧 Key Components

### **Feed System**

- `CreatePost.tsx` - Post creation interface
- `PostCard.tsx` - Individual post display with interactions

### **Networking**

- `Network.tsx` - Alumni connection management
- Connection suggestions and mutual connections

### **AI Features**

- `AIHub.tsx` - Central AI features dashboard
- `ChatBot.tsx` - AI assistant integration
- `StoryTimeline.tsx` - AI-generated story visualizations

### **Job Management**

- `Jobs.tsx` - Complete job board with filtering
- Referral system integration
- Application tracking

## 🚀 Deployment

### **Development Build**

```bash
npm run build:dev
```

### **Production Build**

```bash
npm run build
```

### **Deployment Platforms**

- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 🤝 Contributing

We welcome contributions to AlmaConnect! Please follow these steps:

1. **Fork the Repository**
2. **Create Feature Branch** (`git checkout -b feature/amazing-feature`)
3. **Commit Changes** (`git commit -m 'Add amazing feature'`)
4. **Push to Branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

### **Code Style**

- Follow TypeScript best practices
- Use meaningful component and variable names
- Maintain consistent formatting with Prettier
- Follow ESLint rules

## 📄 License

This project is developed for the Smart India Hackathon (SIH) and is open for educational and development purposes.

## 👥 Team - Divine Devs

**Project**: Alumni Network Platform for SIH
**Institution**: [Your Institution Name]
**Track**: Software

## 📞 Support

For questions, issues, or contributions:

- **GitHub Issues**: [Create an issue](https://github.com/Akshay-Vinod-Jha/divinedevs-aluminis-sih/issues)
- **Email**: [Your team email]
- **SIH Team**: Divine Devs

---

<div align="center">

**Built with ❤️ for Smart India Hackathon**

[![SIH 2024](https://img.shields.io/badge/SIH-2024-orange?style=for-the-badge)](https://sih.gov.in/)

</div>
