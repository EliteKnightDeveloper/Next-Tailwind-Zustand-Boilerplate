import { useState } from 'react'
import { Id, Task } from '@/interfaces'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TaskMove, TaskTrash } from '../Icons'

interface Props {
  item: Task
  deleteItem: (id: Id) => void
}

const Item = ({ item, deleteItem }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: 'Task',
      item,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className="opacity-30 cursor-grab" />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex items-center gap-2 p-2 text-left rounded-lg hover:ring-1 hover:ring-inset hover:ring-neon-100 cursor-grab"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-gray-100">
            {item.title}
          </span>
          <span className="text-sm font-normal text-gray-200">
            {item.content}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div
            className="hover:cursor-pointer"
            onClick={() => deleteItem(item.id)}
          >
            <TaskTrash />
          </div>
          {mouseIsOver && (
            <div className="hover:cursor-grab">
              <TaskMove />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Item
