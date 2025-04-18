import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { SeedIcon } from '../../components/StageIcons';

interface Content {
  id: number;
  user_id: number;
  stage: string;
  type: string;
  content: string | null;
  media_url: string | null;
  score: number;
  created_at: string;
}

const SeedStage = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const response = await api.get('/contents', {
        params: { stage: 'seed' }
      });
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check if file is an image
      if (!selectedFile.type.startsWith('image/')) {
        setError('이미지 파일만 업로드 가능합니다.');
        return;
      }
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('식물 사진을 선택해주세요.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('stage', 'seed');
      formData.append('type', 'image');
      formData.append('content', description);
      formData.append('file', file);
      
      await api.post('/contents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh contents
      fetchContents();
      
      // Reset form
      setFile(null);
      setPreview(null);
      setDescription('');
      
      // Show success message or redirect
      navigate('/');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <SeedIcon className="h-8 w-8 text-garden-primary mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">씨앗 단계</h1>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">식물 사진 업로드</h2>
        <p className="text-gray-600 mb-6">
          주변에서 볼 수 있는 식물 사진을 찍어 업로드해보세요. 
          식물의 이름이나 특징을 알고 있다면 설명도 함께 작성해주세요.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="label">식물 사진</label>
            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              {preview ? (
                <div className="space-y-4">
                  <img 
                    src={preview} 
                    alt="미리보기" 
                    className="mx-auto h-64 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="btn btn-secondary"
                  >
                    다시 선택
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-garden-primary hover:text-garden-accent"
                    >
                      <span>사진 업로드</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">또는 여기로 드래그하세요</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF 최대 10MB</p>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="label">설명 (선택사항)</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="input"
              placeholder="식물에 대한 설명을 작성해주세요."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isUploading || !file}
            >
              {isUploading ? '업로드 중...' : '업로드하기'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Previous uploads */}
      <h2 className="text-xl font-semibold mb-4">내가 업로드한 식물 사진</h2>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-garden-primary"></div>
        </div>
      ) : contents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contents.map((content) => (
            <div key={content.id} className="card overflow-hidden">
              {content.media_url && (
                <img
                  src={content.media_url}
                  alt="식물 사진"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                {content.content && (
                  <p className="text-gray-700">{content.content}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(content.created_at).toLocaleDateString()}
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    +{content.score} 점
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-gray-50 text-center py-12">
          <p className="text-gray-500">아직 업로드한 식물 사진이 없습니다.</p>
          <p className="text-gray-500 mt-2">첫 번째 식물 사진을 업로드해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default SeedStage;