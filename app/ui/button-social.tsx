import Image from "next/image";
import Button from "@/app/ui/button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  social: 'google' | 'github';
}

type SocialConfig = {
  src: string;
  title: string;
  width: number;
  height?: number;
}

const socialConfig: Map<string, SocialConfig> = new Map();
socialConfig.set('google', {src: '/social/google.svg', title: 'Google', width: 18});
socialConfig.set('github', {src: '/social/github.svg', title: 'Github', width: 19, height: 18});

export default function ButtonSocial({social, ...rest}: ButtonProps) {
  const config = socialConfig.get(social);

  return (
    <Button buttonType='secondary' {...rest}>
      {config && (
        <span className='flex'>
          <Image
            className='mx-2.5'
            src={config.src}
            alt="Qencode Logo"
            width={config.width}
            height={config?.height || config.width}
            priority
          />
          <span className='text-sm font-medium'>{config.title}</span>
        </span>
      )}
    </Button>
  );
}
