import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  primaryAction,
  primaryActionText,
  primaryActionStyle = 'danger', // 'danger' | 'primary' | 'success'
  showSecondaryAction = true,
  secondaryActionText = 'Cancel',
  children
}) => {
  const getPrimaryButtonStyles = () => {
    const baseStyles = "inline-flex justify-center rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800";
    
    const styleVariants = {
      danger: `bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 
              dark:focus-visible:ring-red-500 dark:ring-offset-gray-800`,
      primary: `bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500 dark:bg-indigo-600 dark:hover:bg-indigo-700 
               dark:focus-visible:ring-indigo-500 dark:ring-offset-gray-800`,
      success: `bg-green-600 hover:bg-green-700 focus-visible:ring-green-500 dark:bg-emerald-600 dark:hover:bg-emerald-700 
               dark:focus-visible:ring-emerald-500 dark:ring-offset-gray-800`
    };
    
    return `${baseStyles} ${styleVariants[primaryActionStyle]}`;
  };

  const getSecondaryButtonStyles = () => {
    return `inline-flex justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200
            border-gray-300 bg-white text-gray-700 hover:bg-gray-50
            dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600
            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-indigo-500
            focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800`;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="relative z-50" 
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 dark:bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel 
                className="w-full max-w-md transform overflow-hidden rounded-2xl 
                         bg-white dark:bg-gray-800 p-6 text-left align-middle 
                         shadow-xl dark:shadow-2xl shadow-black/10 dark:shadow-black/30 
                         ring-1 ring-black/5 dark:ring-white/5 transition-all"
              >
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    {title}
                  </Dialog.Title>
                )}
                
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {description}
                    </p>
                  </div>
                )}

                {children && (
                  <div className="mt-4">
                    {children}
                  </div>
                )}

                <div className="mt-6 flex flex-row-reverse gap-3">
                  <button
                    type="button"
                    className={getPrimaryButtonStyles()}
                    onClick={primaryAction}
                  >
                    {primaryActionText}
                  </button>
                  
                  {showSecondaryAction && (
                    <button
                      type="button"
                      className={getSecondaryButtonStyles()}
                      onClick={onClose}
                    >
                      {secondaryActionText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;