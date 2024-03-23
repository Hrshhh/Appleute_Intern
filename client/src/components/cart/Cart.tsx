import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mantine/core';
import { toast } from 'react-toastify';
import CartTable from './CartTable';
import Header from '../common/Header';
import { removeAllItems } from '../../redux/features/cartSlice';

const Cart = () => {
    const { cartItems } = useSelector((state: any) => state.carts);
    const dispatch = useDispatch();

    const handleEmptyCart = () => {
        dispatch(removeAllItems())
        toast.success("Your Cart is Empty");
    }

    return (
        <>
            <Header />
            <div className='w-full bg-[#f5f5f5]  h-[calc(100vh-6rem)]'>
                <div className='flex justify-center'>
                    <Card className='bg-white mt-10 shadow-lg w-[80%] p-0'>
                        <div className='bg-black text-white h-[5rem] flex justify-between px-5 items-center'>
                            <div className='text-2xl font-semibold'>Cart {cartItems?.length > 0 ? `(${cartItems?.length})` : ""}</div>
                            {cartItems?.length > 0 &&
                                <div>
                                    <button className='bg-violet-800 px-5 py-1 rounded-md' onClick={handleEmptyCart}>Empty Card</button>
                                </div>
                            }
                        </div>
                        <CartTable />

                    </Card>
                </div >

            </div>

        </>
    )
}

export default Cart;


