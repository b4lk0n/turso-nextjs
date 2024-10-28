type Props = {
  userName: string
}

export function Header({ userName }: Props) {
  return (
    <header className="py-6">
      <h1 className="font-medium text-2xl tracking-tight">
        {userName}'s contacts
      </h1>
    </header>
  )
}
