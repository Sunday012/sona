import type {
  ApiError,
  AuthUser,
  CommunicationMode,
  HealthResponse,
  IntakeCategory,
  PatientProfile,
  RegistrationResponse,
  Session,
  WellnessSession,
} from '@sona/types';

export class SonaApiClient {
  constructor(
    private readonly baseUrl: string,
    private readonly getToken: () => string | undefined = () => undefined,
  ) {}

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...init.headers,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      const fallback: ApiError = { statusCode: response.status, message: 'Something went wrong' };
      throw (await response.json().catch(() => fallback)) as ApiError;
    }
    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
  }

  health() {
    return this.request<HealthResponse>('/health');
  }
  login(email: string, password: string) {
    return this.request<Session>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  registerPatient(input: {
    email: string;
    password: string;
    fullName: string;
    dateOfBirth: string;
    countryCode: string;
    timezone: string;
    acceptedTerms: boolean;
  }) {
    return this.request<RegistrationResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ ...input, role: 'PATIENT' }),
    });
  }
  verifyEmail(token: string) {
    return this.request<{ verified: true; status: string }>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }
  resendVerification(email: string) {
    return this.request<{ message: string; developmentVerificationToken?: string }>(
      '/auth/resend-verification',
      { method: 'POST', body: JSON.stringify({ email }) },
    );
  }
  forgotPassword(email: string) {
    return this.request<{ message: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }
  resetPassword(token: string, newPassword: string) {
    return this.request<{ reset: true }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }
  me() {
    return this.request<AuthUser>('/auth/me');
  }
  logout(refreshToken: string) {
    return this.request<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }
  patientProfile() {
    return this.request<PatientProfile>('/patients/me');
  }
  updatePatientProfile(input: {
    preferredDisplayName?: string;
    ageRange?: string;
    communicationPreference?: CommunicationMode;
    supportGoals?: string[];
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    completeOnboarding?: boolean;
  }) {
    return this.request<PatientProfile>('/patients/me', {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  }
  sessions() {
    return this.request<WellnessSession[]>('/sessions');
  }
  requestImmediateSession(input: {
    category: IntakeCategory;
    preferredMode: CommunicationMode;
    context?: string;
  }) {
    return this.request<WellnessSession>('/sessions/request', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }
}
