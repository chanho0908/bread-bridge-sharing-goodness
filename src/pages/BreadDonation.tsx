
import React, { useState } from 'react';
import { Plus, Minus, Clock, MapPin, AlertTriangle } from 'lucide-react';

const BreadDonation = () => {
  const [donationItems, setDonationItems] = useState([
    { id: 1, name: '', count: 1, allergens: [], pickupStart: '', pickupEnd: '' }
  ]);

  const commonAllergens = ['밀', '계란', '유제품', '견과류', '버터', '콩', '참깨'];

  const addDonationItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      count: 1,
      allergens: [],
      pickupStart: '',
      pickupEnd: ''
    };
    setDonationItems([...donationItems, newItem]);
  };

  const removeDonationItem = (id: number) => {
    if (donationItems.length > 1) {
      setDonationItems(donationItems.filter(item => item.id !== id));
    }
  };

  const updateDonationItem = (id: number, field: string, value: any) => {
    setDonationItems(donationItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const toggleAllergen = (itemId: number, allergen: string) => {
    setDonationItems(donationItems.map(item => {
      if (item.id === itemId) {
        const allergens = item.allergens.includes(allergen)
          ? item.allergens.filter(a => a !== allergen)
          : [...item.allergens, allergen];
        return { ...item, allergens };
      }
      return item;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 기부 등록 로직
    console.log('기부 등록:', donationItems);
    alert('빵 기부가 등록되었습니다!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">빵 기부 등록</h1>
        <p className="text-lg text-gray-700">기부할 빵 정보를 등록해주세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Info Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">매장 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                매장명 *
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
                placeholder="매장명을 입력해주세요"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-2">
                연락처 *
              </label>
              <input
                type="tel"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
                placeholder="연락처를 입력해주세요"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-lg font-medium text-gray-900 mb-2">
              매장 주소 *
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
              placeholder="매장 주소를 입력해주세요"
            />
          </div>
        </div>

        {/* Donation Items Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">기부할 빵 정보</h2>
            <button
              type="button"
              onClick={addDonationItem}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2 min-h-[48px]"
            >
              <Plus className="w-5 h-5" />
              <span>빵 추가</span>
            </button>
          </div>

          <div className="space-y-6">
            {donationItems.map((item, index) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-900">빵 #{index + 1}</h3>
                  {donationItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDonationItem(item.id)}
                      className="text-red-600 hover:text-red-800 p-2 min-h-[48px] min-w-[48px] flex items-center justify-center"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      빵 이름 *
                    </label>
                    <input
                      type="text"
                      required
                      value={item.name}
                      onChange={(e) => updateDonationItem(item.id, 'name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
                      placeholder="예: 크로와상, 식빵"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      개수 *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={item.count}
                      onChange={(e) => updateDonationItem(item.id, 'count', parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-lg font-medium text-gray-900 mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mr-1" />
                    알레르기 정보
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {commonAllergens.map((allergen) => (
                      <button
                        key={allergen}
                        type="button"
                        onClick={() => toggleAllergen(item.id, allergen)}
                        className={`px-3 py-2 rounded-lg border transition-colors min-h-[48px] ${
                          item.allergens.includes(allergen)
                            ? 'bg-red-100 border-red-300 text-red-800'
                            : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {allergen}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      수령 가능 시작 시간 *
                    </label>
                    <input
                      type="time"
                      required
                      value={item.pickupStart}
                      onChange={(e) => updateDonationItem(item.id, 'pickupStart', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      수령 가능 마감 시간 *
                    </label>
                    <input
                      type="time"
                      required
                      value={item.pickupEnd}
                      onChange={(e) => updateDonationItem(item.id, 'pickupEnd', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg min-h-[48px]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors text-xl font-medium min-h-[48px]"
          >
            빵 기부 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default BreadDonation;
