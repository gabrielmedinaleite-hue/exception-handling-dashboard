export const metadata = {
  title: "Exception Handling Dashboard",
  description: "Executive Scorecard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
