import React, { useState } from 'react';
import axios from 'axios';

interface ImageUploadProps {
  onUploadSuccess: (imageUrl: string) => void;
  onUploadError: (error: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, onUploadError }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('stage', 'seed');

      const response = await axios.post('/api/v1/contents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.file_url) {
        onUploadSuccess(response.data.file_url);
      } else {
        throw new Error('No file URL received');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700">
        식물 사진 업로드
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-garden-primary file:text-white
          hover:file:bg-garden-accent"
      />
      {isUploading && (
        <p className="mt-2 text-sm text-gray-500">업로드 중...</p>
      )}
    </div>
  );
};

export default ImageUpload;