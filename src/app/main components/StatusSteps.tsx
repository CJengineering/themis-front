import React from 'react';
interface StatusStepsProps {
  statusTravel: string 
}

const StatusSteps = ({ statusTravel }:StatusStepsProps) => {
  if (!statusTravel){
    statusTravel = 'Request';
  }
  const navLinks = [
    { name: 'Request', icon: 'unknown_document' },
    { name: 'Authentication', icon: 'grading' },
    { name: 'Validation', icon: 'outgoing_mail' },
    { name: 'Approval', icon: 'task_alt' },
    { name: 'Finalisation', icon: 'north_east' },
  ];

  // Function to determine if the step is completed
  const isStepCompleted = (stepName:string) => {
    const stepOrder = ['Request', 'Authentication', 'Validation', 'Approval', 'Finalisation'];
    const currentStepIndex = stepOrder.indexOf(statusTravel);
    const stepIndex = stepOrder.indexOf(stepName);
    return stepIndex < currentStepIndex;
  };

  return (
    <div className="flex flex-col items-start">
      <h6 className="scroll-m-20 text-sm mb-2 text-muted-foreground tracking-tight">
        PROGRESS
      </h6>
      <div className="w-full">
        {navLinks.map((link) => (
          <div
            key={link.name}
            className={`flex justify-between items-center text-sm mb-4 ${
              statusTravel === link.name ? 'activeStatus' : ''
            } ${isStepCompleted(link.name) ? 'text-bold' : 'text-muted-foreground'}`}
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
                check_circle
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusSteps;
