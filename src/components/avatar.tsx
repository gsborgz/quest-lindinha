import Image from "next/image";

export default function Avatar() {
  return (
    <Image
      src="/avatar/avatar-1.jpg"
      width={40}
      height={40}
      alt="Profile picture"
      className="rounded-full border-2 border-blue-600 dark:border-blue-500"
    />
  )
}