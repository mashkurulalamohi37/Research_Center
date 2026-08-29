import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23050b14'/%3E%3Cstop offset='50%25' stop-color='%230a1428'/%3E%3Cstop offset='100%25' stop-color='%230f1d38'/%3E%3C/linearGradient%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%2300e5ff' stroke-width='0.5' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='500' fill='url(%23g)'/%3E%3Crect width='800' height='500' fill='url(%23grid)'/%3E%3Ccircle cx='400' cy='250' r='80' fill='%2300e5ff' opacity='0.08'/%3E%3Ccircle cx='400' cy='250' r='50' fill='none' stroke='%2300e5ff' stroke-width='1.5' opacity='0.4' stroke-dasharray='4,4'/%3E%3Ctext x='400' y='255' fill='%2300e5ff' font-family='monospace' font-size='14' font-weight='bold' text-anchor='middle' letter-spacing='2'%3EAIRC AUTONOMOUS LAB%3C/text%3E%3Ctext x='400' y='280' fill='%2394a3b8' font-family='sans-serif' font-size='11' text-anchor='middle'%3EHigh-Bay Robotics %26 Supercomputing Cluster%3C/text%3E%3C/svg%3E";

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallbackSrc : (imgSrc || fallbackSrc)}
      alt={alt}
      className={className}
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallbackSrc);
        }
      }}
      {...props}
    />
  );
};
