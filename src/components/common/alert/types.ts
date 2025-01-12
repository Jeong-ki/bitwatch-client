import type { InstanceProps } from 'react-modal-promise';

interface IResponse {
  isConfirm: boolean;
}

export interface ModalProps extends InstanceProps<IResponse, IResponse> {
  title?: string;
  description?: string;
  hasCancelBtn?: boolean;
  cancelText?: string;
  confirmText?: string;
}
