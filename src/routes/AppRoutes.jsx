import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Feed from '../pages/Feed/Feed'
import ExplorerPage from '../pages/ExplorerPage/ExplorerPage'
import FriendsPage from '../pages/FriendsPage/FriendsPage'
import PhotoPage from '../pages/PhotoPage/PhotoPage'
import PostPage from '../pages/PostPage/PostPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import UserPage from '../pages/UserPage/UserPage'
import LikesPage from '../pages/LikesPage/LikesPage'
import ProfileEditPage from '../pages/ProfileEditPage/ProfileEditPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import LoginPage from '../pages/LoginPage/LoginPage'
import ErrorPage from '../pages/ErrorPage/ErrorPage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/feed' element={<Feed />}></Route>
            <Route path='/explorer' element={<ExplorerPage />}></Route>
            <Route path='/friends/:user_id' element={<FriendsPage />}></Route>
            <Route path='/photo/:photo_id' element={<PhotoPage />}></Route>
            <Route path='/post' element={<PostPage />}></Route>
            <Route path='/profile/:user_id' element={<ProfilePage />}></Route>
            <Route path='/my-profile' element={<UserPage />}></Route>
            <Route path='/my-likes' element={<LikesPage />}></Route>
            <Route path='/my-profile/edit' element={<ProfileEditPage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
    )
}

export default AppRoutes