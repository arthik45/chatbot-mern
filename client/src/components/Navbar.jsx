
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

    const navigate=useNavigate();
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-green-600">HealtyfyMe</h2>
      <button onClick={()=>navigate('/login')}
      className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition">
        Login <img src={assets.arrow_icon} alt="arrow" className="inline-block ml-2 w-4 h-4"/>
      </button>
    </div>
  )
}

export default Navbar
