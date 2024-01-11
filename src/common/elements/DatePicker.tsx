import React, { useState, useEffect, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Expand, Collapse, Right, Left } from '../components/Icons'
import Input from '@/common/elements/Input'
import moment from 'moment'

const MONTHS = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export interface DatePickerProps {
  onChange: (date: Date) => void
}

function isNode(element: EventTarget | null): element is Node {
  return element instanceof Node
}

export default function DatePicker({ onChange }: DatePickerProps) {
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [no_of_days, setNumDays] = useState<number[]>([])
  const [blankdays, setBlankDays] = useState<number[]>([])
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !isNode(e.target)) {
        setShowDatepicker(false)
      }
    }

    const eventListener: EventListener = (e) =>
      checkIfClickedOutside(e as unknown as MouseEvent)

    document.addEventListener('click', eventListener)
    return () => {
      document.removeEventListener('click', eventListener)
    }
  }, [setShowDatepicker])

  useEffect(() => {
    getNoOfDays()
  }, [month, year])

  const isSelectedDate = (pickedDay: number) => {
    const newDate = new Date(year, month, pickedDay)

    return newDate.toDateString() == date.toDateString()
  }

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const dayOfWeek = new Date(year, month).getDay()

    const blankDaysArray = Array.from(
      { length: dayOfWeek },
      (_, index) => index + 1
    )
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    )

    setBlankDays(blankDaysArray)
    setNumDays(daysArray)
  }

  return (
    <div className="relative" ref={ref}>
      <div>
        <Input
          onClick={() => {
            setShowDatepicker(() => !showDatepicker)
          }}
          className="w-full"
          value={moment(date).format('YYYY-MM-DD')}
        />
      </div>
      <AnimatePresence initial={false}>
        {showDatepicker && (
          <motion.div
            className="absolute top-0 left-0 z-10 w-full p-4 bg-gray-600 mt-14 rounded-xl "
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1 },
              collapsed: { opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <motion.div
              className="flex items-center justify-between mb-3"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1 },
                collapsed: { opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between w-full">
                <button
                  type="button"
                  className="inline-flex p-1 text-white transition duration-100 ease-in-out cursor-pointer hover:text-neon-100"
                  onClick={() => {
                    setYear((prev) => prev - 1)
                  }}
                >
                  <Collapse />
                </button>
                <button
                  type="button"
                  className="inline-flex p-1 transition duration-100 ease-in-out cursor-pointer"
                  onClick={() => {
                    if (month == 0) {
                      setYear((prev) => prev - 1)
                      setMonth(11)
                    } else {
                      setMonth((prev) => prev - 1)
                    }
                  }}
                >
                  <Left />
                </button>
                <div>
                  <span className="text-base font-semibold text-white ">
                    {MONTHS[month]} {year}
                  </span>
                </div>
                <button
                  type="button"
                  className="inline-flex p-1 transition duration-100 ease-in-out cursor-pointer"
                  onClick={() => {
                    if (month == 11) {
                      setYear((prev) => prev + 1)
                      setMonth(0)
                    } else {
                      setMonth((prev) => prev + 1)
                    }
                  }}
                >
                  <Right />
                </button>
                <button
                  type="button"
                  className="inline-flex p-1 text-white transition duration-100 ease-in-out cursor-pointer hover:text-neon-100"
                  onClick={() => {
                    setYear((prev) => prev + 1)
                  }}
                >
                  <Expand />
                </button>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-7 mb-2 "
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1 },
                collapsed: { opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {DAYS.map((day, index) => {
                return (
                  <div className="flex justify-center" key={index}>
                    <div
                      key={index}
                      className="w-6 text-base font-semibold text-center text-gray-400 cursor-pointer"
                    >
                      {day}
                    </div>
                  </div>
                )
              })}
            </motion.div>
            <motion.div
              className="grid flex-wrap grid-cols-7"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1 },
                collapsed: { opacity: 0 },
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {blankdays.map((day, index) => {
                return (
                  <div className="flex justify-center px-1 mb-1" key={index}>
                    <div key={index} className="w-6"></div>
                  </div>
                )
              })}
              {no_of_days.map((day, index) => {
                return (
                  <div className="flex justify-center px-1 mb-1" key={index}>
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()

                        const selectedDate = new Date(year, month, day)

                        setDate(selectedDate)
                        onChange(new Date(year, month, day))

                        setShowDatepicker(false)
                      }}
                      className={`                      
                        ${
                          isSelectedDate(day)
                            ? 'bg-gradient-to-r from-darkGradientStart to-darkGradientEnd text-white'
                            : 'white'
                        } cursor-pointer rounded-full text-center text-base text-gray-200 leading-8 w-8 hover:bg-gradient-to-r from-darkGradientStart to-darkGradientEnd transition ease-in-out`}
                    >
                      {day}
                    </button>
                  </div>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
