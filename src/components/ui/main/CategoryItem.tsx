import Image from 'next/image';

interface CategoryItemProps {
  title: string;
  icon: string;
}

export default function CategoryItem({ title, icon }: CategoryItemProps) {
  return (
    <li key={title} className='text-center space-y-2 relative aspect-square'>
      <Image
        src={icon}
        alt={title}
        className='mx-auto object-cover'
        fill
        sizes='100vW'
      />
      <p>{title}</p>
    </li>
  );
}
