import React from 'react';
import { getAssetObjectPositionStyle, type FocalPoint } from '../utils/assetPaths';

export interface FocalImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  focalPoint?: FocalPoint;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Focal Image Component
 * Automatically applies asset focal points to ensure faces and key subjects remain centered in view.
 */
export const FocalImage: React.FC<FocalImageProps> = ({
  src,
  alt,
  focalPoint,
  className = '',
  style = {},
  ...props
}) => {
  const focalStyle = getAssetObjectPositionStyle(src, focalPoint);

  return (
    <img
      src={src}
      alt={alt}
      style={{
        ...focalStyle,
        ...style,
      }}
      className={`object-cover ${className}`}
      {...props}
    />
  );
};

export default FocalImage;
