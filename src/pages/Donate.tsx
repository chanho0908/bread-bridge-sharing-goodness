
import React, { useState } from 'react';
import { Plus, Clock, MapPin, Heart, Image, X } from 'lucide-react';

const Donate = () => {
  const [formData, setFormData] = useState({
    bakeryName: '',
    address: '',
    phone: '',
    availableTime: '',
    items: [],
    description: '',
    images: []
  });

  const [newItem, setNewItem] = useState({ name: '', quantity: '', unit: 'ea' });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addItem = () => {
    if (newItem.name && newItem.quantity) {
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, { ...newItem, id: Date.now() }]
      }));
      setNewItem({ name: '', quantity: '', unit: 'ea' });
    }
  };

  const removeItem = (id) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('기부 등록:', formData);
    // 실제 구현에서는 API 호출
    alert('기부가 성공적으로 등록되었습니다!');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">빵 기부하기</h1>
        <p className="text-gray-600">남은 빵을 필요한 이웃과 나누어 보세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 매장 정보 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-orange-600" />
            매장 정보
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">매장명</label>
              <input
                type="text"
                value={formData.bakeryName}
                onChange={(e) => handleInputChange('bakeryName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="예: 선영이네 베이커리"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="02-1234-5678"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">매장 주소</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="서울시 강남구 테헤란로 123"
              required
            />
          </div>
        </div>

        {/* 기부 시간 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-600" />
            수령 가능 시간
          </h2>
          
          <input
            type="text"
            value={formData.availableTime}
            onChange={(e) => handleInputChange('availableTime', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="예: 오늘 오후 4시 - 6시"
            required
          />
        </div>

        {/* 기부 품목 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-orange-600" />
            기부 품목
          </h2>
          
          {/* 품목 추가 */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="빵 이름 (예: 크로와상)"
            />
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="개수"
            />
            <select
              value={newItem.unit}
              onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="ea">개</option>
              <option value="kg">kg</option>
              <option value="pack">팩</option>
            </select>
            <button
              type="button"
              onClick={addItem}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          {/* 품목 목록 */}
          {formData.items.length > 0 && (
            <div className="space-y-2">
              {formData.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-900">
                    {item.name} {item.quantity}{item.unit}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 추가 설명 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">추가 설명</h2>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            rows="3"
            placeholder="수령 시 주의사항이나 추가 정보를 입력해주세요 (선택사항)"
          />
        </div>

        {/* 사진 첨부 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2 text-orange-600" />
            사진 첨부 (선택사항)
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">빵 사진을 첨부해주세요</p>
            <p className="text-sm text-gray-500">최대 3장까지 업로드 가능합니다</p>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              사진 선택
            </button>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex gap-4">
          <button
            type="button"
            className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            임시저장
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            disabled={formData.items.length === 0}
          >
            기부 등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default Donate;
