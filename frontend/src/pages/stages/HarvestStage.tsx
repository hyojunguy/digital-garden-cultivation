import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { HarvestIcon } from '../../components/StageIcons';

interface VideoContent {
  id: number;
  user_id: number;
  username: string;
  stage: string;
  type: string;
  content: string;
  created_at: string;
}

const HarvestStage = () => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('share'); // 'share' or 'view'

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await api.get('/contents', {
        params: { 
          stage: 'harvest',
          type: 'video'
        }
      });
      
      // Ensure response.data is an array
      const videosData = Array.isArray(response.data) ? response.data : [];
      
      // Add username to each video
      const videosWithUsernames = await Promise.all(
        videosData.map(async (video: any) => {
          try {
            const userResponse = await api.get(`/users/${video.user_id}`);
            return {
              ...video,
              username: userResponse.data.username
            };
          } catch (error) {
            return {
              ...video,
              username: '익명'
            };
          }
        })
      );
      
      setVideos(videosWithUsernames);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    // Extract video ID from various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    
    return url; // Return original if not a valid YouTube URL
  };

  const isValidYoutubeUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return match && match[2].length === 11;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' || videoUrl.trim() === '') {
      setError('제목과 영상 URL을 모두 입력해주세요.');
      return;
    }
    
    if (!isValidYoutubeUrl(videoUrl)) {
      setError('유효한 YouTube URL을 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await api.post('/contents', {
        stage: 'harvest',
        type: 'video',
        content: JSON.stringify({
          title: title,
          videoUrl: videoUrl,
          description: description
        })
      });
      
      // Reset form
      setTitle('');
      setVideoUrl('');
      setDescription('');
      
      // Refresh videos
      fetchVideos();
      
      // Switch to view tab
      setActiveTab('view');
    } catch (error) {
      console.error('Error submitting video:', error);
      setError('영상 공유에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <HarvestIcon className="h-8 w-8 text-garden-primary mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">수확 단계</h1>
      </div>

      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'share'
                  ? 'border-garden-primary text-garden-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('share')}
            >
              영상 공유하기
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'view'
                  ? 'border-garden-primary text-garden-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('view')}
            >
              공유된 영상 보기
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'share' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">환경 관련 영상 공유하기</h2>
              <p className="text-gray-600 mb-6">
                환경 보호, 재활용, 지구 온난화 등 환경과 관련된 유익한 YouTube 영상을 공유해보세요.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="title" className="label">제목</label>
                  <input
                    type="text"
                    id="title"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="영상 제목을 입력하세요"
                  />
                </div>

                <div>
                  <label htmlFor="videoUrl" className="label">YouTube URL</label>
                  <input
                    type="text"
                    id="videoUrl"
                    className="input"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="예: https://www.youtube.com/watch?v=..."
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    YouTube 영상 URL을 입력해주세요.
                  </p>
                </div>

                <div>
                  <label htmlFor="description" className="label">설명 (선택사항)</label>
                  <textarea
                    id="description"
                    rows={4}
                    className="input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="영상에 대한 간단한 설명이나 느낀 점을 작성해주세요."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '공유 중...' : '영상 공유하기'}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">공유된 환경 영상</h2>
              <p className="text-gray-600 mb-6">
                다른 사람들이 공유한 환경 관련 영상을 시청해보세요.
              </p>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-garden-primary"></div>
                </div>
              ) : videos.length > 0 ? (
                <div className="space-y-8">
                  {videos.map((video) => {
                    const videoData = JSON.parse(video.content);
                    const embedUrl = getYoutubeEmbedUrl(videoData.videoUrl);
                    
                    return (
                      <div key={video.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            src={embedUrl}
                            title={videoData.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-64"
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-medium mb-2">{videoData.title}</h3>
                          {videoData.description && (
                            <p className="text-gray-700 mb-4">{videoData.description}</p>
                          )}
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>{video.username}</span>
                            <span>{new Date(video.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">아직 공유된 영상이 없습니다.</p>
                  <p className="text-gray-500 mt-2">첫 번째 환경 영상을 공유해보세요!</p>
                  <button
                    onClick={() => setActiveTab('share')}
                    className="mt-4 btn btn-primary"
                  >
                    영상 공유하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HarvestStage;