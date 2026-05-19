'use client'

import { useState } from 'react'

export function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [active, setActive] = useState(false)

  return (
    <div className="relative w-full aspect-video">
      {active ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&hd=1&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          className="group absolute inset-0 w-full h-full cursor-pointer"
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/play_button.svg"
              alt=""
              aria-hidden="true"
              className="w-16 h-16 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </button>
      )}
    </div>
  )
}
