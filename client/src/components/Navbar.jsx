
const Navbar = () => {
  return (
    <nav className="bg-gray-500 h-16 w-full flex justify-between text-white">
        <div className="p-3">
            <h1 className="text-2xl">Logo</h1>
        </div>
        <div className="p-3 flex gap-2">
            <h1 className="text-2xl">cart</h1>
            <div className="bg-red-500 p-2 rounded-full">12</div>
        </div>
    </nav>
  )
}

export default Navbar