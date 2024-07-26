
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Search,LogOut,Menu} from 'lucide-react';
import { useAuthStore } from '../../store/authUser';
import { useContentStore } from '../../store/content';

const Navbar = () => {
    const [isMobileMenuOpen,setMobileMenuOpen] = useState(false);
    const {setContentType} = useContentStore();
  

    const toggleMobileMenu=()=>{
        setMobileMenuOpen(!isMobileMenuOpen);
    }
    const {user,logout} = useAuthStore();
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 ">
        <div className="flex items-center gap-10 z-50">
            <Link to={'/'}>
            <img src="/netflix-logo.png" alt="netflix logo" className='w-32 sm:w-40' />
            </Link>

            <div className='hidden sm:flex gap-2 items-center '>
                <Link to={'/'} className='hover:untderline' onClick={()=>setContentType('movie')}>
                Movies
                </Link>
                <Link to={'/'} className='hover:untderline' onClick={()=>setContentType('tv')}>
                TV Shows
                </Link>
                <Link to={'/history'} className='hover:untderline'>
                History
                </Link>
            </div>
        </div>
        <div className='flex gap-2 items-center z-50'>
            <Link to={'/search'}>
            <Search className='size-6 cursor-pointer'/>
            </Link>
            <img src={user?.image} alt="profile" className='rounded cursor-pointer h-8' />
            <LogOut className='size-6 cursor-pointer' onClick={logout}/>
            <div className='sm:hidden '>
            <Menu  className='size-6 cursor-pointer ' onClick={toggleMobileMenu}/>
            </div>

        </div>




        {/* mobile navbar items */}
        {isMobileMenuOpen && (
            <div className='w-full sm:hidden  mt-4 z-50 bg-black border rounded border-gray-800'>
                <Link className='block hover:underline p-2' onClick={toggleMobileMenu} to={'/'}>Movies</Link>
                <Link className='block hover:underline p-2' onClick={toggleMobileMenu} to={'/'}>TV Shows</Link>
                <Link className='block hover:underline p-2' onClick={toggleMobileMenu} to={'/history'}>History</Link>
                
            </div>
        )}






    </header>
  )
}

export default Navbar
