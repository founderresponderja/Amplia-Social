export type PostTone = 'professional' | 'witty' | 'urgent' | 'inspirational' | 'educational' | 'humorous' | 'controversial';

export interface PlatformDraft {
  platform: 'LinkedIn' | 'Twitter' | 'Instagram' | 'Facebook' | 'TikTok';
  content: string;
  imagePrompt: string;
  aspectRatio: '4:3' | '16:9' | '1:1' | '1.91:1' | '9:16';
}

export interface GenerationResponse {
  linkedin: PlatformDraft;
  twitter: PlatformDraft;
  instagram: PlatformDraft;
  facebook: PlatformDraft;
  tiktok: PlatformDraft;
}

export interface ScheduledTime {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
}

export interface SavedDraft {
  id: string;
  idea: string;
  tone: PostTone;
  language: string;
  createdAt: string;
  scheduledTimes?: ScheduledTime;
  posts: {
    linkedin: { content: string; imageUrl?: string; imagePrompt: string };
    twitter: { content: string; imageUrl?: string; imagePrompt: string };
    instagram: { content: string; imageUrl?: string; imagePrompt: string };
    facebook: { content: string; imageUrl?: string; imagePrompt: string };
    tiktok: { content: string; imageUrl?: string; imagePrompt: string };
  };
}

