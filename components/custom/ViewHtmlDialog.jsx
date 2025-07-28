
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
        <Dialog  open={openDialog} onOpenChange={closeDialog} >
            <DialogContent className={'bg-gray-300 '}>
                <DialogHeader className={''}>
                    <DialogTitle asChild>
                        <div className='flex items-center justify-between '>
                            <h2 className={'text-2xl'}>HTML Email Template</h2>
                            <Copy className='p-2 rounded-md  h-12 w-12 m-4 cursor-pointer'
                                onClick={CopyCode}
                            />
                        </div>
                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className='max-h-[600px] max-w-[600px] overflow-auto bg-gray-800 text-white  p-5 rounded-md'>
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
