/* SHADCN */
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card"

interface IProps {
  title: string, 
  value: string | number,
  description: string,
  icon?: React.ReactNode | JSX.Element,
}

export const DataView = ( { title, value, description, icon }: IProps ) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </>
  )
}
