'use client'
import React, { useEffect, useRef } from 'react'
import '@uploadcare/blocks/web/lr-file-uploader-regular.min.css'
import { useRouter } from 'next/navigation'


type Props = {
  onUpload: (cdnUrl: string) => void
}

const UploadCareButton = ({ onUpload }: Props): JSX.Element => {
  const router = useRouter()
  const ctxProviderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleUpload = (e: any) => {
      const fileUrl = e.detail.cdnUrl
      if (fileUrl) {
        onUpload(fileUrl)
        router.refresh()
      }
    }

    const ctxProvider = ctxProviderRef.current
    if (ctxProvider) {
      ctxProvider.addEventListener('file-upload-success', handleUpload)
    }

    return () => {
      if (ctxProvider) {
        ctxProvider.removeEventListener('file-upload-success', handleUpload)
      }
    }
  }, [onUpload, router])

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        pubkey="60f94312d7ba06c65634"
      />
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
      />
      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
    </div>
  )
}

export default UploadCareButton