import React, { useState } from 'react'
import fallbackImage from '../assets/no-image.jpg'

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>
) {
  const { src, alt, style, className, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setImgSrc(fallbackImage)}
    />
  )
}
