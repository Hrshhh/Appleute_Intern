import { IconShoppingCartFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state: any) => state.carts);
  const navigate = useNavigate();

  return (
    <div className='w-full h-[6rem] flex justify-center  bg-black text-white'>
      <div className='flex w-[80%] justify-between items-center h-full'>
        <div className='text-3xl uppercase font-semibold'>iudfnjiknb</div>
        <div className='relative'>
          <div className='absolute bg-red-500 rounded-full w-5 h-5 p-2 inline-flex items-center justify-center border-2 border-black -right-1 -top-2'>{cartItems?.length}</div>
          <IconShoppingCartFilled size={40} stroke={2} className='cursor-pointer' onClick={() => navigate("/cart")}/>
        </div>
      </div>
    </div>
  )
}

export default Header