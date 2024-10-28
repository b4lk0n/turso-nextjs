import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "~/components/ui/button"

type Props = {
  name: string
  id: number
}

export function Contact({ name, id }: Props) {
  return (
    <div className="space-y-4">
      <section className="flex items-center gap-4">
        <Button size="icon" variant="destructive">
          <TrashIcon />
        </Button>

        <h4 className="font-semibold text-secondary-foreground">{name}</h4>
      </section>
    </div>
  )
}
