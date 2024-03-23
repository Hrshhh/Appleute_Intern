import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Header from '../home/Header';
import { addToCart, decrementItem, removeAllItems, removeItem } from '../../redux/features/cartSlice';
import { Card, Image } from '@mantine/core';
import { IconMinus, IconPlus, IconShoppingCartFilled, IconTrash } from '@tabler/icons-react';
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {

    const { cartItems } = useSelector((state: any) => state.carts);
    const [totalPrice, setTotalPrice] = useState(0);

    const dispatch = useDispatch();

    const handleIncrement = (item: any) => {
        dispatch(addToCart(item));
    }

    const handleItemRemoval = (id: number) => {
        dispatch(removeItem(id));
        toast.success("Item is removed from your cart")
    }

    const handleDecrementItem = (id: number) => {
        dispatch(decrementItem(id));
    }

    const handleDecrement = (item: any) => {
        item?.quantity <= 1 ? handleItemRemoval(item?.id) : handleDecrementItem(item?.id);
    }

    const handleEmptyCart = () => {
        dispatch(removeAllItems())
        toast.success("Your Cart is Empty");

    }

    const total = () => {
        let totalCost = 0
        cartItems?.map((item: any) => {
            totalCost += item.price * item.quantity;
        });
        setTotalPrice(totalCost)
    }


    useEffect(() => {
        total();
    }, [total])

    const proceedToPay = async() => {
        const stripe = await loadStripe("pk_test_51Ox2rVSGw934jnQ4kLdqRfAjJ5LBAeXLWqz6OTtQuehrqSp9kDZkcCGTXy2bSJcn9oZU9Jf9dPCus9cdqzRW896V002liDMAXz");

        const body = {
            products:cartItems
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:5000/stripe/checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = await stripe?.redirectToCheckout({
            sessionId:session.id
        });

        if(result?.error){
            console.log(result?.error);
        }
    }


    return (
        <>
            <Header />

            <div className='w-full bg-[#f5f5f5]  h-[calc(100vh-6rem)]'>
                <div className='flex justify-center'>
                    <Card className='bg-white mt-10 shadow-lg w-[80%] p-0'>
                        <div className='bg-black text-white h-[5rem] flex justify-between px-5 items-center'>
                            <div className='text-2xl font-semibold'>Cart</div>
                            {cartItems?.length > 0 &&
                                <div>
                                    <button className='bg-red-500 px-5 py-1 rounded-md' onClick={handleEmptyCart}>Empty Card</button>
                                </div>
                            }
                        </div>
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
                                                <td><Image src={item.image} h={50} className='object-contain' alt="products" /></td>
                                                <td className='text-center text-wrap'>{item.name}</td>
                                                <td className='text-center'>${item.price}</td>
                                                <td>
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
                                                <td className='text-center'>${(item?.quantity * item?.price).toFixed(2)}</td>
                                                <td className='text-center'>
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
                                                Total Price<span className='ml-2 mr-2'>:</span><span className='text-violet-400'>₹ {totalPrice.toFixed(2)}</span>
                                            </th>
                                            <th className='text-center'>
                                                <button className='bg-yellow-400 px-3 py-2 rounded-md' onClick={proceedToPay}>Checkout</button>
                                            </th>
                                        </tr>
                                    </tfoot>
                                </table>
                            }
                        </div>
                    </Card>
                </div >

            </div>

        </>
    )
}

export default Cart;


