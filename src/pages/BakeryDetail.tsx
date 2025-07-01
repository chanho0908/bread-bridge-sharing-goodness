
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Phone, MapPin, Star, Heart, Navigation } from 'lucide-react';

const BakeryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - 실제로는 API에서 가져올 데이터
  const bakery = {
    id: 1,
    name: '선영이네 베이커리',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    distance: '0.3km',
    openTime: '07:00 - 20:00',
    pickupTime: '16:00 - 19:00',
    category: '동네 베이커리',
    rating: 4.8,
    reviewCount: 127,
    availableItems: [
      { name: '크로와상', count: 5, originalPrice: 3000, description: '버터 향이 풍부한 프랑스식 크로와상' },
      { name: '식빵', count: 2, originalPrice: 4500, description: '부드러운 식감의 수제 식빵' },
      { name: '단팥빵', count: 3, originalPrice: 2500, description: '달콤한 팥소가 가득한 전통 단팥빵' }
    ],
    reviews: [
      {
        id: 1,
        user: '김**',
        rating: 5,
        date: '2024-01-14',
        comment: '빵이 정말 맛있어요! 사장님도 친절하시고 감사합니다.',
        helpful: 12
      },
      {
        id: 2,
        user: '박**',
        rating: 5,
        date: '2024-01-13',
        comment: '크로와상이 특히 맛있었습니다. 다음에도 꼭 예약하고 싶어요.',
        helpful: 8
      },
      {
        id: 3,
        user: '이**',
        rating: 4,
        date: '2024-01-12',
        comment: '아이들이 단팥빵을 정말 좋아해요. 따뜻한 나눔에 감사드립니다.',
        helpful: 15
      }
    ]
  };

  const handleReservation = () => {
    navigate(`/booking/${id}`);
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
          <h1 className="text-lg font-semibold">매장 상세</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-64 bg-gray-200">
        <img 
          src={bakery.image} 
          alt={bakery.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{bakery.name}</h2>
              <span className="inline-block bg-orange-100 text-orange-700 text-sm px-3 py-1 rounded-full">
                {bakery.category}
              </span>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{bakery.rating}</span>
                <span className="text-gray-500 text-sm">({bakery.reviewCount})</span>
              </div>
              <span className="text-sm font-medium text-orange-600">{bakery.distance}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">영업시간: {bakery.openTime}</div>
                <div className="text-sm text-orange-600 font-medium">픽업시간: {bakery.pickupTime}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{bakery.address}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Phone className="w-5 h-5 mr-3" />
              <span>{bakery.phone}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="flex items-center justify-center px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              전화
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
              <Navigation className="w-4 h-4 mr-2" />
              길찾기
            </button>
          </div>
        </div>

        {/* Available Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">기부 가능한 빵</h3>
          <div className="space-y-4">
            {bakery.availableItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 line-through mr-2">
                      원가 {item.originalPrice.toLocaleString()}원
                    </span>
                    <span className="text-sm font-medium text-orange-600">무료 나눔</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-900">{item.count}개</span>
                  <div className="text-sm text-gray-500">남음</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            리뷰 ({bakery.reviewCount})
          </h3>
          <div className="space-y-4">
            {bakery.reviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.user}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <div className="flex items-center space-x-4">
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    도움됨 {review.helpful}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-orange-600 font-medium hover:bg-orange-50 rounded-lg transition-colors">
            모든 리뷰 보기
          </button>
        </div>
      </div>

      {/* Sticky Bottom Button */}
      <div className="sticky bottom-0 p-4 bg-white border-t">
        <button 
          onClick={handleReservation}
          className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg hover:bg-orange-700 transition-colors font-medium text-lg"
        >
          예약하기
        </button>
      </div>
    </div>
  );
};

export default BakeryDetail;
