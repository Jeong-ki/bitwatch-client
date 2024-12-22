export default function NotFound({ error }: { error: Error & { digest?: string } }) {
  console.log('not found');
  console.log(error);
  return <div>404 Not Found</div>;
}
