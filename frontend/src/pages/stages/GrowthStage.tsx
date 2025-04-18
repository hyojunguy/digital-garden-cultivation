import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { GrowthIcon } from '../../components/StageIcons';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const initialChecklist: ChecklistItem[] = [
  { id: '1', text: '오늘 사용하지 않는 전자기기의 플러그를 뽑았어요', checked: false },
  { id: '2', text: '오늘 샤워 시간을 5분 이내로 줄였어요', checked: false },
  { id: '3', text: '오늘 대중교통이나 자전거를 이용했어요', checked: false },
  { id: '4', text: '오늘 일회용품 사용을 줄였어요', checked: false },
  { id: '5', text: '오늘 음식물 쓰레기를 줄이기 위해 노력했어요', checked: false },
  { id: '6', text: '오늘 분리수거를 정확하게 했어요', checked: false },
  { id: '7', text: '오늘 텀블러나 개인 컵을 사용했어요', checked: false },
  { id: '8', text: '오늘 불필요한 조명을 꺼두었어요', checked: false },
  { id: '9', text: '오늘 에어컨/난방 사용을 적정 온도로 유지했어요', checked: false },
  { id: '10', text: '오늘 환경 관련 정보를 찾아보았어요', checked: false },
];

const GrowthStage = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [customItem, setCustomItem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitted, setLastSubmitted] = useState<string | null>(null);
  const [todayScore, setTodayScore] = useState(0);

  useEffect(() => {
    // Load today's checklist from localStorage if exists
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem(`checklist_${today}`);
    
    if (savedData) {
      setChecklist(JSON.parse(savedData));
      setLastSubmitted(today);
      
      // Calculate score
      const saved = JSON.parse(savedData);
      const checkedCount = saved.filter((item: ChecklistItem) => item.checked).length;
      setTodayScore(checkedCount * 2); // 2 points per checked item
    }
  }, []);

  const handleCheckChange = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAddCustomItem = () => {
    if (customItem.trim() === '') return;
    
    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      text: customItem,
      checked: false
    };
    
    setChecklist(prev => [...prev, newItem]);
    setCustomItem('');
  };

  const handleSubmit = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    // Save to localStorage
    localStorage.setItem(`checklist_${today}`, JSON.stringify(checklist));
    
    // Count checked items
    const checkedCount = checklist.filter(item => item.checked).length;
    const points = checkedCount * 2; // 2 points per checked item
    
    setIsSubmitting(true);
    
    try {
      // Submit to backend
      await api.post('/contents', {
        stage: 'growth',
        type: 'text',
        content: JSON.stringify({
          date: today,
          checklist: checklist,
          checkedCount: checkedCount
        }),
        score: points
      });
      
      setLastSubmitted(today);
      setTodayScore(points);
    } catch (error) {
      console.error('Error submitting checklist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <GrowthIcon className="h-8 w-8 text-garden-primary mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">성장 단계</h1>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">환경 보호 실천 체크리스트</h2>
        <p className="text-gray-600 mb-6">
          오늘 실천한 환경 보호 활동에 체크해보세요. 
          체크한 항목 하나당 2점씩 획득할 수 있습니다.
        </p>

        {lastSubmitted === new Date().toISOString().split('T')[0] ? (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
            <p className="text-green-700">
              오늘의 체크리스트를 이미 제출했습니다! 총 {todayScore}점을 획득했습니다.
            </p>
            <p className="text-green-700 mt-2">
              내일 다시 체크리스트를 작성해보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {checklist.map(item => (
              <div key={item.id} className="flex items-start">
                <input
                  type="checkbox"
                  id={item.id}
                  className="h-5 w-5 text-garden-primary focus:ring-garden-primary border-gray-300 rounded mt-0.5"
                  checked={item.checked}
                  onChange={() => handleCheckChange(item.id)}
                />
                <label htmlFor={item.id} className="ml-3 text-gray-700">
                  {item.text}
                </label>
              </div>
            ))}
          </div>
        )}

        {/* Add custom item */}
        <div className="mt-6 mb-6">
          <h3 className="text-lg font-medium mb-3">나만의 실천 항목 추가하기</h3>
          <div className="flex">
            <input
              type="text"
              className="input flex-grow mr-2"
              placeholder="예: 오늘 친구들에게 환경 보호의 중요성을 알렸어요"
              value={customItem}
              onChange={(e) => setCustomItem(e.target.value)}
              disabled={lastSubmitted === new Date().toISOString().split('T')[0]}
            />
            <button
              className="btn btn-secondary"
              onClick={handleAddCustomItem}
              disabled={customItem.trim() === '' || lastSubmitted === new Date().toISOString().split('T')[0]}
            >
              추가
            </button>
          </div>
        </div>

        {lastSubmitted !== new Date().toISOString().split('T')[0] && (
          <button
            className="btn btn-primary w-full"
            onClick={handleSubmit}
            disabled={isSubmitting || checklist.every(item => !item.checked)}
          >
            {isSubmitting ? '제출 중...' : '오늘의 체크리스트 제출하기'}
          </button>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-medium mb-3">체크리스트 통계</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>체크한 항목</span>
          <span>{checklist.filter(item => item.checked).length}/{checklist.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-garden-primary rounded-full h-2"
            style={{ width: `${(checklist.filter(item => item.checked).length / checklist.length) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          체크한 항목이 많을수록 환경 보호에 더 많이 기여하고 있어요!
        </p>
      </div>
    </div>
  );
};

export default GrowthStage;