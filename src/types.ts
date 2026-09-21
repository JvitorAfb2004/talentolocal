export type TabType = 'inicio' | 'vagas' | 'projetos' | 'mensagens' | 'perfil';

export interface Job {
  id: string;
  category: string;
  categoryColor: string;
  categoryBadgeBg: string;
  categoryBadgeText: string;
  client: string;
  clientAvatarType: 'text' | 'image';
  clientAvatarText?: string;
  clientAvatarBg?: string;
  clientAvatarIcon?: string;
  timeAgo: string;
  title: string;
  description: string;
  value: number;
  location: string;
  deadlineDays: number;
  tags: string[];
}

export type ProjectStatus = 'briefing' | 'rascunho' | 'revisao' | 'envio' | 'concluido';

export interface Project {
  id: string;
  client: string;
  clientAvatarText: string;
  clientAvatarBg: string;
  title: string;
  serviceCategory: string;
  deadlineBadge: string;
  deadlineTime?: string;
  deadlineDaysRemaining?: number;
  deadlineColor: 'red' | 'yellow' | 'gray';
  value: number;
  statusLabel: string;
  progressPercentage: number;
  currentStep: ProjectStatus;
  tags: string[];
  isGuaranteed?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'client';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  clientName: string;
  clientAvatarType: 'text' | 'image';
  clientAvatarUrl?: string;
  clientAvatarText?: string;
  clientAvatarBg?: string;
  clientOnline: boolean;
  projectTag: string;
  statusBadge?: string;
  statusBadgeColor?: 'red' | 'purple' | 'yellow' | 'green';
  lastMessageSnippet: string;
  lastMessageTime: string;
  unreadCount: number;
  subtitleInfo: string;
  priceOrStatus: string;
  messages: ChatMessage[];
}

export interface PortfolioItem {
  id: string;
  category: string;
  categoryTagColor: string;
  title: string;
  client: string;
  price: number;
  tool: string;
  rating?: number;
  iconType: 'bread' | 'coffee' | 'video' | 'chart';
  bgColor: string;
}

export interface Review {
  id: string;
  clientInitial: string;
  clientName: string;
  projectTitle: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

export interface Course {
  id: string;
  title: string;
  level: string;
  lessons: number;
  progress: number;
  icon: 'phone' | 'palette' | 'spreadsheet';
}
