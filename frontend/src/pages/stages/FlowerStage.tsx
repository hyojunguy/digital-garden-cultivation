import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FlowerIcon } from '../../components/StageIcons';

interface Post {
  id: number;
  user_id: number;
  username: string;
  stage: string;
  type: string;
  content: string;
  created_at: string;
}

const FlowerStage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'view'

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/contents', {
        params: { 
          stage: 'flower',
          type: 'text'
        }
      });
      
      // Check if response.data is an array
      const postsData = Array.isArray(response.data) ? response.data : [];
      
      // Add username to each post
      const postsWithUsernames = await Promise.all(
        postsData.map(async (post: any) => {
          try {
            const userResponse = await api.get(`/users/${post.user_id}`);
            return {
              ...post,
              username: userResponse.data.username
            };
          } catch (error) {
            return {
              ...post,
              username: '익명'
            };
          }
        })
      );
      
      setPosts(postsWithUsernames);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' || content.trim() === '') {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      await api.post('/contents', {
        stage: 'flower',
        type: 'text',
        content: JSON.stringify({
          title: title,
          content: content
        })
      });
      
      // Reset form
      setTitle('');
      setContent('');
      
      // Refresh posts
      fetchPosts();
      
      // Switch to view tab
      setActiveTab('view');
    } catch (error) {
      console.error('Error submitting post:', error);
      setError('게시글 작성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <FlowerIcon className="h-8 w-8 text-garden-primary mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">꽃 단계</h1>
      </div>

      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'write'
                  ? 'border-garden-primary text-garden-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('write')}
            >
              글쓰기
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'view'
                  ? 'border-garden-primary text-garden-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('view')}
            >
              게시글 보기
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'write' ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">환경 보호에 대한 생각 작성하기</h2>
              <p className="text-gray-600 mb-6">
                환경 보호에 대한 여러분의 생각이나 실천 방법을 자유롭게 작성해보세요.
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
                    placeholder="제목을 입력하세요"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="label">내용</label>
                  <textarea
                    id="content"
                    rows={8}
                    className="input"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="환경 보호에 대한 생각을 자유롭게 작성해보세요."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '게시 중...' : '게시하기'}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">환경 보호 게시판</h2>
              <p className="text-gray-600 mb-6">
                다른 사람들의 환경 보호에 대한 생각을 읽어보세요.
              </p>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-garden-primary"></div>
                </div>
              ) : posts.length > 0 ? (
                <div className="space-y-6">
                  {posts.map((post) => {
                    const postData = JSON.parse(post.content);
                    return (
                      <div key={post.id} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">{postData.title}</h3>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">{postData.content}</p>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{post.username}</span>
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">아직 게시글이 없습니다.</p>
                  <p className="text-gray-500 mt-2">첫 번째 게시글을 작성해보세요!</p>
                  <button
                    onClick={() => setActiveTab('write')}
                    className="mt-4 btn btn-primary"
                  >
                    글쓰기
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

export default FlowerStage;