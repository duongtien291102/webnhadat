import DepthMapImage from "@/three/DepthMapImage";
import BimSolutions from "@/components/BimSolutions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#000", minHeight: "200vh" }}>
      <DepthMapImage imagePath="/asset/background.png" />
      <div style={{ position: 'relative', zIndex: 1, marginTop: '100vh', backgroundColor: '#f6f7f9' }}>
        <BimSolutions />
        <Footer />
      </div>
    </main>
  );
}
