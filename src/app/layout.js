import { Cormorant_Garamond, Outfit, Uncial_Antiqua, Cinzel } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const uncial = Uncial_Antiqua({
  variable: "--font-uncial",
  subsets: ["latin"],
  weight: ["400"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "EGLANTO | Luxury Jewelry Showcase & High Craftsmanship",
  description: "Discover Eglanto's timeless masterpieces of gold, diamonds, and elegance. Experience an premium, high-fashion layout of handcrafted collections.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${uncial.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6F0] text-[#103033] selection:bg-[#103033] selection:text-[#FAF6F0] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
