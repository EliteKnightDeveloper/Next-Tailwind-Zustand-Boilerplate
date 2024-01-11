import { FC, useState } from 'react'
import Input from '@/common/elements/Input'
import { GradientSquareCheck, Square } from '@/common/components/Icons'
import DragMove from '@/common/components/DragMove/DragMove'
import { Task } from '@/interfaces'

interface TaskListItemProps {
  index: number
  title: string
  content: string
  items: string[]
  onCheck: (index: number) => void
}

const TaskListItem: FC<TaskListItemProps> = ({
  index,
  title,
  content,
  items,
  onCheck,
}) => {
  return (
    <div className="flex flex-row mt-1.5 justify-between gap-2">
      <div className="flex hover:cursor-pointer" onClick={() => onCheck(index)}>
        {items.includes(index.toString()) ? (
          <GradientSquareCheck />
        ) : (
          <Square />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-gray-100">{title}</span>
        <span className="text-sm font-normal text-gray-200">{content}</span>
      </div>
    </div>
  )
}

const CreateFlow: FC = () => {
  const [taskListItems, setTaskListItems] = useState([
    {
      id: '1',
      title: 'Create',
      content: 'Prepare contract offers and necessary employee documents',
    },
    {
      id: '2',
      title: 'Edit',
      content: 'Prepare contract offers and necessary employee documents',
    },
    {
      id: '3',
      title: 'Delete',
      content: 'Prepare contract offers and necessary employee documents',
    },
  ])

  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const onCheck = (index: number) => {
    setCheckedItems((prevItems) =>
      prevItems.includes(index.toString())
        ? prevItems.filter((_index: string) => _index !== index.toString())
        : [...prevItems, index.toString()]
    )
  }

  const onMoveEnd = (result: Task[]) => {
    // console.log(result)
  }

  return (
    <div className="flex flex-col gap-8 px-6 py-8 overflow-scroll max-sm:px-5 max-sm:py-2 scrollbar-hide md:full-height max-sm:overflow-y-scroll">
      <Input placeholder="Enter workflow name" />
      <DragMove
        lists={taskListItems}
        onMoveEnd={(items: Task[]) => onMoveEnd(items)}
      />
    </div>
  )
}

export default CreateFlow
