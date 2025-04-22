import React from 'react';

export default function EventDetailHtml({ html }: { html: string }) {
  return <div className='w-full' dangerouslySetInnerHTML={{ __html: html }} />;
}
