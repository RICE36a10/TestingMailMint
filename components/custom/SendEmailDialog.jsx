"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function SendEmailDialog({ open, onOpenChange, html }) {
  const [emails, setEmails] = useState('')
  const [subject, setSubject] = useState('')

  const sendEmail = async () => {
    const to = emails.split(',').map(e => e.trim()).filter(Boolean)
    try {
      const wrappedHtml = /^\s*<!DOCTYPE/i.test(html)
        ? html
        : `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${subject || 'Email'}</title>\n</head>\n<body>${html}</body>\n</html>`

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, html: wrappedHtml })
      })
      if (res.ok) {
        toast('Email sent successfully')
        onOpenChange(false)
      } else {
        toast('Failed to send email')
      }
    } catch (e) {
      toast('Failed to send email')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4 mt-4">
              <Input
                placeholder="Email addresses (comma separated)"
                value={emails}
                onChange={e => setEmails(e.target.value)}
              />
              <Input
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
              <Button onClick={sendEmail}>Send Email</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SendEmailDialog
