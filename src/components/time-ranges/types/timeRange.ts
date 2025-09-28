export type TimeRangeType = 'valle' | 'llano' | 'punta';

export interface TimeRangeDefinition {
  type: TimeRangeType;
  title: string;
  hours: string;
  description: string;
  startHour: number;
  endHour: number;
  color: {
    primary: string;
    secondary: string;
    text: string;
  };
  icon: string;
}

export interface TimeRangeData {
  definition: TimeRangeDefinition;
  currentPrice?: number;
  avgPrice: number;
  isActive: boolean;
  totalHours: number;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface TimeRangeStats {
  valle: Omit<TimeRangeData, 'definition'>;
  llano: Omit<TimeRangeData, 'definition'>;
  punta: Omit<TimeRangeData, 'definition'>;
}