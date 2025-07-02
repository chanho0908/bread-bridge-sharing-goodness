import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, User, Phone, MessageSquare, Calendar, Check } from 'lucide-react';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [pickupTime, setPickupTime] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  const bakery = {
    name: '선영이네 베이커리',
    address: '서울시 강남구 테헤란로 123',
    pickupTimeSlots: [
      '16:00',
      '17:00', 
      '18:00',
      '19:00'
    ],
    availableItems: [
      { name: '크로와상', count: 5 },
      { name: '식빵', count: 2 },
      { name: '단팥빵', count: 3 }
    ]
  };

  const handleItemChange = (itemName: string, quantity: number) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemName]: quantity
    }));
  };

  const getTotalItems = () => {
    return Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  };

  const getTotalValue = () => {
    return bakery.availableItems.reduce((sum, item) => {
      const selectedCount = selectedItems[item.name] || 0;
      return sum + selectedCount;
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (getTotalItems() === 0) {
      alert('최소 1개 이상의 빵을 선택해주세요.');
      return;
    }

    if (!pickupTime || !userName || !userPhone) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('예약이 완료되었습니다! 매장 승인 후 알림을 드릴게요.');
      navigate('/reservations');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">빵 예약하기</h1>
          <div className="w-10 h-10" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Bakery Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{bakery.name}</h2>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 mr-3" />
            <span>{bakery.address}</span>
          </div>
        </div>

        {/* Select Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">받고 싶은 빵을 선택하세요</h3>
          <div className="space-y-4">
            {bakery.availableItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    {item.count}개 남음
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => handleItemChange(item.name, Math.max(0, (selectedItems[item.name] || 0) - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    disabled={!selectedItems[item.name]}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {selectedItems[item.name] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleItemChange(item.name, Math.min(item.count, (selectedItems[item.name] || 0) + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    disabled={(selectedItems[item.name] || 0) >= item.count}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {getTotalItems() > 0 && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">선택한 빵</span>
                <span className="font-semibold text-orange-600">
                  총 {getTotalItems()}개
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Pickup Time */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <Clock className="w-5 h-5 inline mr-2" />
            픽업 시간 선택
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {bakery.pickupTimeSlots.map((time, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="pickupTime"
                  value={time}
                  checked={pickupTime === time}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="sr-only"
                />
                <div className={`flex-1 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  pickupTime === time 
                    ? 'border-orange-500 bg-orange-50 text-orange-700' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{time}</span>
                    {pickupTime === time && <Check className="w-5 h-5 text-orange-600" />}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <User className="w-5 h-5 inline mr-2" />
            수령자 정보
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름 *</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="실명을 입력해주세요"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처 *</label>
              <input
                type="tel"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                placeholder="010-0000-0000"
                required
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            <MessageSquare className="w-5 h-5 inline mr-2" />
            매장에 전할 말씀 (선택사항)
          </h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            rows={3}
            placeholder="감사 인사나 특별한 요청사항이 있으면 적어주세요"
          />
        </div>

        {/* Submit Button */}
        <div className="sticky bottom-0 p-4 bg-white border-t">
          <button
            type="submit"
            disabled={isSubmitting || getTotalItems() === 0}
            className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '예약 중...' : `예약하기 (${getTotalItems()}개)`}
          </button>
          <p className="text-xs text-gray-500 text-center mt-2">
            예약 후 매장 승인이 필요합니다. 승인 결과를 알림으로 알려드려요.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
