import clsx from 'clsx';

interface TagProps {
  children: React.ReactNode;
  color: 'blue' | 'light' | 'red' | 'black' | 'green' | 'orange';
  size: 'small' | 'medium' | 'large';
  noBullet?: boolean;
}

const Tag = ({ children, color, size, noBullet = false }: TagProps) => {
  if (!children) return null;

  return (
    <div
      className={clsx(
        'flex min-w-max max-w-fit flex-nowrap items-center rounded-2xl py-px text-center ring-1',
        {
          'ring-white bg-white/20 text-white': color === 'light',
          'ring-skyblue-400 bg-skyblue-100 text-skyblue-500': color === 'blue',
          'ring-red bg-red/20 text-red': color === 'red',
          'ring-black bg-black/20 text-black': color === 'black',
          'ring-green bg-emerald-100 text-skyblue-500': color === 'green',
          'ring-orange-400 bg-orange-100 text-orange-500': color === 'orange',
          'text-[10px] px-1 gap-1 leading-none': size === 'small',
          'text-xs px-1.5 gap-1.5': size === 'medium',
          'text-sm px-2 gap-1.5': size === 'large',
        }
      )}
    >
      <span
        className={clsx('flex', {
          'h-1.5 w-1.5': size === 'small',
          'h-2 w-2': size === 'medium' || size === 'large',
          hidden: noBullet,
        })}
      >
        <span
          className={clsx('absolute inline-flex animate-ping rounded-full opacity-75', {
            'bg-white': color === 'light',
            'bg-skyblue-400': color === 'blue',
            'bg-red': color === 'red',
            'bg-black': color === 'black',
            'bg-green ': color === 'green',
            'bg-orange-400': color === 'orange',
            'h-1.5 w-1.5': size === 'small',
            'h-2 w-2': size === 'medium' || size === 'large',
          })}
        />
        <span
          className={clsx('relative inline-flex rounded-full', {
            'bg-white': color === 'light',
            'bg-skyblue-400': color === 'blue',
            'bg-red': color === 'red',
            'bg-black': color === 'black',
            'bg-green': color === 'green',
            'bg-orange-400': color === 'orange',
            'h-1.5 w-1.5': size === 'small',
            'h-2 w-2': size === 'medium' || size === 'large',
          })}
        />
      </span>

      {children}
    </div>
  );
};

export default Tag;
