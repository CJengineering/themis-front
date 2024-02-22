import React from 'react';
interface StatusStepsProps {
  statusTravel: string;
}

const StatusSteps = ({ statusTravel }: StatusStepsProps) => {
  if (!statusTravel) {
    statusTravel = 'new';
  }
  const navLinks = [
    
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
    <div className="hidden md:flex flex-col items-start">
   
      <div className="w-full">
        {navLinks.map((link,index) => (
          <div
            key={link.name}
            className={`flex justify-between items-center text-sm mb-4  ${
              index === activeStepIndex ? 'activeStatus' : ''
            } ${
              isStepCompleted(link.name) ? 'text-bold' : 'text-muted-foreground'
            }`}
          >
            <div className="flex items-center">
              <span
                className="material-symbols-outlined text-sm mr-2"
                style={{ fontSize: '20px' }}
              >
                {link.icon}
              </span>
              <span>{link.name}</span>
            </div>

            {isStepCompleted(link.name) && (
              <span className="material-symbols-outlined text-green-500">
                done
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSteps;
