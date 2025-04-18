import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { SproutIcon } from '../../components/StageIcons';

interface Quiz {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const quizData: Quiz[] = [
  {
    id: 1,
    question: '플라스틱 제품 중 재활용이 어려운 것은?',
    options: ['페트병', '플라스틱 빨대', '우유통', '세제통'],
    correctAnswer: '플라스틱 빨대'
  },
  {
    id: 2,
    question: '지구의 평균 온도가 상승하는 현상을 무엇이라고 하나요?',
    options: ['열대화', '기후 변화', '지구 온난화', '자외선 증가'],
    correctAnswer: '지구 온난화'
  },
  {
    id: 3,
    question: '탄소 발자국을 줄이는 행동은?',
    options: ['장거리 운전하기', '일회용 컵 사용', '걷거나 자전거 타기', '플라스틱 포장 구매'],
    correctAnswer: '걷거나 자전거 타기'
  },
  {
    id: 4,
    question: '에너지를 절약할 수 있는 방법은?',
    options: ['형광등 계속 켜두기', 'LED 조명 사용하기', '냉장고 문 자주 열기', '전기난로 장시간 사용'],
    correctAnswer: 'LED 조명 사용하기'
  },
  {
    id: 5,
    question: '다음 중 친환경 교통수단이 아닌 것은?',
    options: ['지하철', '자전거', '전기자동차', '디젤 자동차'],
    correctAnswer: '디젤 자동차'
  },
  {
    id: 6,
    question: '음식물 쓰레기 줄이기에 도움이 되는 행동은?',
    options: ['과식하기', '남은 음식 버리기', '필요한 만큼만 요리하기', '유통기한 무시'],
    correctAnswer: '필요한 만큼만 요리하기'
  },
  {
    id: 7,
    question: '기후 변화로 인한 현상이 아닌 것은?',
    options: ['폭염 증가', '해수면 상승', '빙하 감소', '산소 농도 증가'],
    correctAnswer: '산소 농도 증가'
  },
  {
    id: 8,
    question: '전자제품을 오래 사용할수록 좋은 이유는?',
    options: ['멋있어 보이기 때문', '전기요금이 싸서', '자원 낭비를 줄일 수 있어서', '수리비가 많아서'],
    correctAnswer: '자원 낭비를 줄일 수 있어서'
  },
  {
    id: 9,
    question: '다음 중 재사용이 가능한 물건은?',
    options: ['일회용 컵', '종이 타월', '유리병', '비닐 장갑'],
    correctAnswer: '유리병'
  },
  {
    id: 10,
    question: '대기 중 이산화탄소 농도를 줄이는 데 도움이 되는 것은?',
    options: ['산림 벌채', '자동차 증가', '화석연료 사용', '나무 심기'],
    correctAnswer: '나무 심기'
  },
  {
    id: 11,
    question: '지구를 보호하기 위해 우리가 할 수 있는 행동은?',
    options: ['에어컨 오래 틀기', '물 낭비하기', '일회용품 줄이기', '전기 낭비'],
    correctAnswer: '일회용품 줄이기'
  },
  {
    id: 12,
    question: '플라스틱이 자연에서 분해되는 데 걸리는 시간은?',
    options: ['1년', '10년', '100년', '수백 년 이상'],
    correctAnswer: '수백 년 이상'
  },
  {
    id: 13,
    question: '온실가스에 해당하지 않는 것은?',
    options: ['이산화탄소', '메탄', '질소', '아산화질소'],
    correctAnswer: '질소'
  },
  {
    id: 14,
    question: '가정에서 물 절약을 실천할 수 있는 방법은?',
    options: ['빨래를 자주 나눠 하기', '샤워 시간 줄이기', '수도꼭지 열어두기', '세면대에 물 채우기'],
    correctAnswer: '샤워 시간 줄이기'
  },
  {
    id: 15,
    question: '태양광 발전은 어떤 에너지에 해당하나요?',
    options: ['화석 에너지', '재생 에너지', '핵 에너지', '비재생 에너지'],
    correctAnswer: '재생 에너지'
  },
  {
    id: 16,
    question: '종이의 재활용 횟수는 일반적으로 몇 번까지 가능한가요?',
    options: ['1~2회', '3~5회', '10회 이상', '무제한'],
    correctAnswer: '3~5회'
  },
  {
    id: 17,
    question: '다음 중 생물 다양성을 해치는 행동은?',
    options: ['서식지 보호', '남획', '국립공원 지정', '멸종위기종 보호'],
    correctAnswer: '남획'
  },
  {
    id: 18,
    question: '기후 위기 대응을 위해 가장 효과적인 방법은?',
    options: ['풍력 발전 확대', '에어컨 사용 증가', '산림 파괴', '석유 소비 증가'],
    correctAnswer: '풍력 발전 확대'
  },
  {
    id: 19,
    question: '탄소중립(Carbon Neutrality)의 의미는?',
    options: ['온실가스를 많이 배출함', '온실가스 배출과 흡수를 같게 함', '탄소를 없애는 것', '탄소로 에너지 생성'],
    correctAnswer: '온실가스 배출과 흡수를 같게 함'
  },
  {
    id: 20,
    question: '바다 생물을 위협하는 가장 큰 오염원 중 하나는?',
    options: ['모래', '조개껍데기', '플라스틱 쓰레기', '물고기'],
    correctAnswer: '플라스틱 쓰레기'
  },
  {
    id: 21,
    question: '대중교통을 이용하는 이유 중 환경적 측면은?',
    options: ['시간이 빨라서', '돈이 적게 들어서', '탄소 배출을 줄일 수 있어서', '혼자 타고 싶어서'],
    correctAnswer: '탄소 배출을 줄일 수 있어서'
  },
  {
    id: 22,
    question: '종이를 아껴 쓰는 가장 좋은 방법은?',
    options: ['이중 인쇄하기', '불필요한 인쇄 줄이기', '광고지 활용', '종이로 장난감 만들기'],
    correctAnswer: '불필요한 인쇄 줄이기'
  },
  {
    id: 23,
    question: '환경 오염을 줄이기 위한 실천 중 올바른 것은?',
    options: ['배터리 쓰레기 분리', '음식물과 일반 쓰레기 혼합', '캔과 플라스틱 함께 버리기', '종이컵 태우기'],
    correctAnswer: '배터리 쓰레기 분리'
  },
  {
    id: 24,
    question: '전기차의 장점은?',
    options: ['소음이 큼', '배기가스가 없음', '연료비가 비쌈', '속도가 느림'],
    correctAnswer: '배기가스가 없음'
  },
  {
    id: 25,
    question: '온실가스를 가장 많이 배출하는 부문은?',
    options: ['농업', '산업', '에너지', '수산업'],
    correctAnswer: '에너지'
  },
  {
    id: 26,
    question: '다음 중 자연 생태계를 보호하는 행동은?',
    options: ['야생동물 불법 포획', '쓰레기 무단 투기', '캠핑 후 쓰레기 수거', '불법 산지 개발'],
    correctAnswer: '캠핑 후 쓰레기 수거'
  },
  {
    id: 27,
    question: '바이오 에너지는 어떤 재료로 만들어지나요?',
    options: ['석탄', '석유', '농작물 폐기물', '천연가스'],
    correctAnswer: '농작물 폐기물'
  },
  {
    id: 28,
    question: '플로깅(Plogging)은 어떤 활동인가요?',
    options: ['플라스틱 모으기', '조깅하면서 쓰레기 줍기', '자전거 타기', '산악 달리기'],
    correctAnswer: '조깅하면서 쓰레기 줍기'
  },
  {
    id: 29,
    question: '녹색 제품(Green Product)의 특징은?',
    options: ['가격이 비쌈', '디자인이 특별함', '환경 영향을 최소화함', '광고가 많음'],
    correctAnswer: '환경 영향을 최소화함'
  },
  {
    id: 30,
    question: '전 세계적인 환경 보호 협약인 “파리협정”의 주요 목표는?',
    options: ['전기차 보급 확대', '기후변화 대응을 위한 온도 상승 제한', '플라스틱 사용 금지', '산림 개발 촉진'],
    correctAnswer: '기후변화 대응을 위한 온도 상승 제한'
  }
];

const SproutStage = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [remainingQuizzes, setRemainingQuizzes] = useState<Quiz[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize with shuffled quizzes
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    setRemainingQuizzes(shuffled);
    setCurrentQuiz(shuffled[0]);
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    if (!selectedOption || !currentQuiz) return;

    const correct = selectedOption === currentQuiz.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prevScore => prevScore + 10);
    }

    // Submit to backend
    setIsSubmitting(true);
    try {
      await api.post('/contents', {
        stage: 'sprout',
        type: 'quiz',
        content: `Q: ${currentQuiz.question}\nA: ${selectedOption}\nCorrect: ${correct ? 'Yes' : 'No'}`
      });
    } catch (error) {
      console.error('Error submitting quiz answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextQuiz = () => {
    // Remove current quiz from remaining
    const newRemaining = remainingQuizzes.filter(q => q.id !== currentQuiz?.id);
    setRemainingQuizzes(newRemaining);

    if (newRemaining.length > 0) {
      // Move to next quiz
      setCurrentQuiz(newRemaining[0]);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      // All quizzes completed
      setQuizCompleted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <SproutIcon className="h-8 w-8 text-garden-primary mr-3" />
        <h1 className="text-2xl font-bold text-gray-900">새싹 단계</h1>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">환경 퀴즈</h2>
        <p className="text-gray-600 mb-6">
          환경에 관한 퀴즈를 풀고 지식을 쌓아보세요. 
          정답을 맞추면 10점을 획득할 수 있습니다.
        </p>

        {quizCompleted ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-garden-primary mb-4">모든 퀴즈를 완료했습니다!</h3>
            <p className="text-gray-600 mb-4">총 점수: {score}점</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              다시 풀기
            </button>
          </div>
        ) : currentQuiz ? (
          <div>
            <div className="bg-garden-light bg-opacity-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-lg mb-2">Q. {currentQuiz.question}</h3>
              <div className="space-y-3">
                {currentQuiz.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="quiz-option"
                      className="h-4 w-4 text-garden-primary focus:ring-garden-primary border-gray-300"
                      checked={selectedOption === option}
                      onChange={() => handleOptionSelect(option)}
                      disabled={isCorrect !== null}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className={`ml-3 block text-sm font-medium ${
                        isCorrect !== null && option === currentQuiz.correctAnswer
                          ? 'text-green-700'
                          : isCorrect === false && option === selectedOption
                          ? 'text-red-700'
                          : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {isCorrect === null ? (
              <button
                onClick={handleSubmit}
                className="btn btn-primary w-full"
                disabled={!selectedOption || isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '정답 제출하기'}
              </button>
            ) : (
              <div>
                <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                    {isCorrect ? '정답입니다! +10점' : `오답입니다. 정답은 "${currentQuiz.correctAnswer}" 입니다.`}
                  </p>
                </div>
                <button
                  onClick={handleNextQuiz}
                  className="btn btn-primary w-full"
                >
                  다음 문제
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-garden-primary"></div>
          </div>
        )}
      </div>

      <div className="card">
        <h3 className="text-lg font-medium mb-3">퀴즈 진행 상황</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>완료한 퀴즈</span>
          <span>{quizData.length - remainingQuizzes.length}/{quizData.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-garden-primary rounded-full h-2"
            style={{ width: `${((quizData.length - remainingQuizzes.length) / quizData.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>현재 점수</span>
          <span>{score}점</span>
        </div>
      </div>
    </div>
  );
};

export default SproutStage;