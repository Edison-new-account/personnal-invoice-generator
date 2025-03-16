// Interface pour définir la structure de chaque devise
interface Currency {
  currency: string; // Code ISO 4217 (3 lettres)
  symbol: string; // Symbole monétaire
  name: string; // Nom littéral de la devise
}

// Objet contenant les devises
export const currencies: Record<string, Currency> = {
  USD: { currency: "USD", symbol: "$", name: "United States Dollar" },
  EUR: { currency: "EUR", symbol: "€", name: "Euro" },
  JPY: { currency: "JPY", symbol: "¥", name: "Japanese Yen" },
  GBP: { currency: "GBP", symbol: "£", name: "British Pound Sterling" },
  AUD: { currency: "AUD", symbol: "$", name: "Australian Dollar" },
  CAD: { currency: "CAD", symbol: "$", name: "Canadian Dollar" },
  CHF: { currency: "CHF", symbol: "Fr", name: "Swiss Franc" },
  CNY: { currency: "CNY", symbol: "¥", name: "Chinese Yuan" },
  INR: { currency: "INR", symbol: "₹", name: "Indian Rupee" },
  MXN: { currency: "MXN", symbol: "$", name: "Mexican Peso" },
  NZD: { currency: "NZD", symbol: "$", name: "New Zealand Dollar" },
  ZAR: { currency: "ZAR", symbol: "R", name: "South African Rand" },
  RUB: { currency: "RUB", symbol: "₽", name: "Russian Ruble" },
  BRL: { currency: "BRL", symbol: "R$", name: "Brazilian Real" },
  KRW: { currency: "KRW", symbol: "₩", name: "South Korean Won" },
  SEK: { currency: "SEK", symbol: "kr", name: "Swedish Krona" },
  NOK: { currency: "NOK", symbol: "kr", name: "Norwegian Krone" },
  TRY: { currency: "TRY", symbol: "₺", name: "Turkish Lira" },
  HKD: { currency: "HKD", symbol: "$", name: "Hong Kong Dollar" },
  SGD: { currency: "SGD", symbol: "$", name: "Singapore Dollar" },
  THB: { currency: "THB", symbol: "฿", name: "Thai Baht" },
  MYR: { currency: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
  IDR: { currency: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
  ARS: { currency: "ARS", symbol: "$", name: "Argentine Peso" },
  COP: { currency: "COP", symbol: "$", name: "Colombian Peso" },
  PEN: { currency: "PEN", symbol: "S/", name: "Peruvian Sol" },
  SAR: { currency: "SAR", symbol: "ر.س", name: "Saudi Riyal" },
  AED: { currency: "AED", symbol: "د.إ", name: "United Arab Emirates Dirham" },
  ILS: { currency: "ILS", symbol: "₪", name: "Israeli New Shekel" },
  XOF: { currency: "XOF", symbol: "CFA", name: "West African CFA Franc" },
  XAF: { currency: "XAF", symbol: "CFA", name: "Central African CFA Franc" },
  KES: { currency: "KES", symbol: "KSh", name: "Kenyan Shilling" },
  NGN: { currency: "NGN", symbol: "₦", name: "Nigerian Naira" },
  DKK: { currency: "DKK", symbol: "kr", name: "Danish Krone" },
  PLN: { currency: "PLN", symbol: "zł", name: "Polish Zloty" },
  CZK: { currency: "CZK", symbol: "Kč", name: "Czech Koruna" },
  HUF: { currency: "HUF", symbol: "Ft", name: "Hungarian Forint" },
  PHP: { currency: "PHP", symbol: "₱", name: "Philippine Peso" },
  VND: { currency: "VND", symbol: "₫", name: "Vietnamese Dong" },
  CLP: { currency: "CLP", symbol: "$", name: "Chilean Peso" },
};

// Type pour les codes de devise (optionnel, pour une vérification stricte)
export type CurrencyCode = keyof typeof currencies;
