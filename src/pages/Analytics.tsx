import { useState } from 'react'

function MyComponent() {
  const [loading, setLoading] = useState(true)

  const handleIframeLoad = () => {
    // This function will be called when the iframe has finished loading.
    setLoading(false)
  }

  return (
    <div className='w-full h-screen'>
      {loading && (
        <div className='grid place-items-center h-screen w-full bg-gray-200'>
          <span className='loader' />
        </div>
      )}

      <iframe
        style={{
          display: loading ? 'none' : 'block',
          width: '100%',
          height: '100%',
          border: '1px solid #ddd',
          borderRadius: '4px',
          background: '#fff',
        }}
        src='https://app.trevor.io/share/dashboard/aa3a88fe-797e-4e10-921f-c35ab4427516/load.html?pin=13eaf'
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  )
}

export default MyComponent
