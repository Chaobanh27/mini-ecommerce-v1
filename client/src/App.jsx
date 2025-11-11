// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51NpwaQLViN3D9XNz99TnglqNN2pFfpj4hG2AXjscvtWZClEeMQXcRa61U8ljdjbhYaAjf1TfYM2VH4vXj2wrXPW7006j3z44QI");

function App() {
  const handleCheckout = async () => {
    const res = await fetch("https://mini-ecommerce-v1.vercel.app/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        products: [{ name: "T-Shirt", price: 20, quantity: 1 }]
      }),
    });

    const data = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.id });
  };
  return (
    <>
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>T-Shirt - $20</h1>
      <button onClick={handleCheckout}>Thanh toán</button>
    </div>
    {/* <Routes>
      <Route index element={<Home/>}/>
      <Route element />
    </Routes> */}
    </>
  )
}

export default App
