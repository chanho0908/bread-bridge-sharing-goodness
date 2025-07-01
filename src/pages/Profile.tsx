
import React, { useState } from 'react';
import { User, Bell, HelpCircle, LogOut, Heart, MapPin, Calendar, Settings, Shield } from 'lucide-react';

const Profile = () => {
  const [userType, setUserType] = useState('beneficiary'); // 'beneficiary' or 'donor'
  const [notifications, setNotifications] = useState({
    newDonations: true,
    reservationUpdates: true,
    reminders: true,
  });

  const userStats = {
    beneficiary: {
      totalReservations: 24,
      completedPickups: 22,
      favoriteStores: 5,
    },
    donor: {
      totalDonations: 156,
      itemsDonated: 2847,
      peopleHelped: 341,
    }
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">마이페이지</h1>
        <p className="text-gray-600">내 정보와 설정을 관리하세요</p>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">김춘배</h2>
            <p className="text-gray-600">
              {userType === 'beneficiary' ? '수혜자' : '기부자 (선영이네 베이커리)'}
            </p>
            <p className="text-sm text-gray-500">가입일: 2023년 12월 15일</p>
          </div>
        </div>

        {/* User Type Toggle */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">사용자 유형</label>
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setUserType('beneficiary')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'beneficiary'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              수혜자
            </button>
            <button
              onClick={() => setUserType('donor')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'donor'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              기부자
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {userType === 'beneficiary' ? (
            <>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{userStats.beneficiary.totalReservations}</p>
                <p className="text-sm text-gray-600">총 예약</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{userStats.beneficiary.completedPickups}</p>
                <p className="text-sm text-gray-600">수령 완료</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{userStats.beneficiary.favoriteStores}</p>
                <p className="text-sm text-gray-600">즐겨찾기</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{userStats.donor.totalDonations}</p>
                <p className="text-sm text-gray-600">총 기부</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{userStats.donor.itemsDonated}</p>
                <p className="text-sm text-gray-600">기부한 빵</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{userStats.donor.peopleHelped}</p>
                <p className="text-sm text-gray-600">도움받은 분</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">새로운 기부 알림</h4>
              <p className="text-sm text-gray-600">근처에 새로운 빵 기부가 있을 때 알림을 받습니다</p>
            </div>
            <button
              onClick={() => toggleNotification('newDonations')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.newDonations ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.newDonations ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">예약 업데이트</h4>
              <p className="text-sm text-gray-600">예약 상태 변경 시 알림을 받습니다</p>
            </div>
            <button
              onClick={() => toggleNotification('reservationUpdates')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.reservationUpdates ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.reservationUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">픽업 리마인더</h4>
              <p className="text-sm text-gray-600">픽업 시간 1시간 전에 알림을 받습니다</p>
            </div>
            <button
              onClick={() => toggleNotification('reminders')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications.reminders ? 'bg-orange-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications.reminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-orange-100 flex items-center justify-between hover:bg-orange-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">계정 설정</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-orange-100 flex items-center justify-between hover:bg-orange-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">개인정보 보호</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-orange-100 flex items-center justify-between hover:bg-orange-50 transition-colors">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">고객 지원</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>
        
        <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-orange-100 flex items-center justify-between hover:bg-red-50 transition-colors text-red-600">
          <div className="flex items-center space-x-3">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">로그아웃</span>
          </div>
          <span className="text-red-400">→</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
