import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html style={{ opacity: 0 }}>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link rel='icon' href='/logo.svg' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
