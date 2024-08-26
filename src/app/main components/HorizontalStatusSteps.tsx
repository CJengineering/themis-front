import React from 'react';

interface HorizontalStatusStepsProps {
  statusTravel: string;
}

const HorizontalStatusSteps = ({ statusTravel }: HorizontalStatusStepsProps) => {
  if (!statusTravel) {
    statusTravel = 'new';
  }
  const navLinks = [
    { name: 'Saved', icon: 'create' },
    { name: 'Request', icon: 'unknown_document' },
    { name: 'Authentication', icon: 'grading' },
    { name: 'Validation', icon: 'outgoing_mail' },
    { name: 'Authorisation', icon: 'account_balance' },
    { name: 'Approval', icon: 'task_alt' },
    { name: 'Finalisation', icon: 'north_east' },
  ];


  const getNextStepIndex = (currentStep: string) => {
    if (currentStep === 'new') {
      return 0;
    }
    const stepOrder = [
      'Saved',
      'Request',
      'Authentication',
      'Validation',
      'Authorisation',
      'Approval',
      'Finalisation',
    ];
    const currentStepIndex = stepOrder.indexOf(currentStep);
    return currentStepIndex < stepOrder.length - 1
      ? currentStepIndex + 1
      : currentStepIndex;
  };

  const activeStepIndex = getNextStepIndex(statusTravel);

  const isStepCompleted = (stepName: string) => {
    if (statusTravel === 'new') {
      return false;
    }
    const stepOrder = [
      'Saved',
      'Request',
      'Authentication',
      'Validation',
      'Authorisation',
      'Approval',
      'Finalisation',
    ];
    const currentStepIndex = stepOrder.indexOf(statusTravel);
    const stepIndex = stepOrder.indexOf(stepName);
    return stepIndex <= currentStepIndex;
  };

  return (
    <div className="flex items-center  w-full">
      {navLinks.map((link, index) => (
        <div key={link.name} className="flex items-center  ">
          <div
            className={`flex flex-col items-center text-sm ${
              index === activeStepIndex ? 'activeStatus' : ''
            } ${
              isStepCompleted(link.name)
                ? 'text-bold text-green-600'
                : 'text-muted-foreground'
            }`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                isStepCompleted(link.name)
                  ? 'border-green-500 bg-green-100'
                  : 'border-muted-foreground'
              }`}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontSize: '20px' }}
              >
                {link.icon}
              </span>
            </div>
            <span className="mt-2">{link.name}</span>
          </div>

          {index < navLinks.length - 1 && (
            <div className="flex-grow mx-2">
            <div className="border-t border-dotted border-muted-foreground h-0.5 md:12 lg:w-24"></div>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HorizontalStatusSteps;



