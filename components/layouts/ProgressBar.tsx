interface Props {
  title: string;
  stepTitle: string;
  steps: number;
  currentStep: number;
  icon?: React.ReactNode;
}

export const activeStepClass = (i: number, currentStep: number) => {
  if (i <= currentStep) return 'bg-skyblue-400';

  return 'bg-grey-200';
};
const ProgressBar = ({ title, stepTitle, steps, currentStep, icon }: Props) => {
  return (
    <div className="mb-5 rounded-xl bg-white/80 p-4 shadow-md md:mb-8 md:px-5 md:py-4">
      <h5 className="text-sm font-bold text-skyblue-600">{title}</h5>

      <div className="mt-1 flex items-center justify-between gap-1">
        <p className="min-w-max text-xs text-skyblue-400">{stepTitle}</p>
        <div className="ml-4 flex w-full items-center gap-1">
          {[...Array(steps)].map((_, index) => (
            <div
              style={{ width: `${100 / steps}%` }}
              key={index}
              className={`h-[6px] rounded ${activeStepClass(index + 1, currentStep)}`}
            />
          ))}
        </div>
        {icon}
      </div>
    </div>
  );
};

export default ProgressBar;
