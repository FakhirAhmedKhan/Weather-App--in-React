export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-xl p-4 mb-6 text-red-100">
      {message}
    </div>
  );
}
