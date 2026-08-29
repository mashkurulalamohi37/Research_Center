import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | AIRC — Advanced Intelligent Research Center`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
