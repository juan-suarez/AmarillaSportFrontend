import { Header } from "@/components/header";
import ButtonsExtension from "@/components/headerButtonsExtension";
import { Products } from "@/components/products";

export default function Home() {
  return (
    <main>
      <Header/>
      <ButtonsExtension />
      <Products />
    </main>
  );
}
