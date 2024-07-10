export default function NotFoundPage({ error }) {
  return (
    <div id="error">
      <h1>Not Found!</h1>
      <p>The requested resource could not be found! {error}</p>
    </div>
  );
}
