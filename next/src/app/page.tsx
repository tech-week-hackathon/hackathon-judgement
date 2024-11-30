import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/svg/logo-turquoise.svg"
          alt="Logo"
          width={126}
          height={145}
          priority
        />
        <h1 className={'font-bold m-auto uppercase'}>Tartarus</h1>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          href="https://github.com/tech-week-hackathon/hackathon-judgement"
          target="_blank"
          rel="noopener noreferrer"
        >
          Judgment Repo →
        </a>
        <a
          href="https://drive.google.com/drive/folders/1vpHZ7DwjOESF3wcIvfvvKKC-Vkg5zDI-"
          target="_blank"
          rel="noopener noreferrer"
        >
          Assets Folder →
        </a>
      </footer>
    </div>
  );
}
