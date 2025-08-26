// API Integration Configuration for Vince Barbearia Dashboard
// This file contains the setup for integrating with n8n webhooks and Google Calendar

// n8n Webhook Configuration
export const n8nConfig = {
  baseUrl: process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook',
  endpoints: {
    // WhatsApp automation endpoints
    sendWhatsAppMessage: '/whatsapp/send',
    whatsAppWebhook: '/whatsapp/webhook',
    
    // Client management endpoints
    createClient: '/client/create',
    updateClient: '/client/update',
    clientWebhook: '/client/webhook',
    
    // Appointment management endpoints
    createAppointment: '/appointment/create',
    updateAppointment: '/appointment/update',
    cancelAppointment: '/appointment/cancel',
    appointmentReminder: '/appointment/reminder',
    
    // Sales and loyalty endpoints
    recordSale: '/sale/record',
    updateLoyalty: '/loyalty/update',
    sendPromotion: '/promotion/send',
  }
}

// Google Calendar Configuration
export const googleCalendarConfig = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  discoveryDoc: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  scopes: 'https://www.googleapis.com/auth/calendar',
  calendarIds: {
    main: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || 'primary',
    professionals: {
      'joao-silva': process.env.NEXT_PUBLIC_JOAO_CALENDAR_ID,
      'carlos-santos': process.env.NEXT_PUBLIC_CARLOS_CALENDAR_ID,
      'miguel-costa': process.env.NEXT_PUBLIC_MIGUEL_CALENDAR_ID,
    }
  }
}

// API Helper Functions
export class ApiService {
  // n8n Webhook calls
  static async sendToN8n(endpoint: string, data: any) {
    try {
      const response = await fetch(`${n8nConfig.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) {
        throw new Error(`n8n webhook failed: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('n8n API Error:', error)
      throw error
    }
  }

  // WhatsApp Integration
  static async sendWhatsAppMessage(to: string, message: string, type: 'text' | 'template' = 'text') {
    return this.sendToN8n(n8nConfig.endpoints.sendWhatsAppMessage, {
      to,
      message,
      type,
      timestamp: new Date().toISOString()
    })
  }

  static async sendAppointmentReminder(clientPhone: string, appointmentDetails: any) {
    const message = `Olá! Lembramos que você tem um agendamento amanhã às ${appointmentDetails.time} na Vince Barbearia. Confirme sua presença respondendo SIM. 💈`
    
    return this.sendWhatsAppMessage(clientPhone, message, 'template')
  }

  static async sendPromotionalMessage(clientPhone: string, promotion: any) {
    const message = `🎉 Oferta especial para você! ${promotion.description}. Válida até ${promotion.validUntil}. Agende já pelo WhatsApp!`
    
    return this.sendWhatsAppMessage(clientPhone, message)
  }

  // Client Management
  static async createClient(clientData: any) {
    return this.sendToN8n(n8nConfig.endpoints.createClient, {
      ...clientData,
      createdAt: new Date().toISOString(),
      source: 'dashboard'
    })
  }

  static async updateClientLoyalty(clientId: string, points: number, newLevel?: string) {
    return this.sendToN8n(n8nConfig.endpoints.updateClient, {
      clientId,
      loyaltyUpdate: {
        points,
        newLevel,
        updatedAt: new Date().toISOString()
      }
    })
  }

  // Appointment Management
  static async syncAppointmentToCalendar(appointment: any) {
    // This would integrate with Google Calendar API
    return this.sendToN8n(n8nConfig.endpoints.createAppointment, {
      ...appointment,
      syncToCalendar: true,
      calendarId: googleCalendarConfig.calendarIds.professionals[appointment.professionalId] || googleCalendarConfig.calendarIds.main
    })
  }

  // Sales Integration
  static async recordSale(saleData: any) {
    return this.sendToN8n(n8nConfig.endpoints.recordSale, {
      ...saleData,
      timestamp: new Date().toISOString(),
      source: 'dashboard'
    })
  }
}

// Google Calendar Integration Helper
export class GoogleCalendarService {
  private static gapi: any = null

