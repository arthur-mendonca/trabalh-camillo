import PageBox from "@/app/ui/protected/PageBox"
import { BooksController } from "./controller/BooksController"

export default function BooksPage() {
  return (
    <PageBox>
      <BooksController />
    </PageBox>
  )
}
