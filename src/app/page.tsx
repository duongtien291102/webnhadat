import DepthMapImage from "@/three/DepthMapImage";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#000", minHeight: "200vh" }}>
      <DepthMapImage imagePath="/asset/background.png" />
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
        <h2 style={{ fontFamily: "sans-serif", fontWeight: "300", letterSpacing: "2px", opacity: 0.5 }}>
          [ Các section nội dung khác sẽ nằm ở đây ]
        </h2>
      </div>
    </main>
  );
}
