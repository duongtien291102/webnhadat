"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform vec2 uMouse;
  
  varying vec2 vUv;

  void main() {
    // Lấy màu gốc của ảnh
    vec4 color = texture2D(uImage, vUv);
    
    // Giả lập chiều sâu (Depth) bằng độ sáng (Luminance)
    // Các phần màu sáng sẽ chuyển động nhiều hơn, phần tối chuyển động ít hơn
    float depth = (color.r + color.g + color.b) / 3.0;
    
    // Tính toán độ lệch dựa vào con trỏ chuột và độ sâu giả lập
    // Giảm độ lệch xuống 0.02 để khi zoom xa ra không bị lộ viền đen
    vec2 offset = uMouse * depth * 0.02;
    
    // Trừ đi offset để tạo hiệu ứng thị sai (parallax)
    vec2 finalUv = vUv - offset;
    
    vec4 finalColor = texture2D(uImage, finalUv);
    gl_FragColor = finalColor;
  }
`;

const ShaderPlane = ({ imagePath }: { imagePath: string }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  
  // Load texture (Sẽ bị suspend cho tới khi load xong)
  const texture = useTexture(imagePath);
  
  const uniforms = useMemo(
    () => ({
      uImage: { value: texture },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      // Lerp giúp hiệu ứng chuột mượt mà hơn (easing)
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        state.pointer.x, 
        0.05
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        state.pointer.y,
        0.05
      );
    }
  });

  // Tính toán scale để ảnh hiển thị trọn vẹn (giống object-fit: contain)
  // Như vậy sẽ lấy được cả cảnh 2 bên ngoài trời mà không bị crop
  const img = texture.image as any;
  const imageAspect = img ? img.width / img.height : 1;
  const viewportAspect = viewport.width / viewport.height;
  
  let scaleX = viewport.width;
  let scaleY = viewport.height;
  
  if (imageAspect > viewportAspect) {
    // Ảnh rộng hơn màn hình -> fit theo chiều ngang để thấy 2 bên
    scaleX = viewport.width;
    scaleY = viewport.width / imageAspect;
  } else {
    // Ảnh cao hơn màn hình -> fit theo chiều dọc
    scaleY = viewport.height;
    scaleX = viewport.height * imageAspect;
  }

  // Thu nhỏ hệ số nhân xuống 1.03 để ảnh xa hơn, giữ hiệu ứng nổi
  return (
    <mesh scale={[scaleX * 1.03, scaleY * 1.03, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default function DepthMapImage({ imagePath }: { imagePath: string }) {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Bật hiệu ứng intro sau khi component mount
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden", backgroundColor: "#000" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ShaderPlane imagePath={imagePath} />
        </Suspense>
      </Canvas>
      
      {/* UI Overlay */}
      <div style={{ 
        position: "absolute", 
        top: "50%", 
        left: "10%", 
        transform: "translateY(-50%)", 
        color: "white", 
        pointerEvents: "none", 
        textAlign: "left", 
        maxWidth: "600px",
        textShadow: "0 4px 30px rgba(0,0,0,0.6)" 
      }}>
        <h1 style={{ 
          fontSize: "4.5rem", 
          margin: "0 0 1rem 0", 
          fontWeight: "bold", 
          fontFamily: "'Playfair Display', Georgia, serif", 
          lineHeight: "1.05",
          opacity: mounted && !scrolled ? 1 : 0,
          transform: mounted && !scrolled ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s"
        }}>
          Kiến tạo những<br/>không gian<br/>sống vượt thời<br/>gian
        </h1>
        <p style={{ 
          fontSize: "1.1rem", 
          margin: "0 0 2.5rem 0",
          lineHeight: "1.6",
          fontFamily: "system-ui, -apple-system, sans-serif",
          opacity: mounted && !scrolled ? 0.85 : 0,
          transform: mounted && !scrolled ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s"
        }}>
          NOU.Architects mang đến thiết kế và thi công nhà ở<br />cao cấp, nơi nghệ thuật gặp gỡ cuộc sống.
        </p>
        <button style={{
          background: "transparent",
          color: "white",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          padding: "12px 28px",
          fontSize: "0.95rem",
          cursor: mounted && !scrolled ? "pointer" : "default",
          fontFamily: "system-ui, -apple-system, sans-serif",
          opacity: mounted && !scrolled ? 1 : 0,
          transform: mounted && !scrolled ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s",
          pointerEvents: mounted && !scrolled ? "auto" : "none"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "black"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; }}
        >
          Khám phá các công trình
        </button>
      </div>
    </div>
  );
}
