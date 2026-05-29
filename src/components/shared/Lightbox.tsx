'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

interface LightboxContextValue {
  open: (src: string, alt?: string) => void
}

const LightboxContext = createContext<LightboxContextValue>({ open: () => {} })

export function useLightbox() {
  return useContext(LightboxContext)
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ src: string; alt: string } | null>(null)

  const open = useCallback((src: string, alt = 'Expanded view') => {
    setState({ src, alt })
  }, [])

  const close = () => setState(null)

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {state && (
              <motion.div
                key="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={close}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
              >
                <motion.img
                  src={state.src}
                  alt={state.alt}
                  initial={{ scale: 0.92 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-full max-h-full rounded-lg object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </LightboxContext.Provider>
  )
}

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
}

export function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
  const { open } = useLightbox()
  return (
    <img
      src={src}
      alt={alt}
      onClick={() => open(src, alt)}
      className={`cursor-zoom-in ${className ?? ''}`}
    />
  )
}
