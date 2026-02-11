import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>CHP energy production (steam+electric) (MW)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            80 MW
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12 MW
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Reaching all time high <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Energy production for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            Natural Gas (Nm<sup>3</sup>/h)
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            20324 Nm<sup>3</sup>/h
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -14%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Less consume in recent times <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Shows how much natural gas is being consumed in the facility
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Steam preassure</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            13 bar(g)
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +11%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady pressure increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Steam pressure in the facility</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>VCM preassure</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,3 MPa
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady pressure increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Shows the pressure in the VCM system</div>
        </CardFooter>
      </Card>
    </div>
  )
}