  static async initializeGapi() {
    if (typeof window === 'undefined') return

    try {
      // Load Google API script
      if (!window.gapi) {
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://apis.google.com/js/api.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      await window.gapi.load('client:auth2', async () => {
        await window.gapi.client.init({
          apiKey: googleCalendarConfig.apiKey,
          clientId: googleCalendarConfig.clientId,
          discoveryDocs: [googleCalendarConfig.discoveryDoc],
          scope: googleCalendarConfig.scopes
        })
        this.gapi = window.gapi
      })
    } catch (error) {
      console.error('Failed to initialize Google API:', error)
    }
  }

  static async createCalendarEvent(appointment: any) {
    if (!this.gapi) {
      await this.initializeGapi()
    }

    const event = {
      summary: `${appointment.clientName} - ${appointment.services.join(', ')}`,
      description: `Serviços: ${appointment.services.join(', ')}\nValor: R$ ${appointment.value}\nObservações: ${appointment.notes || 'Nenhuma'}`,
      start: {
        dateTime: appointment.startTime,
        timeZone: 'America/Sao_Paulo'
      },
      end: {
        dateTime: appointment.endTime,
        timeZone: 'America/Sao_Paulo'
      },
      attendees: [
        { email: appointment.clientEmail }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 },
          { method: 'email', minutes: 1440 } // 24 hours
        ]
      }
    }

    try {
      const request = this.gapi.client.calendar.events.insert({
        calendarId: googleCalendarConfig.calendarIds.main,
        resource: event
      })

      const response = await request.execute()
      return response
    } catch (error) {
      console.error('Error creating calendar event:', error)
      throw error
    }
  }

  static async updateCalendarEvent(eventId: string, updates: any) {
    if (!this.gapi) {
      await this.initializeGapi()
    }

    try {
      const request = this.gapi.client.calendar.events.update({
        calendarId: googleCalendarConfig.calendarIds.main,
        eventId: eventId,
        resource: updates
      })

      const response = await request.execute()
      return response
    } catch (error) {
      console.error('Error updating calendar event:', error)
      throw error
    }
  }

  static async deleteCalendarEvent(eventId: string) {
    if (!this.gapi) {
      await this.initializeGapi()
    }

    try {
      const request = this.gapi.client.calendar.events.delete({
        calendarId: googleCalendarConfig.calendarIds.main,
        eventId: eventId
      })

      await request.execute()
    } catch (error) {
      console.error('Error deleting calendar event:', error)
      throw error
    }
  }
}

// Webhook listeners for real-time updates
export class WebhookService {
  static setupWebhookListeners() {
    // This would typically be set up in a separate API route
    // For demo purposes, showing the structure

    // WhatsApp webhook handler
    // POST /api/webhooks/whatsapp
    // Handles incoming WhatsApp messages for appointment booking

    // Google Calendar webhook handler  
    // POST /api/webhooks/calendar
    // Handles calendar event changes

    // n8n status webhook
    // POST /api/webhooks/n8n-status
    // Monitors n8n workflow status
  }
}

// Environment variables required:
/*
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_API_KEY=your-google-api-key
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=your-main-calendar-id
NEXT_PUBLIC_JOAO_CALENDAR_ID=joao-calendar-id
NEXT_PUBLIC_CARLOS_CALENDAR_ID=carlos-calendar-id
NEXT_PUBLIC_MIGUEL_CALENDAR_ID=miguel-calendar-id
*/

// Usage Examples:
/*
// Send WhatsApp reminder
await ApiService.sendAppointmentReminder('+5511999999999', {
  time: '14:00',
  date: '26/08/2025',
  professional: 'João Silva'
})

// Create Google Calendar event
await GoogleCalendarService.createCalendarEvent({
  clientName: 'Pedro Oliveira',
  clientEmail: 'pedro@email.com',
  services: ['Corte Masculino', 'Barba'],
  startTime: '2025-08-26T14:00:00-03:00',
  endTime: '2025-08-26T14:45:00-03:00',
  value: 60,
  notes: 'Cliente prefere silêncio'
})

// Record sale in n8n
await ApiService.recordSale({
  clientId: 'cliente-123',
  products: [{ id: 'produto-1', name: 'Pomada', quantity: 1, price: 25 }],
  total: 25,
  paymentMethod: 'cartao'
})
*/