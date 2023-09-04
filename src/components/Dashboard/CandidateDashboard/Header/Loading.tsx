import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <header
      className=' flex gap-x-10 pr-12 py-1 '
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          rgba(201, 255, 206, 0.52) 0%,
          rgba(171, 254, 206, 0.09) 33.33%,
          rgba(169, 177, 243, 0.44) 66.67%,
          rgba(158, 0, 255, 0.05) 100%
        )`,
      }}
    >
      <div className='flex w-full  items-center'>
        <div className='flex w-full gap-x-4 items-center justify-end'>
          <Skeleton className='w-[70px] h-[30px] bg-gray-400 rounded-sm p-1 px-2' />
          <Skeleton className='w-[70px] h-[30px] bg-gray-400 rounded-sm p-1 px-2' />
          <Skeleton className=' w-96 h-2 bg-gray-400 rounded-sm p-1 px-2' />
          <Skeleton className='w-[70px] h-[20px] bg-gray-400 rounded-sm p-1 px-2' />
        </div>
      </div>
      <div className=' flex items-center gap-x-4'>
        <Skeleton className='w-[50px] h-[25px] bg-gray-400 rounded-sm p-1 px-2' />
        <Skeleton className='w-[50px] h-[30px] bg-gray-400 rounded-sm p-1 px-2' />
        <Skeleton className='w-[50px] h-[25px] bg-gray-400 rounded-sm p-1 px-2' />
      </div>
    </header>
  )
}

export default Loading
