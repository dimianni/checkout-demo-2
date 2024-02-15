import Image from "next/image"

export default function ProductCard() {
    return (
        <div className="bg-green-500 p-6 rounded">
            <div className="flex justify-between items-start">
                <div className='min-w-[40%] bg-white p-2 flex justify-center items-center rounded-lg'>
                    <figure>
                        <Image src="/tee.jpg" alt="tee" width={100} height={100} />
                    </figure>
                </div>
                <div className="w-full p-5">
                    <h2 className="font-semibold">Black Tee</h2>
                    <p>19.99 EUR</p>
                    <p>Quantity: 1</p>
                </div>
            </div>
        </div>
    )
} 