import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import Typography from '@mui/material/Typography'

export default function TodoListDetail({task}) {
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginY: '15px',
          boxShadow: 'none',
        }}
      >
        <AccountBoxIcon />
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
             <span className='text-black'>{task?.title}</span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {task?.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  )
}
