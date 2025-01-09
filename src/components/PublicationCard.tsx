import React from 'react';
import { Calendar, FileText, Link } from 'lucide-react';
import { DataItem } from '../types';

interface PublicationCardProps {
  publication: DataItem;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{publication.name}</h3>
      <p className="text-gray-600 mb-4">{publication.description}</p>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>{publication.type}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{new Date(publication.published_at).toLocaleDateString()}</span>
        </div>
        
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
        >
          <Link className="h-4 w-4" />
          <span>View Publication</span>
        </a>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {publication.publicationStatuses.map((status) => (
          <span
            key={status}
            className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800"
          >
            {status}
          </span>
        ))}
      </div>
    </div>
  );
}