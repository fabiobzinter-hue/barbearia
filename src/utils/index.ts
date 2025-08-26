import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  return phone
}

export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

export function getTimeSlots(start: string, end: string, duration: number): string[] {
  const slots: string[] = []
  const startTime = new Date(`2000-01-01 ${start}`)
  const endTime = new Date(`2000-01-01 ${end}`)
  
  let currentTime = new Date(startTime)
  
  while (currentTime <= endTime) {
    slots.push(formatTime(currentTime))
    currentTime.setMinutes(currentTime.getMinutes() + duration)
  }
  
  return slots
}

export function generateColors(count: number): string[] {
  const baseColors = [
    '#7716ff', '#d946ef', '#f8d181', '#8b4513',
    '#4b05ad', '#701a75', '#f0b233', '#715a4e'
  ]
  
  const colors: string[] = []
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length])
  }
  
  return colors
}

export function getOccupationColor(percentage: number): string {
  if (percentage >= 90) return '#7716ff' // Roxo - muito ocupado
  if (percentage >= 70) return '#d946ef' // Rosa - ocupado
  if (percentage >= 50) return '#f8d181' // Dourado - moderado
  if (percentage >= 30) return '#f0b233' // Laranja - baixo
  return '#8b4513' // Marrom - muito baixo
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}