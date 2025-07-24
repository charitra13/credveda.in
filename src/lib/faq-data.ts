export interface FAQItem {
  id: string
  question: string
  answer: string
  category?: string
  tags?: string[]
}

export const faqData: FAQItem[] = [
  {
    id: "what-is-credveda",
    question: "What is CredVeda?",
    answer: "CredVeda is an AI-powered financial credit analysis platform that helps you understand your credit profile, get personalized loan recommendations, and connect with financial advisors.",
    category: "general",
    tags: ["about", "platform", "credit analysis", "credveda"]
  },
  {
    id: "credit-analysis-accuracy",
    question: "How accurate is the credit analysis?",
    answer: "Our AI-powered analysis uses advanced SHAP (SHapley Additive exPlanations) methodology to provide highly accurate credit assessments with detailed explanations for each factor affecting your credit score.",
    category: "analysis",
    tags: ["accuracy", "AI", "SHAP", "methodology", "credit score"]
  },
  {
    id: "compare-loans-nbfcs",
    question: "Can I compare loans from multiple NBFCs?",
    answer: "Yes, CredVeda connects you with a network of NBFCs and financial advisors, allowing you to compare interest rates, terms, and conditions across multiple lenders to find the best deal.",
    category: "loans",
    tags: ["loans", "NBFCs", "comparison", "lenders", "rates"]
  },
  {
    id: "connect-with-dsas",
    question: "How do I connect with DSAs?",
    answer: "Through our platform, you can directly connect with verified Direct Selling Agents (DSAs) who can help you navigate the loan application process and secure better rates.",
    category: "support",
    tags: ["DSA", "agents", "loan application", "support"]
  },
  {
    id: "data-security",
    question: "Is my financial data secure?",
    answer: "Absolutely. We use bank-grade encryption and security measures to protect your financial data. Your information is never shared without your explicit consent.",
    category: "security",
    tags: ["security", "privacy", "data protection", "encryption"]
  },
  {
    id: "required-documents",
    question: "What documents do I need to upload?",
    answer: "You typically need your credit report, income statements, and basic identity documents. Our system will guide you through the specific requirements based on your analysis type.",
    category: "documents",
    tags: ["documents", "upload", "requirements", "credit report"]
  }
] 