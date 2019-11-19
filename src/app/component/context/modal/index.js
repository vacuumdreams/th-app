import React, { createContext } from 'react'

export const ModalContext = createContext('modal')

export const ModalComponent = ModalContext.Consumer

export function ModalProvider () {
  const [isOpen, setOpen] = useState(false)
  const [mChildren, setChildren] = useState(null)

  return (
    <ModalContext.Provider
      value={{
        isOpen: this.state.isOpen,
        children: this.state.modalChildren,
        setOpen: ({ isOpen, children = null }) => {
          if (!children) {
            setOpen(isOpen)
            // to support modal animation transform / fade by not removing children right away
            setTimeout(() => {
              setChildren(children)
            }, 600)
            return
          }
          setOpen(children && isOpen)
          setChildren(isOpen ? children : null)
        },
      }}
    >
      {this.props.children}
    </ModalContext.Provider>
  )
}
