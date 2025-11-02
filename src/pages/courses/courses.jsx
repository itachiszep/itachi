import React from 'react'

const dziendobrykali = () => {
  const videos = [
    "lfmg-EJ8gm4?si=FBK2HJHwIlmX2dE4",
    "CgkZ7MvWUAA?si=M44-94LmDgoV-jlf",
    "ix9cRaBkVe0?si=5rICmERNtKfPNR58",
    "wxznTygnRfQ?si=bORZ3BJQH0nWdSdN",
    "c2M-rlkkT5o?si=vQUXcWc-lV_W-PSJ",
    "-TkoO8Z07hI?si=zAQpsP800usQ95Kh",
    "CBYHwZcbD-s?si=2HLzc5kctV9rCEt5",
    "xTtL8E4LzTQ?si=4OaVH5_bHp-7CDZF",
    "HGTJBPNC-Gw?si=cy9M5IipFcbknjP4"
  ];

  return (
    <div className="bg-black text-white box-border m-0 p-0">
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12 text-center">
        
        {/* Obraz */}
        <img 
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl h-auto rounded-lg shadow-lg object-cover" 
          src="/images/itachi-uchiha-naruto-amoled-black-background-minimal-art-3840x2160-6478.jpg"
          alt="Itachi Uchiha"
        />
        
        {/* Grid iframeów */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          {videos.map((videoId, index) => (
            <div 
              key={index}
              className="w-full aspect-video rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
        
      </div>
    </div>  
  )
}

export default dziendobrykali