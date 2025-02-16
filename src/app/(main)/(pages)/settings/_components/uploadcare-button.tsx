'use client'; // Only needed if using React Server Components
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

type Props = {
  onUpload: (e: string) => any;
};

function UploadCareButton({ onUpload }: Props) {
  const router = useRouter();
  const uploaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const fileUrl = e.detail?.cdnUrl;
      if (fileUrl) {
        await onUpload(fileUrl);
        router.refresh();
      }
    };

    const uploader = uploaderRef.current;
    if (uploader) {
      uploader.addEventListener('file-upload-success', handleUpload);
    }

    return () => {
      if (uploader) {
        uploader.removeEventListener('file-upload-success', handleUpload);
      }
    };
  }, [onUpload, router]);

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, camera, facebook, gdrive"
        cameraModes="photo, video"
        classNameUploader="uc-light"
        pubkey="317b330f2e33df57a750"
      />
      <div ref={uploaderRef} />
    </div>
  );
}

export default UploadCareButton;