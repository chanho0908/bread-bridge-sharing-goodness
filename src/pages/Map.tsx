
import React, { useState } from 'react';
import { MapPin, Clock, Heart, Phone, Navigation, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const [selectedBakery, setSelectedBakery] = useState(null);
  const navigate = useNavigate();
  
  const bakeries = [
    {
      id: 1,
      name: '선영이네 베이커리',
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      distance: '0.3km',
      openTime: '07:00 - 20:00',
      availableItems: [
        { name: '크로와상', count: 5, allergens: ['밀', '계란', '버터'] },
        { name: '식빵', count: 2, allergens: ['밀'] },
        { name: '단팥빵', count: 3, allergens: ['밀'] }
      ],
      rating: 4.8,
      lat: 37.5665,
      lng: 126.9780
    },
    {
      id: 2,
      name: '동네 빵집',
      address: '서울시 강남구 논현로 456',
      phone: '02-2345-6789',
      distance: '0.7km',
      openTime: '06:30 - 21:00',
      availableItems: [
        { name: '바게트', count: 3, allergens: ['밀'] },
        { name: '머핀', count: 8, allergens: ['밀', '계란', '견과류'] },
        { name: '크림빵', count: 6, allergens: ['밀', '계란', '유제품'] }
      ],
      rating: 4.6,
      lat: 37.5651,
      lng: 126.9795
    },
    {
      id: 3,
      name: '따뜻한 베이커리',
      address: '서울시 강남구 강남대로 789',
      phone: '02-3456-7890',
      distance: '1.2km',
      openTime: '08:00 - 19:00',
      availableItems: [
        { name: '소보루빵', count: 10, allergens: ['밀', '계란'] },
        { name: '앙금빵', count: 5, allergens: ['밀'] }
      ],
      rating: 4.9,
      lat: 37.5636,
      lng: 126.9758
    }
  ];

  const handleReservation = (bakeryId: number) => {
    navigate(`/bakery/${bakeryId}`);
  };

  const handleBakeryClick = (bakery: any) => {
    navigate(`/bakery/${bakery.id}`);
  };

  const getAllergenColor = (allergen: string) => {
    const colors = {
      '밀': 'bg-yellow-100 text-yellow-900',
      '계란': 'bg-orange-100 text-orange-900',
      '유제품': 'bg-blue-100 text-blue-900',
      '견과류': 'bg-red-100 text-red-900',
      '버터': 'bg-purple-100 text-purple-900'
    };
    return colors[allergen] || 'bg-gray-100 text-gray-900';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-accessible mb-3">주변 기부 매장</h1>
        <p className="text-accessible text-lg">현재 위치에서 가까운 빵 기부 매장을 찾아보세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6">
          <div 
            className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden"
            role="img"
            aria-label="매장 위치를 표시하는 지도 영역"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-amber-200/30"></div>
            <div className="relative z-10 text-center">
              <MapPin className="w-12 h-12 text-orange-700 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-accessible mb-2">지도 영역</h3>
              <p className="text-accessible">실제 서비스에서는 여기에 지도가 표시됩니다</p>
            </div>
            
            {/* Mock Map Markers */}
            <button
              className="absolute top-1/4 left-1/3 w-12 h-12 bg-orange-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg hover:bg-orange-800 focus:bg-orange-800 btn-accessible transition-colors"
              onClick={() => handleBakeryClick(bakeries[0])}
              aria-label={`${bakeries[0].name} 매장 선택`}
            >
              1
            </button>
            <button
              className="absolute top-1/2 right-1/3 w-12 h-12 bg-orange-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg hover:bg-orange-800 focus:bg-orange-800 btn-accessible transition-colors"
              onClick={() => handleBakeryClick(bakeries[1])}
              aria-label={`${bakeries[1].name} 매장 선택`}
            >
              2
            </button>
            <button
              className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-orange-700 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg hover:bg-orange-800 focus:bg-orange-800 btn-accessible transition-colors"
              onClick={() => handleBakeryClick(bakeries[2])}
              aria-label={`${bakeries[2].name} 매장 선택`}
            >
              3
            </button>
          </div>
        </div>

        {/* Bakery List */}
        <div className="space-y-6">
          {bakeries.map((bakery) => (
            <article
              key={bakery.id}
              className={`bg-white rounded-xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedBakery?.id === bakery.id
                  ? 'border-orange-400 shadow-md'
                  : 'border-gray-300 hover:border-orange-300'
              }`}
              onClick={() => setSelectedBakery(bakery)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedBakery(bakery);
                }
              }}
              aria-label={`${bakery.name} 매장 정보`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-accessible">{bakery.name}</h3>
                  <p className="text-accessible flex items-center mt-2">
                    <MapPin className="w-5 h-5 mr-2" aria-hidden="true" />
                    {bakery.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-medium text-orange-700">{bakery.distance}</span>
                  <div className="flex items-center mt-1">
                    <Heart className="w-5 h-5 text-yellow-500 fill-current" aria-hidden="true" />
                    <span className="text-accessible ml-1" aria-label={`평점 ${bakery.rating}점`}>
                      {bakery.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-accessible flex items-center mb-3">
                  <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span className="sr-only">운영시간: </span>
                  {bakery.openTime}
                </p>
                <p className="text-accessible flex items-center">
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  <span className="sr-only">전화번호: </span>
                  {bakery.phone}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-accessible mb-4">기부 가능한 빵</h4>
                <div className="space-y-4">
                  {bakery.availableItems.map((item, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-lg font-medium text-accessible">
                          {item.name} {item.count}개
                        </span>
                        {item.allergens.length > 0 && (
                          <AlertTriangle 
                            className="w-5 h-5 text-amber-600 flex-shrink-0" 
                            aria-label="알레르기 유발 요소 포함"
                          />
                        )}
                      </div>
                      {item.allergens.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-base font-medium text-accessible">알레르기 유발 요소:</span>
                          {item.allergens.map((allergen, allergenIndex) => (
                            <span
                              key={allergenIndex}
                              className={`px-3 py-1 text-sm font-medium rounded-full ${getAllergenColor(allergen)}`}
                              role="listitem"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReservation(bakery.id);
                  }}
                  className="flex-1 bg-orange-700 text-white btn-accessible rounded-lg hover:bg-orange-800 focus:bg-orange-800 transition-colors"
                  aria-label={`${bakery.name}에서 빵 예약하기`}
                >
                  예약하기
                </button>
                <button 
                  className="btn-accessible border-2 border-orange-700 text-orange-700 rounded-lg hover:bg-orange-50 focus:bg-orange-50 transition-colors flex items-center justify-center"
                  aria-label={`${bakery.name} 길찾기`}
                >
                  <Navigation className="w-5 h-5" aria-hidden="true" />
                  <span className="sr-only">길찾기</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
