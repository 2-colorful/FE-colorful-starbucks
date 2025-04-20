import React from 'react';

export default function ProductImageHtml({ html }: { html: string }) {
  return (
    <div className='w-full mt-4' dangerouslySetInnerHTML={{ __html: html }} />
  );
}
