export type UserRole = 'PATIENT' | 'THERAPIST' | 'ADMIN' | 'PRIVACY_OFFICER';
export type AccountStatus =
  | 'PENDING_EMAIL_VERIFICATION'
  | 'ACTIVE'
  | 'PENDING_REVIEW'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'REJECTED'
  | 'SUSPENDED'
  | 'DELETION_PENDING';
export type CommunicationMode = 'CHAT' | 'AUDIO' | 'VIDEO';
export type IntakeCategory =
  | 'ANXIETY'
  | 'ACADEMIC_STRESS'
  | 'RELATIONSHIPS'
  | 'DEPRESSION'
  | 'CAREER'
  | 'SELF_ESTEEM'
  | 'GENERAL_SUPPORT'
  | 'DISTRESS';
export interface ApiError {
  statusCode: number;
  message: string;
  requestId?: string;
}
export interface HealthResponse {
  status: 'ok';
  service: string;
  timestamp: string;
}
export interface Session {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
}

export interface RegistrationResponse {
  userId: string;
  status: AccountStatus;
  verificationRequired: boolean;
  developmentVerificationToken?: string;
}

export interface AuthUser {
  id: string;
  alias: string;
  roles: UserRole[];
  status: AccountStatus;
  emailVerifiedAt: string | null;
  countryCode: string;
  timezone: string;
  createdAt: string;
  patient?: { onboardingStage: string; onboardingCompletedAt: string | null } | null;
}

export interface PatientProfile {
  id: string;
  medicalRecordNumber: string;
  ageRange: string | null;
  communicationPreference: CommunicationMode | null;
  supportGoals: string[];
  emailNotifications: boolean;
  pushNotifications: boolean;
  onboardingStage: string;
  onboardingCompletedAt: string | null;
  createdAt?: string;
}

export interface WellnessSession {
  id: string;
  type: 'IMMEDIATE' | 'SCHEDULED';
  status: 'QUEUED' | 'MATCHING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'ESCALATED' | 'EXPIRED';
  intakeCategory?: IntakeCategory;
  preferredMode: CommunicationMode;
  crisisFlag?: boolean;
  crisisSupportRequired?: boolean;
  message?: string;
  queuedAt: string;
  scheduledFor?: string | null;
  startedAt?: string | null;
  endedAt?: string | null;
  rating?: number | null;
}
