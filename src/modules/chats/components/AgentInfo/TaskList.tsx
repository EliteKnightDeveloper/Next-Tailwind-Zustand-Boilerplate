import { FC, useState } from 'react'
import {
  BookmarkOutline,
  ChatEdit,
  Left,
  ChatWorkFlow,
  GradientSquareCheck,
  Square,
} from '@/common/components/Icons'
import Button from '@/common/elements/Button'
import DragMove from '@/common/components/DragMove/DragMove'
import { Task } from '@/interfaces'
import Tooltip from '@/common/elements/Tooltip'

interface TaskListProps {
  agentId: string
  onBack: (type: string) => void
}

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

const TaskList: FC<TaskListProps> = ({ agentId, onBack }) => {
  const [status, setStatus] = useState(' ')
  const [checkedItems, setCheckedItems] = useState<string[]>([])
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

  const onCheck = (index: number) => {
    setCheckedItems((prevItems) =>
      prevItems.includes(index.toString())
        ? prevItems.filter((_index: string) => _index !== index.toString())
        : [...prevItems, index.toString()]
    )
  }

  const onChangeStatus = (_status: string) => {
    setStatus(_status)
    switch (_status) {
      case 'Save':
        break
      case 'Edit':
        break
      case 'WorkFlow':
        break
      default:
        break
    }
  }

  const onMoveEnd = (result: Task[]) => {
    // console.log(result)
  }

  return (
    <div className="relative flex flex-col h-full">
      <div
        className={`flex flex-row items-start ${
          status === 'Edit' ? '' : 'justify-between'
        } gap-3`}
      >
        <div
          className="px-1 py-1 hover:cursor-pointer"
          onClick={() => onBack('')}
        >
          <Left />
        </div>
        <div className="flex flex-col gap-0.5 mb-3">
          {status !== 'Edit' && (
            <span className="text-base font-normal text-white">Task List</span>
          )}
          {status === 'Edit' && (
            <span className="text-base font-normal text-white">
              Edit Task List
            </span>
          )}
          {/* <span className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-darkGradientStart to-darkGradientEnd">
            Social Media Campaign
          </span> */}
        </div>
        {status === 'Edit' ? (
          ''
        ) : (
          <div className="flex flex-row gap-1">
            <Button
              text=""
              icon={
                <div className="text-white hover:text-neon-100">
                  <BookmarkOutline />
                </div>
              }
              variant="text"
              size="xs"
              onClick={() => onChangeStatus('Save')}
            />
            <Button
              text=""
              icon={
                <div className="text-white hover:text-neon-100">
                  <ChatEdit />
                </div>
              }
              variant="text"
              size="xs"
              onClick={() => onChangeStatus('Edit')}
            />
            <Button
              text=""
              icon={
                <div className="text-white hover:text-neon-100">
                  <ChatWorkFlow />
                </div>
              }
              variant="text"
              size="xs"
              onClick={() => onChangeStatus('WorkFlow')}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 mt-2 ">
        {status !== 'Edit' && (
          <div className="flex flex-col gap-4">
            {taskListItems.map((taskListItem, index) => {
              return (
                <TaskListItem
                  key={index}
                  index={index}
                  title={taskListItem.title}
                  content={taskListItem.content}
                  items={checkedItems}
                  onCheck={() => onCheck(index)}
                />
              )
            })}
          </div>
        )}
        {status === 'Edit' && (
          <DragMove
            lists={taskListItems}
            onMoveEnd={(items: Task[]) => onMoveEnd(items)}
          />
        )}
      </div>
      <div className="absolute bottom-0 w-full">
        {status === 'Edit' ? (
          <div className="flex flex-row items-center justify-between w-full">
            <Button
              text={'Cancel'}
              variant="solid"
              onClick={() => onChangeStatus(' ')}
            />
            <Button
              text={'Save'}
              variant="gradient"
              onClick={() => onChangeStatus(' ')}
            />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between w-full">
            <Tooltip description={'Estimated Azara Credit: 10'}>
              <Button text={'Continue'} variant="solid" />
            </Tooltip>
            <Button text={'Run the task list'} variant="gradient" />
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList
