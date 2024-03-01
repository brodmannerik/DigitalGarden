export default function ContactBar() {
  return (
    <div>
      <h1 className="py-5 text-lg">Contact</h1>
      <div className="w-64 h-46 flex-shrink-0 rounded-3xl bg-container dark:bg-containerDark">
        <div>
          <p className="px-10 py-5 text-sm text-secondary hover:text-black">
            <a
              href="https://github.com/erikbrodmann"
              target="_blank"
              rel="noopener noreferrer"
            >
              👨‍💻 Github
            </a>
          </p>
          <p className="px-10 pb-5 text-sm text-secondary hover:text-black">
            <a href="mailto:eriketesso@gmail.com">📧 Email</a>
          </p>
          <p className="px-10 pb-5 text-sm text-secondary hover:text-black">
            <a
              href="https://www.linkedin.com/in/erik-brodmann-b5094a229"
              target="_blank"
              rel="noopener noreferrer"
            >
              🖇 LinkedIn
            </a>
          </p>
          <p className="px-10 pb-5 text-sm text-secondary hover:text-black">
            <a
              href="https://erikbrodmann.xyz"
              target="_blank"
              rel="noopener noreferrer"
            >
              💼 Portfolio
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
