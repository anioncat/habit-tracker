import { useCallback, useEffect, useRef, useState } from 'react'

interface DropdownProps {
  label: string
  onClose?: () => void
  items: DropdownItem[]
}

export interface DropdownItem {
  label: string
  action: () => void
}

const Item = ({ label, action }: DropdownItem) => {
  return (
    <div
      className="hover:brightness-125 hover:bg-overlay-1 active:brightness-90 px-2"
      onClick={action}>
      {label}
    </div>
  )
}

const Dropdown = ({ label, items, onClose = () => {} }: DropdownProps) => {
  const [openState, setOpenState] = useState(false)

  const dropRef = useRef<HTMLDivElement>(null)

  const handleClose = useCallback(() => {
    setOpenState(false)
    onClose()
  }, [onClose])

  useEffect(
    () =>
      document.addEventListener(
        'click',
        (e: MouseEvent) =>
          !dropRef.current?.contains(e.target as Element) && handleClose()
      ),
    [handleClose]
  )

  return (
    <div
      ref={dropRef}
      className="select-none bg-overlay-0 py-1 rounded"
      onBlur={handleClose}>
      <Item
        label={label}
        action={() => {
          setOpenState(!openState)
        }}></Item>
      {openState &&
        items?.map((item) => {
          return <Item label={item.label} action={item.action}></Item>
        })}
    </div>
  )
}

export default Dropdown
