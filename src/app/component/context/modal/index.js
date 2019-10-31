import React, { PureComponent, createContext } from 'react'

export const ModalContext = createContext('modal')

export const ModalComponent = ModalContext.Consumer

export class ModalProvider extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: this.props.isOpen || false,
      modalChildren: null,
    }
  }

  render () {
    return (
      <ModalContext.Provider
        value={{
          isOpen: this.state.isOpen,
          children: this.state.modalChildren,
          setOpen: ({ isOpen, children = null }) => {
            if (!children) {
              this.setState({
                isOpen: isOpen,
              })
              // to support modal animation transform / fade by not removing children right away
              setTimeout(() => {
                this.setState({
                  modalChildren: children,
                })
              }, 600)
              return
            }
            this.setState({
              isOpen: children && isOpen,
              modalChildren: isOpen ? children : null,
            })
          },
        }}
      >
        {this.props.children}
      </ModalContext.Provider>
    )
  }
}
