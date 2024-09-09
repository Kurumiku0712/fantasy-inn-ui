// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/common/Navbar';
import LoginPage from './component/auth/LoginPage';
import RegisterPage from './component/auth/RegisterPage';
import HomePage from './component/home/HomePage';
import ChatRoom from './component/chatroom/ChatRoom';
import Cinema from './component/cinema/Cinema';
import AllHousesPage from './component/booking_houses/AllHousesPage';
import HouseDetailsBookingPage from './component/booking_houses/HouseDetailsPage';
import FindBookingPage from './component/booking_houses/FindBookingPage';
import AdminPage from './component/admin/AdminPage';
import ManageHousePage from './component/admin/ManageHousePage';
import EditHousePage from './component/admin/EditHousePage';
import AddHousePage from './component/admin/AddHousePage';
import ManageBookingsPage from './component/admin/ManageBookingsPage';
import EditBookingPage from './component/admin/EditBookingPage';
import ProfilePage from './component/profile/ProfilePage';
import EditProfilePage from './component/profile/EditProfilePage';
import { ProtectedRoute, AdminRoute } from './service/guard';
import MovieList from './component/cinema/MovieList';  // 新增
import Trailer from './component/cinema/trailer/Trailer';
import Chatbots from './component/chatroom/Chatbots';

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        {/* Public Routes */}
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/home" element={<HomePage />} />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/houses" element={<AllHousesPage />} />
                        <Route path="/find-booking" element={<FindBookingPage />} />
                        <Route path="/chat" element={<ChatRoom />} />
                        <Route path="/cinema" element={<Cinema />} />
                        <Route path="/chatbots" element={<Chatbots />} />

                        {/* 新增电影相关路由 */}
                        <Route path="/movies" element={<MovieList />} />
                        <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>

                        {/* Protected Routes */}
                        <Route path="/house-details-book/:houseId"
                            element={<ProtectedRoute element={<HouseDetailsBookingPage />} />}
                        />
                        <Route path="/profile"
                            element={<ProtectedRoute element={<ProfilePage />} />}
                        />
                        <Route path="/edit-profile"
                            element={<ProtectedRoute element={<EditProfilePage />} />}
                        />

                        {/* Admin Routes */}
                        <Route path="/admin"
                            element={<AdminRoute element={<AdminPage />} />}
                        />
                        <Route path="/admin/manage-houses"
                            element={<AdminRoute element={<ManageHousePage />} />}
                        />
                        <Route path="/admin/edit-house/:houseId"
                            element={<AdminRoute element={<EditHousePage />} />}
                        />
                        <Route path="/admin/add-house"
                            element={<AdminRoute element={<AddHousePage />} />}
                        />
                        <Route path="/admin/manage-bookings"
                            element={<AdminRoute element={<ManageBookingsPage />} />}
                        />
                        <Route path="/admin/edit-booking/:bookingCode"
                            element={<AdminRoute element={<EditBookingPage />} />}
                        />

                        {/* Fallback Route */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
