
import React, { useState } from 'react';
import { Heart, MapPin, Clock, Phone, Star, Users, Award } from 'lucide-react';

const Donate = () => {
  const [donationAmount, setDonationAmount] = useState(10000);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const presetAmounts = [5000, 10000, 20000, 50000];

  const impactData = [
    { icon: Heart, label: '총 기부 빵 개수', value: '1,234개', color: 'text-red-500' },
    { icon: Users, label: '도움받은 이웃', value: '456명', color: 'text-blue-500' },
    { icon: MapPin, label: '참여 매장', value: '89곳', color: 'text-green-500' },
    { icon: Award, label: '절약된 자원', value: '2.1톤', color: 'text-purple-500' },
  ];

  const successStories = [
    {
      id: 1,
      name: '김할머니',
      age: 78,
      story: '매일 아침 따뜻한 빵 한 조각으로 하루를 시작할 수 있어서 정말 감사해요.',
      location: '강남구',
      avatar: '👵'
    },
    {
      id: 2,
      name: '박민수',
      age: 12,
      story: '학교 끝나고 맛있는 빵을 먹을 수 있어서 행복해요!',
      location: '서초구',
      avatar: '👦'
    },
    {
      id: 3,
      name: '이영희',
      age: 45,
      story: '혼자 사는 딸아이에게 가끔 좋은 빵을 가져다 줄 수 있어서 좋아요.',
      location: '송파구',
      avatar: '👩'
    }
  ];

  const handleAmountChange = (amount: number) => {
    setDonationAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    const numericValue = parseInt(value) || 0;
    setCustomAmount(value);
    setDonationAmount(numericValue);
    setIsCustom(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">따뜻한 마음을 나누어주세요</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          여러분의 소중한 후원으로 더 많은 이웃들에게 따뜻한 빵과 희망을 전할 수 있습니다.
        </p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {impactData.map((item, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 text-center">
            <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
            <div className="text-2xl font-bold text-gray-900 mb-1">{item.value}</div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Donation Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">후원하기</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">후원 금액을 선택해주세요</label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountChange(amount)}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    donationAmount === amount && !isCustom
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {amount.toLocaleString()}원
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="직접 입력"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                className={`w-full p-4 border-2 rounded-lg ${
                  isCustom ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                } focus:border-orange-500 focus:outline-none`}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">원</span>
            </div>
          </div>

          <div className="mb-6 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>{donationAmount.toLocaleString()}원</strong>으로 약 <strong>{Math.floor(donationAmount / 3000)}명</strong>의 이웃에게 따뜻한 빵을 전할 수 있어요.
            </p>
          </div>

          <button className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium">
            {donationAmount.toLocaleString()}원 후원하기
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            후원은 안전한 결제 시스템을 통해 진행됩니다
          </p>
        </div>

        {/* Success Stories */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">여러분의 도움으로 변화된 이야기</h2>
          <div className="space-y-6">
            {successStories.map((story) => (
              <div key={story.id} className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{story.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <span className="text-sm text-gray-500">({story.age}세)</span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{story.location}</span>
                    </div>
                    <p className="text-gray-600 italic">"{story.story}"</p>
                    <div className="flex items-center mt-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">투명한 후원 운영</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Heart className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">100% 투명 공개</h4>
              <p className="text-sm text-gray-600 text-center">모든 후원금 사용 내역을 투명하게 공개합니다</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">실시간 업데이트</h4>
              <p className="text-sm text-gray-600 text-center">후원 현황과 도움 받은 이웃들의 이야기를 실시간으로 확인하세요</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">지속가능한 나눔</h4>
              <p className="text-sm text-gray-600 text-center">음식 낭비를 줄이고 지역사회에 선순환을 만듭니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
