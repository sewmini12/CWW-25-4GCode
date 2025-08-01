export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SkinCondition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  treatments: Treatment[];
  severity: 'mild' | 'moderate' | 'severe';
  contagious: boolean;
}

export interface Treatment {
  id: string;
  type: 'medication' | 'lifestyle' | 'procedure';
  name: string;
  description: string;
  duration?: string;
  instructions: string[];
}

export interface AnalysisResult {
  id: string;
  userId: string;
  imageUrl: string;
  predictions: Prediction[];
  confidence: number;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
  notes?: string;
}

export interface Prediction {
  condition: SkinCondition;
  confidence: number;
  recommendedActions: string[];
}

export interface AnalysisHistory {
  id: string;
  imageUrl: string;
  result: AnalysisResult;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'outbreak' | 'reminder' | 'result' | 'general';
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface OutbreakAlert {
  id: string;
  disease: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  caseCount: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  preventionTips: string[];
  createdAt: string;
}

export interface UploadResponse {
  success: boolean;
  imageUrl: string;
  analysisId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
