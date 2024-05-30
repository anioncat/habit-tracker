import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button'
import { AppStyle } from '../config/style'

const Dialog = ({
  title,
  children,
  actions,
  isOpen = false,
  onClose,
  closeLabel = 'Close',
}: {
  title: string
  children?: ReactNode
  actions?: [[label: string, action: () => void]]
  isOpen: boolean
  onClose: () => void
  closeLabel?: string
}) => {
  const ScreenContainer = ({ children }: { children?: ReactNode }) => (
    <div
      className={`${
        isOpen ? '' : 'hidden '
      }w-full h-full fixed top-0 transition-opacity`}>
      {children}
    </div>
  )

  const Overlay = () => (
    <div
      onClick={onClose}
      className="bg-black opacity-40 absolute w-full h-full top-0"></div>
  )

  const ContentContainer = ({ children }: { children?: ReactNode }) => (
    <div
      className={`rounded-md flex flex-col items-center p-4 bg-surface-0 w-fit h-fit min-w-[50vw] max-w-[80vw] min-h-[25vh] max-h-[75vh] absolute inset-0 m-auto border ${AppStyle.borderColor} overflow-scroll`}>
      {children}
    </div>
  )

  return createPortal(
    <ScreenContainer>
      <Overlay></Overlay>
      <ContentContainer>
        <h2 className="font-bold text-2xl text-text">{title}</h2>
        <div className="[&_*]:text-text">{children}</div>
        <div className="self-end mt-auto">
          {actions?.map((a) => (
            <Button onClick={a[1]}>a[0]</Button>
          ))}
          <Button onClick={onClose} secondary>
            {closeLabel}
          </Button>
        </div>
      </ContentContainer>
    </ScreenContainer>,
    document.body
  )
}

export default Dialog
