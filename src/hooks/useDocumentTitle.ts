import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) {
      document.title = `${title} | IRICC`;
    } else {
      document.title = 'IRICC — Intelligent Research, Innovation & Commercialization Center';
    }
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};
