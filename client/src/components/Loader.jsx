export default function Loader() {
  return (
    <div className="h-full w-full  flex justify-center items-center fixed">
    <div
      className="
      w-[50px] aspect-square rounded-full
      bg-[#1e00ff]
      animate-l25
      [transform-origin:50%_40%]
      [-webkit-mask:radial-gradient(circle_closest-side_at_50%_40%,#0000_94%,#000)]
      animate-spin
      "
      ></div>
      </div>
  );
}
