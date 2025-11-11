import { useEffect, useState } from "react";
import Message from "./components/Message";

function App() {
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    try {
      // Gọi backend để tạo Checkout Session
      const res = await fetch("https://mini-ecommerce-v1.vercel.app/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: [{ name: "T-Shirt", price: 20, quantity: 1 }],
        }),
      });

      const data = await res.json();

      if (data?.url) {
        // Redirect trực tiếp đến Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("❌ Không nhận được session.url từ backend");
      }
    } catch (err) {
      console.error("❌ Lỗi khi tạo checkout session:", err);
    }
  };
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  return message ? (
    <Message message={message}/>
  ) : (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>T-Shirt - $20</h1>
      <button onClick={handleCheckout}>Thanh toán</button>
    </div>
  );
}

export default App;
