import React, { useEffect, useRef, useState } from 'react'
import DeleteDialog from '../dialog/DeleteDialog.js'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import '../../app/swiper.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

export default function TodoListDetail({ task, onDelete }) {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false)
  const contentRef = useRef(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [swiper, setSwiper] = useState(null)

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      setIsContentOverflowing(contentHeight > 200)
    }
  }, [task?.description])

  const handleSwiperSlideChange = (swiper) => {
    if (swiper.activeIndex === 1) {
      setIsDeleteDialogOpen(true)
    }
  }

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false)

    if (swiper) {
      swiper.slideTo(0) // Reset slide index to 0
    }
  }

  const handleDeleteConfirm = () => {
    onDelete(task.id)
    setIsDeleteDialogOpen(false)

    if (swiper) {
      swiper.slideTo(0)
    }
  }

  return (
    <div>
      <div className="flex " ref={contentRef}>
        <Swiper
          spaceBetween={30}
          modules={[Pagination]}
          className="mySwiper mt-10"
          onSlideChange={(swiper) => handleSwiperSlideChange(swiper)}
          onSwiper={(s) => setSwiper(s)}
        >
          <SwiperSlide>
            <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full ">
              <div className="flex w-full lg:w-3/4 items-center gap-10 ">
                <AccountBoxIcon className="icon" />
                <div className="flex flex-col items-start justify-start">
                  <span className="text-black">{task?.title}</span>
                  <span
                    style={{
                      maxHeight: isContentOverflowing ? '200px' : 'none',
                      overflowY: isContentOverflowing ? 'auto' : 'visible',
                    }}
                    className="text-gray-400"
                  >
                    {task?.description}
                  </span>
                </div>
              </div>
              <button className="text-black text-md lg:text-lg mt-4 lg:mt-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full p-2">
                SWIPE HERE TO DELETE
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 w-full h-full text-md lg:text-lg flex items-center justify-center"></SwiperSlide>
        </Swiper>
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
