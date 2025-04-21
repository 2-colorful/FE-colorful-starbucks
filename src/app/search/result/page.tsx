type SearchResultPageProps = {
  searchParams: Promise<{ query?: string; callbackUrl?: string }>;
};
export const dynamic = 'force-dynamic';
export default async function SearchResultPage({
  searchParams,
}: SearchResultPageProps) {
  const params = await searchParams;

  // TODO: 준수님 담당
  return <main>SearchResultPage:{params.query}</main>;
}
