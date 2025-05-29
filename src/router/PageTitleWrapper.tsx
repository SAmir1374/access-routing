import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  pageTitle: string;
};

const PageWrapper = ({ children, pageTitle }: Props) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <>{children}</>;
};

export default PageWrapper;
