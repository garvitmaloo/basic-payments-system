export default async function loadScript(): Promise<boolean> {
  const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}
