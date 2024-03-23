import { Card, Image } from "@mantine/core";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { items } from './Constant';
import { addToCart } from "../../redux/features/cartSlice";

const Hero = () => {
  const dispatch = useDispatch();

  const handleCart = (item: any) => {
    dispatch(addToCart(item));
    toast.success("Item added In Your Cart")
  }

  return (
    <div className='w-full bg-[#f5f5f5] h-full overflow-hidden'>
      <div className='w-[80%] m-auto'>
        <div className='flex justify-between gap-5 flex-wrap'>
          {items.map((item) => (
            <Card key={item.id} className='h-full w-[23vw] my-10 bg-white text-black rounded-lg shadow-xl'>
              <Card.Section className="p-2">
                <Image
                  src={item.image}
                  h={320}
                  alt="Image"
                  className="object-contain"
                />
              </Card.Section>

              <div>
                <div className="text-center">{item.name}</div>
                <div className="flex justify-center">
                  <div className="my-2 flex justify-between items-center w-[80%]">
                    <h4 className="text-violet-800 font-bold">${item.price}</h4>
                    <div className="bg-yellow-400 rounded-md px-2">{item.rating}&nbsp;★</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button className="text-white bg-violet-800 px-4 py-2 rounded-md w-full" onClick={() => handleCart(item)}>Add To Cart</button>
                </div>
              </div>
            </Card>
          ))
          }
        </div>

      </div>
    </div>
  )
}

export default Hero