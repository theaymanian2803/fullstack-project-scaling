import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Settings,
  LogOut,
  Package,
  UserCircle,
} from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import { resetCart } from './../slices/cartSlice'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      dispatch(resetCart())
      navigate('/')
    } catch (error) {
      console.log(error?.data?.message || error.message)
    }
  }

  const cartCount = cartItems.reduce((acc, item) => acc + Number(item.qty), 0)

  return (
    <nav className="sticky top-0 w-full bg-black text-white z-50 border-b border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-3xl font-black tracking-tighter group-hover:text-gray-300 transition-colors">
              EX
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-light -mt-1 hidden md:block">
              EVANOX STORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-10 text-sm font-semibold tracking-widest">
            <li>
              <Link to="/" className="hover:text-orange-400 transition-colors">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/store" className="hover:text-orange-400 transition-colors">
                STORE
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-orange-400 transition-colors">
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-orange-400 transition-colors">
                ABOUT US
              </Link>
            </li>
          </ul>

          {/* Action Icons */}
          <div className="flex items-center space-x-5">
            {/* Account Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}>
              {userInfo ? (
                <button className="flex items-center space-x-2 py-2 focus:outline-none group">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:border-orange-400 transition-all">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium uppercase tracking-wider">
                    {userInfo.name.split(' ')[0]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link to="/login" className="p-2 hover:text-orange-400 transition-colors">
                  <User className="w-6 h-6" />
                </Link>
              )}

              {/* Dropdown Menu */}
              {userInfo && isProfileOpen && (
                <div className="absolute right-0 w-56 mt-0 pt-2 bg-black border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="py-2">
                    <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/5 mb-2">
                      Account
                    </p>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors">
                      <UserCircle className="w-4 h-4 mr-3" /> Profile
                    </Link>
                    <Link
                      to="/shipping"
                      className="flex items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors">
                      <Package className="w-4 h-4 mr-3" /> Shipping
                    </Link>

                    {/* Admin Section within Dropdown */}
                    {userInfo.isAdmin && (
                      <>
                        <p className="px-4 py-2 text-[10px] uppercase tracking-widest text-orange-500 border-y border-white/5 my-2">
                          Admin Panel
                        </p>
                        <Link
                          to="/admin/orderlistadmin"
                          className="flex items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors">
                          Orders
                        </Link>
                        <Link
                          to="/admin/users"
                          className="flex items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors">
                          Users
                        </Link>
                        <Link
                          to="/admin/productlistadmin"
                          className="flex items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors">
                          Products
                        </Link>
                        <Link
                          to="/admin/components"
                          className="flex items-center px-4 py-3 text-sm hover:bg-white/5 transition-colors">
                          components
                        </Link>
                      </>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 border-t border-white/5 transition-colors mt-2">
                      <LogOut className="w-4 h-4 mr-3" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 group">
              <ShoppingBag className="w-6 h-6 group-hover:text-orange-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-black text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 animate-in slide-in-from-right duration-300">
          <div className="px-6 py-8 space-y-6">
            <ul className="flex flex-col space-y-6 text-xl font-bold tracking-tighter">
              <li>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/store" onClick={() => setIsMobileMenuOpen(false)}>
                  STORE
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>
                  SERVICES
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  ABOUT US
                </Link>
              </li>
            </ul>

            {userInfo && (
              <div className="pt-6 border-t border-white/10">
                <p className="text-orange-500 text-xs tracking-[0.2em] mb-4 uppercase">
                  {userInfo.name}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/profile"
                    className="text-sm uppercase tracking-widest text-gray-400"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link
                    to="/shipping"
                    className="text-sm uppercase tracking-widest text-gray-400"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Shipping
                  </Link>
                  {userInfo.isAdmin && (
                    <Link
                      to="/admin/orderlistadmin"
                      className="text-sm uppercase tracking-widest text-orange-400"
                      onClick={() => setIsMobileMenuOpen(false)}>
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="text-sm uppercase tracking-widest text-red-500 text-left">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
