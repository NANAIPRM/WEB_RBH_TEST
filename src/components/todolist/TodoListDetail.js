import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Typography from '@mui/material/Typography'
import DeleteDialog from '../dialog/DeleteDialog.js'
import { AiOutlineLeft } from 'react-icons/ai'

export default function TodoListDetail({ task, onDelete }) {
  const [isContentOverflowing, setIsContentOverflowing] = useState(false)
  const contentRef = useRef(null)
  const [isSliding, setIsSliding] = useState(false)
  const [startX, setStartX] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleTouchStart = (e) => {
    setIsSliding(false)
    setStartX(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    if (!startX) return

    const currentX = e.touches[0].clientX
    const deltaX = currentX - startX

    if (deltaX < -50) {
      setIsSliding(true)
    } else {
      setIsSliding(false)
    }
  }

  const handleTouchEnd = () => {
    if (isSliding) {
      setIsDeleteDialogOpen(true)
    }
    setIsSliding(false)
    setStartX(null)
  }

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      setIsContentOverflowing(contentHeight > 200)
    }
  }, [task?.description])

  const handleDeleteConfirm = () => {
    onDelete(task.id)
    setIsDeleteDialogOpen(false)
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginY: '15px',
          boxShadow: 'none',
        }}
      >
        <AccountBoxIcon />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            '@media (min-width: 768px)': {
              flexDirection: 'row',
            },
            justifyContent: 'space-between',
         
          }}
        >
          <CardContent
            sx={{
              maxHeight: isContentOverflowing ? '200px' : 'none',
              overflowY: isContentOverflowing ? 'auto' : 'visible',
            }}
            ref={contentRef}
          >
            <Typography component="div" variant="h6">
              <span className="text-black">{task?.title}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {task?.description}
            </Typography>
          </CardContent>
          <button className="flex items-center pt-4 lg:mt-0  text-lg lg:text-xl mx-auto lg:mx-0">
            {' '}
            <AiOutlineLeft size={24} /> DELETE
          </button>
        </Box>
      </Card>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
