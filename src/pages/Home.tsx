
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, Users, TrendingUp, Star } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: '총 기부 빵', value: '12,847개', icon: Heart },
    { label: '참여 매장', value: '156곳', icon: MapPin },
    { label: '도움받은 분들', value: '3,241명', icon: Users },
  ];

  const recentDonations = [
    { bakery: '선영이네 베이커리', items: '크로와상 5개, 식빵 2개', time: '2시간 전' },
    { bakery: '동네 빵집', items: '단팥빵 8개, 크림빵 6개', time: '3시간 전' },
    { bakery: '따뜻한 베이커리', items: '바게트 3개, 머핀 10개', time: '5시간 전' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mb-6">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          따뜻한 나눔, <span className="text-orange-600">빵빵하게</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          남은 빵을 필요한 이웃과 연결하여 따뜻한 지역사회를 만들어갑니다
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/map"
            className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
          >
            <MapPin className="w-5 h-5 mr-2" />
            빵 찾아보기
          </Link>
          <Link
            to="/donate"
            className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-medium rounded-lg border-2 border-orange-600 hover:bg-orange-50 transition-colors"
          >
            <Heart className="w-5 h-5 mr-2" />
            빵 기부하기
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">최근 기부 현황</h2>
          <Link to="/donations" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
            전체보기 →
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentDonations.map((donation, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{donation.bakery}</h3>
                <p className="text-sm text-gray-600">{donation.items}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{donation.time}</p>
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-500 ml-1">기부 완료</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">어떻게 작동하나요?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. 빵 기부</h3>
            <p className="text-gray-600">제과점에서 남은 빵을 간편하게 등록하여 기부합니다</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. 위치 확인</h3>
            <p className="text-gray-600">지도에서 가까운 기부 매장을 쉽게 찾아볼 수 있습니다</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. 예약 수령</h3>
            <p className="text-gray-600">원하는 시간에 예약하고 편리하게 수령할 수 있습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
