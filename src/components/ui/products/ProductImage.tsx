import Image from 'next/image';

interface ProductImagePropsType {
  imageUrl: string;
  name: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

export default function ProductImage({
  imageUrl,
  name,
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  priority = false,
}: ProductImagePropsType) {
  return (
    <div className={`w-full pb-[100%] relative ${containerClassName}`}>
      <Image
        src={imageUrl}
        alt={name}
        fill
        className={`absolute inset-0 object-${objectFit} ${className}`}
        priority={priority}
      />
    </div>
  );
}
