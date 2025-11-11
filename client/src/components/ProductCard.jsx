
const ProductCard = ({ products }) => {
    const renderProducts = () => {
        if(products.length > 0) {
            return products.map((data) => {
                return <div key={data.id} className="bg-amber-50 rounded-2xl">
                    <img src={data.productImage} alt="product image" className="rounded-t-2xl" />
                    <div className="p-2">
                        <h2>{data.productName}</h2>
                        <p>${data.price}</p>
                        <button className="bg-green-400 cursor-pointer p-2 ">add to cart</button>
                    </div>
                </div>
            })
        } else {
            return <div>Data is loading...</div>
        }
    }
  return (
    <>
        {renderProducts()}
    </>
  )
}

export default ProductCard