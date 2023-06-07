import Image from "next/image";
import logoThumbnail from "@/img/icon-dark.png";
import logoInline from "@/img/inline-colored-sm.png";

type LogoProps = {
  type?: "thumbnail" | "inline";
  className?: string;
};
const ApplicationLogo = ({ type = "thumbnail", ...props }: LogoProps) => {
  if (type === "inline") {
    return (
      <Image src={logoInline} width={786} height={210} alt="Stery" {...props} />
    );
  }

  return (
    <Image
      src={logoThumbnail}
      width={300}
      height={300}
      alt="Stery"
      {...props}
    />
  );
};
export default ApplicationLogo;
