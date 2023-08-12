import { SiEthereum } from "react-icons/si";
export default function Footer() {
  return (
    <footer className="bg-pink-500 p-4">
      <div className="md:flex md:justify-between items-center">
        <div className="text-black font-bold text-center md:text-left text-2xl mt-2 flex justify-center">
          Built by
          <SiEthereum />
          <a
            className="cursor-pointer underline"
            target="_blank"
            rel="noreferrer"
            href="https://moayaan.taplink.ws/"
          >
            moayaan.eth
          </a>
          <SiEthereum />
        </div>

        <div className="mt-4 md:mt-0 flex justify-center">
          <a
            className=" text-white px-4 py-2 mr-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href=""
          >
            Video Demo
          </a>
          <a
            className=" text-white px-4 py-2 cursor-pointer"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/moayaan1911/crowdfunding"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
