export enum PaymentStatus {
  READY = 'Ready',
  IN_PROGRESS = 'In Progress',
  EXPIRED = 'Expired',
  DONE = 'Done',
  ABORTED = 'Aborted',
  CANCELED = 'Canceled',
  PARTIAL_CANCELED = 'Partial Canceled',
}

export enum PaymentType {
  NORMAL = 'Normal Pay',
  EASY = 'Easy Pay',
  BRAND = 'Brand Pay',
}