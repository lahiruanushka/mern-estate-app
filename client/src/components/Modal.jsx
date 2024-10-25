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
    const baseStyles = "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    
    const styleVariants = {
      danger: "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500",
      primary: "bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500",
      success: "bg-green-600 hover:bg-green-700 focus-visible:ring-green-500"
    };
    
    return `${baseStyles} ${styleVariants[primaryActionStyle]}`;
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                )}
                
                {description && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {description}
                    </p>
                  </div>
                )}

                {children && (
                  <div className="mt-4">
                    {children}
                  </div>
                )}

                <div className="mt-4 space-x-4">
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
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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