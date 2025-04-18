import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
  SeedIcon, 
  SproutIcon, 
  GrowthIcon, 
  FlowerIcon, 
  FruitIcon, 
  HarvestIcon 
} from '../components/StageIcons';

interface Score {
  id: number;
  user_id: number;
  stage: string;
  score: number;
  updated_at: string;
}

const stageInfo = {
  seed: {
    name: '씨앗',
    description: '식물 사진을 업로드하여 텃밭을 시작해보세요.',
    icon: SeedIcon,
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    path: '/stages/seed'
  },
  sprout: {
    name: '새싹',
    description: '환경 퀴즈를 풀고 지식을 쌓아보세요.',
    icon: SproutIcon,
    color: 'bg-green-100',
    textColor: 'text-green-800',
    path: '/stages/sprout'
  },
  growth: {
    name: '성장',
    description: '환경 보호 실천 체크리스트를 작성해보세요.',
    icon: GrowthIcon,
    color: 'bg-emerald-100',
    textColor: 'text-emerald-800',
    path: '/stages/growth'
  },
  flower: {
    name: '꽃',
    description: '환경 보호에 대한 생각을 글로 작성해보세요.',
    icon: FlowerIcon,
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    path: '/stages/flower'
  },
  fruit: {
    name: '열매',
    description: '재활용 실천 사진을 인증해보세요.',
    icon: FruitIcon,
    color: 'bg-red-100',
    textColor: 'text-red-800',
    path: '/stages/fruit'
  },
  harvest: {
    name: '수확',
    description: '환경 관련 영상을 공유해보세요.',
    icon: HarvestIcon,
    color: 'bg-amber-100',
    textColor: 'text-amber-800',
    path: '/stages/harvest'
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [currentStage, setCurrentStage] = useState<string>('seed');
  const [totalScore, setTotalScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 점수 데이터 가져오기
        const [scoresResponse, stageResponse] = await Promise.all([
          api.get('/scores'),
          api.get('/scores/current-stage')
        ]);
        
        // 데이터 안전하게 처리
        const scoresData = Array.isArray(scoresResponse.data) ? scoresResponse.data : [];
        setScores(scoresData);
        
        // 현재 단계 설정 (유효하지 않은 경우 seed로 기본값 설정)
        const stage = stageResponse.data;
        setCurrentStage(stage && stageInfo[stage as keyof typeof stageInfo] ? stage : 'seed');
        
        // 총점 계산
        const total = scoresData.reduce((sum: number, score: Score) => sum + score.score, 0);
        setTotalScore(total);
      } catch (error) {
        console.error('Error fetching data:', error);
        // 오류 발생 시 기본값 설정
        setScores([]);
        setTotalScore(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-garden-primary"></div>
      </div>
    );
  }

  const currentStageInfo = stageInfo[currentStage as keyof typeof stageInfo];
  const CurrentStageIcon = currentStageInfo.icon;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">안녕하세요, {user?.username}님!</h1>
        <p className="mt-2 text-lg text-gray-600">
          디지털 텃밭 가꾸기에 오신 것을 환영합니다. 현재 총 {totalScore}점을 획득하셨습니다.
        </p>
      </div>

      {/* Current Stage Card */}
      <div className={`card mb-8 border-l-4 border-garden-primary ${currentStageInfo.color}`}>
        <div className="flex items-center">
          <div className="mr-4">
            <CurrentStageIcon className="h-12 w-12 text-garden-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">현재 단계: {currentStageInfo.name}</h2>
            <p className="text-gray-600">{currentStageInfo.description}</p>
            <Link 
              to={currentStageInfo.path} 
              className="mt-2 inline-block btn btn-primary"
            >
              활동 시작하기
            </Link>
          </div>
        </div>
      </div>

      {/* All Stages Progress */}
      <h2 className="text-xl font-semibold mb-4">단계별 진행 상황</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(stageInfo).map(([stage, info]) => {
          const stageScore = scores.find(s => s.stage === stage)?.score || 0;
          const isCurrentStage = currentStage === stage;
          const isCompleted = stageScore >= 30; // Assuming 30 points to complete a stage
          
          return (
            <div 
              key={stage} 
              className={`card ${isCurrentStage ? 'ring-2 ring-garden-primary' : ''}`}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full ${info.color} mr-3`}>
                  <info.icon className={`h-6 w-6 ${info.textColor}`} />
                </div>
                <h3 className="text-lg font-medium">{info.name} 단계</h3>
                {isCompleted && (
                  <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    완료
                  </span>
                )}
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>진행도</span>
                  <span>{stageScore}/30 점</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-garden-primary rounded-full h-2" 
                    style={{ width: `${Math.min(100, (stageScore / 30) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{info.description}</p>
              <Link 
                to={info.path} 
                className={`btn ${isCurrentStage ? 'btn-primary' : 'btn-secondary'} w-full`}
              >
                {isCompleted ? '다시 활동하기' : '활동하기'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;