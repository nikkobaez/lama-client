import { FaFacebook, FaInstagramSquare, FaTwitter, FaPinterest, FaMap, FaPhoneAlt,  } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { PaymentIcon } from 'react-svg-credit-card-payment-icons';

const Footer = () => {
    return (
        <div className='flex flex-col lg:flex-row'>
            {/* LEFT */}
            <div className="flex flex-col flex-1 p-5">
                <h1 className="text-2xl font-bold">
                    LAMA
                </h1>
                <p className="my-5">   
                    A distinctive clothing brand store, we stands out with our unique array of styles and designs. The brand's collections are a testament to creativity and sophistication, offering a dynamic blend that transcends the ordinary. 
                </p>
                <div className="flex gap-3">
                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#3b5999]">
                        <FaFacebook size={20} color="white" />
                    </div>
                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e4405f]">
                        <FaInstagramSquare size={22} color="white" />
                    </div>
                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#55acee]">
                        <FaTwitter size={20} color="white" />
                    </div>
                    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#e60023]">
                        <FaPinterest size={20} color="white"/>
                    </div>
                </div>
            </div>

            {/* CENTER */}
            <div className="flex-1 p-5">
                <h3 className="mb-5 text-lg font-bold">
                    Useful Links
                </h3>
                <ul className="flex flex-wrap p-0 m-0 list-none">
                    <li className="w-1/2 pb-3 cursor-pointer">Home</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Cart</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Men's Fashion</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Women's Fashion</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Accessories</li>
                    <li className="w-1/2 pb-3 cursor-pointer">My Account</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Order Tracking</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Wishlist</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Privacy Policy</li>
                    <li className="w-1/2 pb-3 cursor-pointer">Terms of Conditions</li>
                </ul>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col flex-1 p-5">
                <div className="flex flex-col gap-4 mb-5">
                    <h3 className="text-lg font-bold">
                        Contact
                    </h3>
                    <div className="flex items-center gap-3">
                        <FaMap size={20}/>
                        <p>
                            622 Dixie Path, South Tobinchester 98336
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaPhoneAlt size={20}/>
                        <p>
                            +1 243-123-1243
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <IoMdMail size={20}/>
                        <p>
                            support@lama.com
                        </p>
                    </div>
                </div>
                
                <div className="flex gap-3">
                    <PaymentIcon type="mastercard" format="flatRounded" width={50} />
                    <PaymentIcon type="paypal" format="flatRounded" width={50} />
                    <PaymentIcon type="amex" format="flatRounded" width={50} />
                    <PaymentIcon type="visa" format="flatRounded" width={50} />
                    <PaymentIcon type="discover" format="flatRounded" width={50} />
                </div>
            </div>
        </div>
    )
}

export default Footer