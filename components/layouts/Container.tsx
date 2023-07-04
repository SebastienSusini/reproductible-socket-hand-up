const Container = ({
  noPaddingBottom = false,
  children,
  noPaddingTop,
  noPaddingVertical,
}: {
  noPaddingBottom?: boolean;
  children: React.ReactNode;
  noPaddingTop?: boolean;
  noPaddingVertical?: boolean;
}) => {
  const noPaddingBottomClass = noPaddingBottom ? '' : 'pb-24';
  const noPaddingTopClass = noPaddingTop ? '' : 'pt-9';
  const noPaddingVerticalClass = noPaddingVertical ? 'md:pt-10 lg:pt-20 ' : ' md:py-10 lg:py-20';

  return (
    <div
      className={`px-5 ${noPaddingTopClass} ${noPaddingBottomClass} md:container md:mx-auto ${noPaddingVerticalClass}`}
    >
      {children}
    </div>
  );
};

export default Container;
