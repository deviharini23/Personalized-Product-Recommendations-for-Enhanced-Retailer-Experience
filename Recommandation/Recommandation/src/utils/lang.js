// Example translations
const translations = {
  en: {
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Name",
    welcome: "Welcome",
    logout: "Logout",
    products: "Products",
    addToCart: "Add to Cart",
  },
  hi: {
    login: "लॉगिन",
    register: "रजिस्टर",
    email: "ईमेल",
    password: "पासवर्ड",
    name: "नाम",
    welcome: "स्वागत है",
    logout: "लॉगआउट",
    products: "उत्पाद",
    addToCart: "कार्ट में जोड़ें",
  },
  te: {
    login: "లాగిన్",
    register: "రిజిస్టర్",
    email: "ఇమెయిల్",
    password: "పాస్వర్డ్",
    name: "పేరు",
    welcome: "స్వాగతం",
    logout: "లాగ్ అవుట్",
    products: "ఉత్పత్తులు",
    addToCart: "కార్టులో చేర్చండి",
  },
};

export const translate = (lang, key) => translations[lang]?.[key] || key;
