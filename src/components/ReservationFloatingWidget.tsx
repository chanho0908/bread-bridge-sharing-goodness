import React, { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Calculate 30 minutes from current time
  const completionTime = new Date(currentTime.getTime() + 30 * 60 * 1000);
  const pickupStartTime = new Date(completionTime.getTime() - 60 * 60 * 1000); // 1 hour before completion
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };
  
  // Dynamic reservation based on current time
  const activeReservation: Reservation = {
    id: 1,
    bakery: '선영이네 베이커리',
    status: 'confirmed',
    pickupTime: `${formatTime(pickupStartTime)} - ${formatTime(completionTime)}`,
    estimatedTime: '약 30분 후 준비 예정'
  };

  if (!activeReservation || !isVisible) return null;

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { text: '예약 확정', color: 'bg-green-600', textColor: 'text-green-900', bgColor: 'bg-green-100' };
      case 'pending':
        return { text: '승인 대기', color: 'bg-yellow-600', textColor: 'text-yellow-900', bgColor: 'bg-yellow-100' };
      case 'ready':
        return { text: '수령 준비됨', color: 'bg-blue-600', textColor: 'text-blue-900', bgColor: 'bg-blue-100' };
      default:
        return { text: '알 수 없음', color: 'bg-gray-600', textColor: 'text-gray-900', bgColor: 'bg-gray-100' };
    }
  };

  const statusInfo = getStatusInfo(activeReservation.status);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDetailClick = () => {
    setIsVisible(false);
  };

  return (
    <aside 
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50"
      role="complementary"
      aria-label="현재 예약 상태"
    >
      <div className="bg-white rounded-xl shadow-lg border border-gray-300 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className={`w-4 h-4 rounded-full ${statusInfo.color}`}
              aria-hidden="true"
            ></div>
            <span className={`text-base font-semibold ${statusInfo.textColor} ${statusInfo.bgColor} px-3 py-2 rounded-full`}>
              {statusInfo.text}
            </span>
          </div>
          <button 
            onClick={handleClose}
            className="btn-accessible-small text-gray-600 hover:text-gray-800 focus:text-gray-800 flex items-center justify-center rounded-lg hover:bg-gray-100 focus:bg-gray-100"
            aria-label="예약 위젯 닫기"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-accessible text-lg">{activeReservation.bakery}</h3>
          <p className="text-accessible flex items-center mt-2">
            <Clock className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="sr-only">수령시간: </span>
            {activeReservation.pickupTime}
          </p>
          {activeReservation.estimatedTime && (
            <p className="text-base text-orange-800 font-medium mt-2">
              {activeReservation.estimatedTime}
            </p>
          )}
        </div>
        
        <div className="flex space-x-3">
          <Link 
            to="/reservations" 
            onClick={handleDetailClick}
            className="flex-1 bg-orange-700 text-white btn-accessible rounded-lg hover:bg-orange-800 focus:bg-orange-800 transition-colors text-center flex items-center justify-center"
            aria-label="예약 상세 정보 보기"
          >
            예약 상세보기
          </Link>
          <button 
            className="btn-accessible border-2 border-gray-400 text-gray-800 rounded-lg hover:bg-gray-50 focus:bg-gray-50 transition-colors flex items-center justify-center"
            aria-label="매장 위치 보기"
          >
            <MapPin className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">위치 보기</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ReservationFloatingWidget;
