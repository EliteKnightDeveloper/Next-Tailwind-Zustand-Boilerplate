import { FC, useMemo, useState } from 'react'
import { Id, Task } from '@/interfaces'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import Item from './Item'

interface DragMoveProps {
  lists: Task[]
  onMoveEnd: (items: Task[]) => void
}

const DragMove: FC<DragMoveProps> = ({ lists, onMoveEnd }) => {
  const [items, setItems] = useState<Task[]>(lists)
  const itemsIds = useMemo(() => {
    return items.map((item) => item.id)
  }, [items])

  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const onDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current!.item)
    return
  }

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over.id
    if (activeId === overId) return
    setItems((items) => {
      const activeIndex = items.findIndex((t) => t.id === activeId)
      const overIndex = items.findIndex((t) => t.id === overId)
      return arrayMove(items, activeIndex, overIndex)
    })
    onMoveEnd(items.reverse())
  }

  const onDelete = (id: Id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-col gap-4">
        <SortableContext items={itemsIds}>
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              deleteItem={() => onDelete(item.id)}
            />
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay>
          {activeTask && (
            <Item
              item={activeTask}
              deleteItem={() => onDelete(activeTask.id)}
            />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

export default DragMove
