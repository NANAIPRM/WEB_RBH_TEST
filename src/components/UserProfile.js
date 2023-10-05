import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

export default function UserProfile() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-2xl flex lg:flex-row-reverse flex-col  justify-between p-16">
      <Stack
        className=" justify-center lg:justify-end "
        direction="row"
        spacing={2}
      >
        <Avatar
          alt="Cindy Baker"
          src="/static/images/avatar/3.jpg"
          sx={{ width: 100, height: 100 }}
        />
      </Stack>
      <div className="flex flex-col gap-4 pt-10 lg:pt-40">
        <span className="text-4xl lg:text-5xl font-bold text-center lg:text-start">
          Hello User !
        </span>
        <span className="text-lg lg:text-xl  text-center lg:text-start">
          {' '}
          Lorem ipsum dolor sit amet.
        </span>
        <span className="text-lg lg:text-xl  text-center lg:text-start">
          {' '}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
          iure!
        </span>
      </div>
    </div>
  )
}
