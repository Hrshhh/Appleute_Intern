
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Image } from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCartFilled, IconTrash } from '@tabler/icons-react';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import { addToCart, decrementItem, removeItem } from '../../redux/features/cartSlice';

const CartTable = () => {
    const { cartItems } = useSelector((state: any) => state.carts);
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch();

    const handleItemRemoval = (id: number) => {
        dispatch(removeItem(id));
        toast.success("Item is removed from your cart")
    }

    const handleDecrementItem = (id: number) => {
        dispatch(decrementItem(id));
    }
    const handleIncrement = (item: any) => {
        dispatch(addToCart(item));
    }

    const handleDecrement = (item: any) => {
        item?.quantity <= 1 ? handleItemRemoval(item?.id) : handleDecrementItem(item?.id);
    }


    const total = () => {
        let totalCost = 0
        cartItems?.map((item: any) => {
            totalCost += item.price * item.quantity;
        });
        setTotalPrice(totalCost)
    }

    const proceedToPay = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

        const headers = {
            "Content-Type":"application/json"
        }        

        const response = await fetch(`${import.meta.env.VITE_LOCAL_URL}/stripe/checkout-session`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify({ products:cartItems  })
        });

        const session = await response.json();

        const result = await stripe?.redirectToCheckout({
            sessionId:session.id
        });

        if(result?.error){
            console.log(result?.error);
        }
    }

    useEffect(() => {
        total();
    }, [total])

    return (
        <div >
            {cartItems?.length === 0 ?
                <table className='w-full'>
                    <tbody className='flex items-center justify-center w-full h-[12rem]'>
                        <div className='flex flex-col items-center '>
                            <IconShoppingCartFilled fill='grey' size={55} stroke={2} className='mb-2' />

                            <div className='text-xl text-[#4f4d4d]'>Your Cart is Empty</div>

                        </div>
                    </tbody>
                </table>
                :
                <table className='w-full'>
                    <thead className='h-[4rem]'>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.map((item: any) => (
                            <tr className='h-[5rem]'>
                                <td className='w-[10%]'><Image src={item.image} h={50} className='object-contain' alt="products" /></td>
                                <td className='w-[35%] text-center text-wrap'>{item.name}</td>
                                <td className='w-[10%] text-center'>${item.price}</td>
                                <td className='w-[20%]'>
                                    <div className='flex gap-3 items-center justify-center'>
                                        <button className='bg-[#d6c1f2] p-2' onClick={() => handleDecrement(item)}>
                                            <IconMinus stroke={2} fill="white" />
                                        </button>
                                        <div>{item?.quantity}</div>
                                        <button className='bg-[#d6c1f2] p-2'>
                                            <IconPlus stroke={2} fill='grey' onClick={() => handleIncrement(item)} />
                                        </button>
                                    </div>
                                </td>
                                <td className='w-[15%] text-center'>${(item?.quantity * item?.price).toFixed(2)}</td>
                                <td className='w-[10%] text-center'>
                                    <button onClick={() => handleItemRemoval(item?.id)}>
                                        <IconTrash color='red' strokeWidth={1} fill="none" />
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                    <tfoot className='h-[4rem]'>
                        <tr>
                            <th>&nbsp;</th>
                            <th colSpan={2}>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th className='text-center'>
                                Total Price<span className='ml-2 mr-2'>:</span><span className='text-violet-800'>₹ {totalPrice.toFixed(2)}</span>
                            </th>
                            <th className=''>
                                <div className='flex justify-center items-center'>
                                    <div className="checkout_btn relative cursor-pointer box-border flex justify-center items-center overflow-hidden rounded-md w-[100px] h-[2.5rem]" onClick={proceedToPay}>
                                        <div className="text-base font-medium z-[1] text-white">
                                            Checkout
                                        </div>
                                        <div className="glamour_grip absolute bg-yellow-400 left-0 w-[100px] h-[100px] shadow-custom-inner"></div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            }
        </div>
    )
}

export default CartTable