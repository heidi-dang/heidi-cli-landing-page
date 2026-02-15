export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}
