import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, ShoppingBag, Menu, X, ChevronDown, LogOut, Package, UserCircle } from 'lucide-react'
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
    /* REMOVED: 'fixed', 'top-0', 'left-0', 'px-4', 'pt-6' */
    /* ADDED: 'relative' and 'w-full' to flow with the document */
    <nav className="relative w-full z-[100] bg-white/95 backdrop-blur-xl border-b border-zinc-100 shadow-sm">
      {/* REMOVED: max-width and rounded corners to make it expand fully across */}
      <div className="w-full">
        <div className="flex justify-between items-center h-28 px-8 md:px-14">
          <Link to="/" className="flex flex-col items-start group">
            <span className="text-4xl font-black tracking-tighter text-zinc-900">unc</span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400 -mt-1 hidden md:block">
              code stores
            </span>
          </Link>

          <ul className="hidden md:flex items-center space-x-12 text-sm font-black tracking-[0.15em] text-zinc-800">
            <li>
              <Link to="/" className="hover:text-zinc-500 transition-colors">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/store" className="hover:text-zinc-500 transition-colors">
                STORE
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-zinc-500 transition-colors">
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-zinc-500 transition-colors">
                ABOUT US
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-6">
            <div
              className="relative flex justify-center"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}>
              {userInfo ? (
                <button className="flex items-center space-x-3 py-4 focus:outline-none group">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white transition-all shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link to="/login" className="text-zinc-900 p-2">
                  <User className="w-6 h-6" />
                </Link>
              )}

              {userInfo && isProfileOpen && (
                <div className="absolute top-full right-0 md:left-1/2 md:-translate-x-1/2 w-72 pt-2 bg-white border border-zinc-100 shadow-2xl rounded-2xl overflow-hidden mt-[-10px]">
                  <div className="px-8 py-5 border-b border-zinc-50">
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-black mb-1">
                      Identity
                    </p>
                    <p className="text-base font-black text-zinc-900 truncate">{userInfo.name}</p>
                  </div>

                  <div className="py-3">
                    <Link
                      to="/profile"
                      className="flex items-center px-8 py-4 text-[13px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
                      <UserCircle className="w-5 h-5 mr-4" /> Profile
                    </Link>
                    <Link
                      to="/shipping"
                      className="flex items-center px-8 py-4 text-[13px] font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900">
                      <Package className="w-5 h-5 mr-4" /> Shipping
                    </Link>

                    {userInfo.isAdmin && (
                      <div className="mt-2 pt-2 border-t border-zinc-50">
                        <p className="px-8 pb-2 pt-2 text-[10px] font-black text-zinc-900 uppercase tracking-widest">
                          Admin Control
                        </p>
                        <Link
                          to="/admin/orderlistadmin"
                          className="block px-8 py-3 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest">
                          Orders
                        </Link>
                        <Link
                          to="/admin/users"
                          className="block px-8 py-3 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest">
                          Users
                        </Link>
                        <Link
                          to="/admin/productlistadmin"
                          className="block px-8 py-3 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest">
                          Products
                        </Link>
                        <Link
                          to="/admin/reviews"
                          className="block px-8 py-3 text-[12px] font-bold text-zinc-500 hover:text-zinc-900 uppercase tracking-widest">
                          Reviews
                        </Link>
                      </div>
                    )}

                    <button
                      onClick={logoutHandler}
                      className="w-full flex items-center px-8 py-5 text-[12px] font-black uppercase tracking-widest text-red-500 border-t border-zinc-50 mt-2 hover:bg-red-50 transition-colors">
                      <LogOut className="w-5 h-5 mr-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative group">
              <div className="bg-zinc-900 text-white p-4 rounded-full shadow-lg transition-transform group-hover:scale-110">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-zinc-900 text-[10px] font-black h-6 w-6 rounded-full flex items-center justify-center border-2 border-zinc-900 shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-zinc-900 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full left-0 top-28 bg-white border-b border-zinc-100 shadow-2xl p-10 animate-in slide-in-from-top-5">
          <ul className="space-y-8 text-3xl font-black tracking-tighter text-zinc-900">
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
        </div>
      )}
    </nav>
  )
}

export default Navbar
