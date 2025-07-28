
"use client"
import React, { useMemo } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import prettier from 'prettier/standalone'
import parserHtml from 'prettier/plugins/html'

function ViewHtmlDialog({ openDialog, htmlCode, closeDialog }) {
    const formattedHtml = useMemo(() => {
        try {
            return prettier.format(htmlCode || '', {
                parser: 'html',
                plugins: [parserHtml]
            })
        } catch (e) {
            console.error(e)
            return htmlCode
        }
    }, [htmlCode])

    const CopyCode = async () => {
        await navigator.clipboard.writeText(htmlCode)
        toast('Code copied to clipboard')
        closeDialog(false)
    }

    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <div className='flex items-center justify-between'>
                            <h2>HTML Email Template</h2>
                            <Copy className='p-2 bg-gray-100 rounded-full h-9 w-9 cursor-pointer'
                                onClick={CopyCode}
                            />
                        </div>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className='max-h-[400px] overflow-auto bg-black text-white rounded-lg p-5'>
                            <pre className='whitespace-pre-wrap break-all'>
                                <code>
                                    {formattedHtml}
                                </code>
                            </pre>

                        </div>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default ViewHtmlDialog