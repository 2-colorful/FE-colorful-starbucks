import { NextFont } from 'next/dist/compiled/@next/font';

interface ProductTagsProps {
  isMarkable: boolean;
  caveatFont: NextFont;
}

export default function ProductTags({
  isMarkable,
  caveatFont,
}: ProductTagsProps) {
  return (
    <span>
      {isMarkable && (
        <span
          className={`${caveatFont.className} text-secondary-200 ml-2 text-title3 italic`}
        >
          Limited
        </span>
      )}
    </span>
  );
}
