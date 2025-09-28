import type { TimeRangeDefinition } from "../types/timeRange";

export const TIME_RANGE_DEFINITIONS: TimeRangeDefinition[] = [ 
  {
    type: 'valle',
    title: 'Valle',
    hours: '00:00 - 06:00',
    description: 'Horas de menor demanda',
    startHour: 0,
    endHour: 6,
    color: {
      primary: '#4CAF50',
      secondary: '#A5D6A7',
      text: '#FFFFFF',
    },
    icon: '🌄',
  },
  {
    type: 'llano',
    title: 'Llano',
    hours: '06:00 - 18:00',
    description: 'Horas de demanda moderada',
    startHour: 6,
    endHour: 18,
    color: {
      primary: '#FFEB3B',
      secondary: '#FFF176',
      text: '#000000',
    },
    icon: '🌞',
  },
  {
    type: 'punta',
    title: 'Punta',
    hours: '18:00 - 24:00',
    description: 'Horas de mayor demanda',
    startHour: 18,
    endHour: 24,
    color: {
      primary: '#F44336',
      secondary: '#EF5350',
      text: '#FFFFFF',
    },
    icon: '🌆',
  },
] as const

export const getTimeRangeDefinition = (type: string) => {
  return TIME_RANGE_DEFINITIONS.find(def => def.type === type);
}

/*
  TODO: Refactorizar para que tengasn los rangos reales
  
  const valleHours = [0, 1, 2, 3, 4, 5, 6, 22, 23];
  const llanoHours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  const puntaHours = [18, 19, 20, 21];
*/