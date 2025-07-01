import React, { useState } from 'react';
import { MapPin, Clock, Heart, Phone, Navigation } from 'lucide-react';
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
      availableItems: ['크로와상 5개', '식빵 2개', '단팥빵 3개'],
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
      availableItems: ['바게트 3개', '머핀 8개', '크림빵 6개'],
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
      availableItems: ['소보루빵 10개', '앙금빵 5개'],
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">주변 기부 매장</h1>
        <p className="text-gray-600">현재 위치에서 가까운 빵 기부 매장을 찾아보세요</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map Area */}
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
          <div className="aspect-square bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-amber-200/30"></div>
            <div className="relative z-10 text-center">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">지도 영역</h3>
              <p className="text-gray-600 text-sm">실제 서비스에서는 여기에 지도가 표시됩니다</p>
            </div>
            
            {/* Mock Map Markers */}
            <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer hover:bg-orange-700"
                 onClick={() => handleBakeryClick(bakeries[0])}>
              1
            </div>
            <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer hover:bg-orange-700"
                 onClick={() => handleBakeryClick(bakeries[1])}>
              2
            </div>
            <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg cursor-pointer hover:bg-orange-700"
                 onClick={() => handleBakeryClick(bakeries[2])}>
              3
            </div>
          </div>
        </div>

        {/* Bakery List */}
        <div className="space-y-4">
          {bakeries.map((bakery) => (
            <div
              key={bakery.id}
              className={`bg-white rounded-xl p-6 shadow-sm border transition-all cursor-pointer ${
                selectedBakery?.id === bakery.id
                  ? 'border-orange-300 shadow-md'
                  : 'border-orange-100 hover:border-orange-200'
              }`}
              onClick={() => setSelectedBakery(bakery)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{bakery.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {bakery.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-orange-600">{bakery.distance}</span>
                  <div className="flex items-center mt-1">
                    <Heart className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-500 ml-1">{bakery.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-1" />
                  {bakery.openTime}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {bakery.phone}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">기부 가능한 빵</h4>
                <div className="flex flex-wrap gap-2">
                  {bakery.availableItems.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReservation(bakery.id);
                  }}
                  className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  예약하기
                </button>
                <button className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
