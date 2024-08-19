import { Header } from "@/components/header";
import { Products } from "@/components/products";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header/>
      <Products />
    </main>
  );
}
