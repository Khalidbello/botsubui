import Image from "next/image";

const Patners = () => {
  return (
    <div className="">
      <p className="text-center mb-1 text-gray-500 text-sm font-mono font-semibold">
        Trusted By
      </p>
      <div className="flex justify-center items-center gap-x-4 text-gray-500">
        <span className="flex items-center justify-center gap-x-1">
          <Image
            width={500}
            height={500}
            src="/flutterwave.png"
            alt="fluuterwave logo"
            className="w-5 h-5 rounded-full md:h-7 md:w-7"
          />
          Flutterwave
        </span>
        <span className="flex items-center justify-center gap-x-1">
          <Image
            src="/fb.jpeg"
            alt="facebook logo"
            width={500}
            height={500}
            className="w-5 h-5 rounded-full md:h-7 md:w-7"
          />
          Facebook
        </span>
      </div>
    </div>
  );
};

export default Patners;
