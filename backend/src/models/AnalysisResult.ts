import mongoose, { Document, Schema } from 'mongoose';

export interface IPrediction {
  condition: {
    id: string;
    name: string;
    description: string;
    symptoms: string[];
    treatments: {
      type: 'medication' | 'lifestyle' | 'procedure';
      name: string;
      description: string;
      duration?: string;
      instructions: string[];
    }[];
    severity: 'mild' | 'moderate' | 'severe';
    contagious: boolean;
  };
  confidence: number;
  recommendedActions: string[];
}

export interface IAnalysisResult extends Document {
  userId: mongoose.Types.ObjectId;
  imageUrl: string;
  originalFilename: string;
  fileSize: number;
  mimeType: string;
  predictions: IPrediction[];
  confidence: number;
  status: 'processing' | 'completed' | 'failed';
  errorMessage?: string;
  processingTime?: number;
  aiModelVersion?: string;
  metadata: {
    imageWidth: number;
    imageHeight: number;
    uploadSource: 'web' | 'mobile';
    userAgent?: string;
  };
  notes?: string;
  reviewedBy?: mongoose.Types.ObjectId; // Reference to doctor/admin who reviewed
  reviewedAt?: Date;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const analysisSchema = new Schema<IAnalysisResult>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  originalFilename: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  predictions: [{
    condition: {
      id: String,
      name: String,
      description: String,
      symptoms: [String],
      treatments: [{
        type: {
          type: String,
          enum: ['medication', 'lifestyle', 'procedure']
        },
        name: String,
        description: String,
        duration: String,
        instructions: [String]
      }],
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe']
      },
      contagious: Boolean
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    recommendedActions: [String]
  }],
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing',
    index: true
  },
  errorMessage: String,
  processingTime: Number, // in milliseconds
  aiModelVersion: String,
  metadata: {
    imageWidth: Number,
    imageHeight: Number,
    uploadSource: {
      type: String,
      enum: ['web', 'mobile'],
      default: 'web'
    },
    userAgent: String
  },
  notes: String,
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Indexes for performance
analysisSchema.index({ userId: 1, createdAt: -1 });
analysisSchema.index({ status: 1, createdAt: -1 });
analysisSchema.index({ 'predictions.condition.name': 1 });

export const AnalysisResult = mongoose.model<IAnalysisResult>('AnalysisResult', analysisSchema);
