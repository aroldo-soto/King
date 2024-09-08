export default function ContactLayout({ children }) {
  return (
    <>
      {children}
      <footer className="bg-gray-200 w-full">
        <div className="container m-auto py-4 flex items-center gap-4">
          <h3 className="text-2x1 font-bold">
            Follow us on our social medias!
          </h3>
          <a>IG</a>
          <a>Facebook</a>
          <a>LinkedIn</a>
        </div>
      </footer>
    </>
  );
}
