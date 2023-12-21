import { WithChildren } from "@/interfaces";

export function TypoP( {children}: WithChildren) {
    return (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    )
  }