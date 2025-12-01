export class Loan {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date | null;
  fineAmount: number;
  isFinePaid: boolean;
}
