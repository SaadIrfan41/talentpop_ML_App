const TriangleShape = ({
  direction,
  text,
}: {
  direction: string
  text: string
}) => {
  return (
    <>
      {direction == 'up' ? (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 58 49' fill='none'>
          <path
            d='M26.9692 1.80666C27.8955 0.292312 30.0951 0.292309 31.0215 1.80665L57.2961 44.759C58.2643 46.3416 57.1253 48.3736 55.27 48.3736H2.7207C0.865365 48.3736 -0.273629 46.3416 0.694532 44.759L26.9692 1.80666Z'
            fill='url(#paint0_linear_15_290)'
          />
          <defs>
            <linearGradient
              id='paint0_linear_15_290'
              x1='28.9953'
              y1='-1.50562'
              x2='28.9953'
              y2={65}
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#93D88D' />
              <stop offset={1} stopColor='#34CEFF' stopOpacity='0.46875' />
            </linearGradient>
          </defs>
          <text
            x='50%'
            y='50%'
            textAnchor='middle'
            dominantBaseline='middle'
            className='fill-white font-medium '
          >
            {text}
          </text>
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          //   width='75'
          //   height='63'
          viewBox='0 0 75 63'
          fill='url(#paint0_linear_13_91)'
        >
          <path
            className='custom-path'
            d='M40.1803 60.5796C38.9824 62.5378 36.138 62.5378 34.9401 60.5796L0.963219 5.0361C-0.28875 2.98945 1.18414 0.361862 3.58335 0.361862L71.537 0.361862C73.9362 0.361862 75.4091 2.98946 74.1571 5.03611L40.1803 60.5796Z'
          />
          <defs>
            <linearGradient
              id='paint0_linear_13_91'
              x1='37.5602'
              y1='64.8628'
              x2='37.5602'
              y2='-21.1385'
              gradientUnits='userSpaceOnUse'
            >
              <stop stopColor='#93D88D' />
              <stop offset='1' stopColor='#34CEFF' stopOpacity='0.46875' />
            </linearGradient>
          </defs>

          <text
            x='50%'
            y='40%'
            textAnchor='middle'
            dominantBaseline='middle'
            className='fill-white font-medium text-xl'
          >
            {text}
          </text>
        </svg>
      )}
    </>
  )
}
export default TriangleShape
