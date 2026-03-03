import { useRef, useEffect, useMemo } from "react"
import { useGLTF } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"

export function ProductScene({ product }) {
  const group = useRef()
  const { scene } = useGLTF(product.model)
  const { controls } = useThree()

  const cloned = useMemo(() => {
    const clone = scene.clone(true)
    scene.traverse((src) => {
      if (src.isMesh) {
        const target = clone.getObjectByName(src.name)
        if (target && target.isMesh) {
          target.material = src.material
        }
      }
    })

    if (product.fixTransparency) {
      clone.traverse((node) => {
        if (!node.isMesh) return
        const mats = Array.isArray(node.material) ? node.material : [node.material]
        mats.forEach((mat) => {
          if (mat && mat.transparent && mat.opacity < 0.5) {
            mat.opacity = 1
            mat.transparent = false
            mat.needsUpdate = true
          }
        })
      })
    }

    // Apply rotation BEFORE computing bounds
    const wrapper = new THREE.Group()
    wrapper.add(clone)
    wrapper.rotation.y = product.rotation || 0
    wrapper.updateMatrixWorld(true)

    return wrapper
  }, [scene, product.rotation, product.fixTransparency])

  useEffect(() => {
    if (!cloned || !group.current) return

    const box = new THREE.Box3().setFromObject(cloned)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.5 / maxDim

    group.current.scale.setScalar(scale)
    group.current.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale)

    if (controls) {
      controls.target.set(0, size.y * scale * 0.4, 0)
      controls.update()
    }
  }, [cloned, controls])

  return (
    <group ref={group}>
      <primitive object={cloned} />
    </group>
  )
}
