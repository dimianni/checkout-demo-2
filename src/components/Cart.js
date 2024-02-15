import ProductCard from "@/UI/ProductCard/ProductCard";

export default function Cart(){
    return (
        <div className="flex flex-col">
            <h1 className="w-full text-center text-2xl font-bold mb-8">Your Cart:</h1>
            <ProductCard />
        </div>
    )
}