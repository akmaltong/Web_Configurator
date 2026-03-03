import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei"
import { Suspense, useState } from "react"
import * as THREE from "three"
import { ProductScene } from "./ProductScene"
import { Sidebar } from "./Sidebar"
import { products } from "./products"

export const App = () => {
  const [activeProduct, setActiveProduct] = useState("iq-wall")
  const product = products[activeProduct]

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar
        products={products}
        activeProduct={activeProduct}
        onSelectProduct={setActiveProduct}
      />
      <div style={{ flex: 1, position: "relative" }} onContextMenu={(e) => e.preventDefault()}>
        <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 35 }}>
          <color attach="background" args={["#f0f0f0"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
          <Suspense fallback={null}>
            <ProductScene key={product.id} product={product} />
          </Suspense>
          <ContactShadows position={[0, -0.01, 0]} opacity={0.35} scale={12} blur={2.5} far={4} />
          <Environment files={`${process.env.PUBLIC_URL}/adamsbridge.hdr`} />
          <OrbitControls
            makeDefault
            minPolarAngle={0.2}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={1.5}
            maxDistance={12}
            enablePan={true}
            panSpeed={1}
            screenSpacePanning={true}
            mouseButtons={{
              LEFT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.PAN,
              RIGHT: THREE.MOUSE.PAN,
            }}
          />
        </Canvas>
        <div style={{
          position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          color: "#aaa", fontSize: 11, userSelect: "none", pointerEvents: "none",
        }}>
          Левая кнопка — вращение • Колёсико зажать — панорамирование • Скролл — зум
        </div>
      </div>
    </div>
  )
}
