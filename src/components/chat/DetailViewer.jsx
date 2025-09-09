"use client";

export default function DetailViewer({ response }) {
  if (!response) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        👈 Select an AI response to view details
      </div>
    );
  }

  if (Array.isArray(response)) {
    return (
      <div className="p-6 space-y-4">
        {response.map((email, idx) => (
          <div key={idx} className="p-4 border rounded-lg shadow-sm bg-white">
            <p className="font-semibold">{email.subject}</p>
            <p className="text-sm text-gray-600">From: {email.from}</p>
            <p className="text-xs text-gray-500">{email.date}</p>
            <p className="mt-1">{email.snippet}</p>
            <a
              href={email.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm underline"
            >
              Open in Gmail
            </a>
          </div>
        ))}
      </div>
    );
  }

  return <div className="p-6 whitespace-pre-wrap">{response}</div>;
}
