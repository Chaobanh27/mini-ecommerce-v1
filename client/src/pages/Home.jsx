import { useEffect, useState } from "react" 
import data from '../assets/MOCK_DATA.json'
import ProductCard from "../components/ProductCard"
import Navbar from "../components/Navbar"

const Home = () => {
      const [products, setProducts] = useState([])

  useEffect(() => {
    if(data.length > 0){
      setProducts(data)
    }
  }, [])
  return (
    <div className="min-h-screen w-full bg-gray-800">
      <Navbar/>
      <div className=" h-full grid lg:grid-cols-4 md:grid-cols-3 gap-4 sm:grid-cols-2 px-30 py-5">
        <ProductCard products={products} />
      </div>
    </div>
  )
}

export default Home