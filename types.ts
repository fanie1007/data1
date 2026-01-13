
import React from 'react';

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  stat: string;
  subStat?: string;
  color: string;
  icon: React.ReactNode;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}