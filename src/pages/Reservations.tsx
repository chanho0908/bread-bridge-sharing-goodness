
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Check, X, AlertCircle } from 'lucide-react';

const Reservations = () => {
  const [activeTab, setActiveTab] = useState('current');
  
  const currentReservations = [
    {
      id: 1,
      bakery: '선영이네 베이커리',
      address: '서울시 강남구 테헤란로 123',
      items: ['크로와상 2개', '식빵 1개'],
      reservationTime: '2024-01-15 14:00',
      pickupTime: '2024-01-15 16:00 - 18:00',
      status: 'confirmed',
      reservationNumber: 'R240115001'
    },
    {
      id: 2,
      bakery: '동네 빵집',
      address: '서울시 강남구 논현로 456',
      items: ['바게트 1개', '머핀 3개'],
      reservationTime: '2024-01-15 10:30',
      pickupTime: '2024-01-15 17:00 - 19:00',
      status: 'pending',
      reservationNumber: 'R240115002'
    }
  ];
  
  const pastReservations = [
    {
      id: 3,
      bakery: '따뜻한 베이커리',
      address: '서울시 강남구 강남대로 789',
      items: ['소보루빵 3개', '앙금빵 2개'],
      reservationTime: '2024-01-14 15:00',
      pickupTime: '2024-01-14 17:30',
      status: 'completed',
      reservationNumber: 'R240114001'
    },
    {
      id: 4,
      bakery: '선영이네 베이커리',
      address: '서울시 강남구 테헤란로 123',
      items: ['크림빵 4개'],
      reservationTime: '2024-01-13 12:00',
      pickupTime: '2024-01-13 15:00',
      status: 'completed',
      reservationNumber: 'R240113001'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return '예약 확정';
      case 'pending':
        return '승인 대기';
      case 'completed':
        return '수령 완료';
      case 'cancelled':
        return '예약 취소';
      default:
        return '알 수 없음';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <Check className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <Check className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const reservationsToShow = activeTab === 'current' ? currentReservations : pastReservations;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">내 예약</h1>
        <p className="text-gray-600">빵 예약 현황을 확인하고 관리하세요</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 mb-6">
        <div className="border-b border-orange-100">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'current'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              현재 예약 ({currentReservations.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'past'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              과거 예약 ({pastReservations.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {reservationsToShow.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-orange-100">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'current' ? '현재 예약이 없습니다' : '과거 예약 내역이 없습니다'}
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'current' 
                ? '지도에서 원하는 빵을 찾아 예약해보세요' 
                : '아직 예약 내역이 없습니다'}
            </p>
            {activeTab === 'current' && (
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                빵 찾아보기
              </button>
            )}
          </div>
        ) : (
          reservationsToShow.map((reservation) => (
            <div key={reservation.id} className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{reservation.bakery}</h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {reservation.address}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                    {getStatusIcon(reservation.status)}
                    <span className="ml-1">{getStatusText(reservation.status)}</span>
                  </span>
                  <p className="text-xs text-gray-500 mt-1">#{reservation.reservationNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">예약한 빵</h4>
                  <div className="space-y-1">
                    {reservation.items.map((item, index) => (
                      <span key={index} className="inline-block bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded mr-2">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">시간 정보</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      예약: {new Date(reservation.reservationTime).toLocaleString('ko-KR')}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      수령: {reservation.pickupTime}
                    </p>
                  </div>
                </div>
              </div>

              {activeTab === 'current' && (
                <div className="flex gap-2 pt-4 border-t border-orange-100">
                  {reservation.status === 'confirmed' && (
                    <>
                      <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium">
                        매장 연락하기
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        예약 취소
                      </button>
                    </>
                  )}
                  {reservation.status === 'pending' && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      예약 취소
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reservations;
