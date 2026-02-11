import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { ChartBarInteractive } from "@/components/chart-bar-interactive";
import { ChartPieDonut } from "@/components/chart-pie-donut";
import { ChartRadar } from "@/components/chart-radar";
import ThermometerGroup from "@/components/ThermometerGroup";
import { ChartLineMultiple } from "@/components/chart-line-multiple";
import SwitchSettingsCard from "@/components/switches";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6 gap-4 space-y-4">
                <ChartLineMultiple />
                <ChartAreaInteractive />
                <ChartBarInteractive />
                <div className="flex gap-4 space-y-4">
                  <div className="flex-1 gap-4 space-y-4">
                    <ChartPieDonut />
                    <SwitchSettingsCard />
                  </div>
                  <div className="flex-2 gap-4 space-y-4">
                    <ChartRadar />
                    <ThermometerGroup />
                  </div>
                </div>
              </div>

              {/*<DataTable data={data} />*/}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
