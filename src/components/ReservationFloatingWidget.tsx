
import React from 'react';
import { Clock, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Reservation {
  id: number;
  bakery: string;
  status: 'confirmed' | 'pending' | 'ready';
  pickupTime: string;
  estimatedTime?: string;
}

const ReservationFloatingWidget = () => {
  // Mock data - 실제로는 전역 상태나 API에서 가져올 데이터
  const activeReservation: Reservation | null = {
    id: 1,
    bakery: '선영이네 베이커리',
    status: 'confirmed',
    pickupTime: '16:00 - 18:00',
    estimatedTime: '약 30분 후 준비 예정'
  };

  if (!activeReservation) return null;

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { text: '예약 확정', color: 'bg-green-500', textColor: 'text-green-800' };
      case 'pending':
        return { text: '승인 대기', color: 'bg-yellow-500', textColor: 'text-yellow-800' };
      case 'ready':
        return { text: '수령 준비됨', color: 'bg-blue-500', textColor: 'text-blue-800' };
      default:
        return { text: '알 수 없음', color: 'bg-gray-500', textColor: 'text-gray-800' };
    }
  };

  const statusInfo = getStatusInfo(activeReservation.status);

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50">
      <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${statusInfo.color}`}></div>
            <span className={`text-sm font-medium ${statusInfo.textColor} bg-opacity-20 px-2 py-1 rounded-full`}>
              {statusInfo.text}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600 min-h-[48px] min-w-[48px] flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 text-base">{activeReservation.bakery}</h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <Clock className="w-4 h-4 mr-1" />
            수령시간: {activeReservation.pickupTime}
          </p>
          {activeReservation.estimatedTime && (
            <p className="text-sm text-orange-600 font-medium mt-1">
              {activeReservation.estimatedTime}
            </p>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Link 
            to="/reservations" 
            className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium text-center min-h-[48px] flex items-center justify-center"
          >
            예약 상세보기
          </Link>
          <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm min-h-[48px] flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationFloatingWidget;
